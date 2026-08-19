"""
Comprime un PDF remuestreando sus imagenes a un DPI efectivo razonable.

Para cada imagen incrustada:
  1. Calcula su DPI real = pixeles / tamano mostrado en la pagina.
  2. Si supera DPI_OBJETIVO, la reduce con filtro LANCZOS.
  3. Elige formato: JPEG de alta calidad para fotos, PNG (con paleta si tiene
     pocos colores) para diagramas y capturas.
  4. Se queda con el resultado solo si pesa menos que el original.

Las imagenes con transparencia (SMask separado en el PDF) se reconstruyen
componiendo base + mascara en RGBA y se reescriben SIEMPRE como PNG: pasarlas
a JPEG convertiria el fondo transparente en negro.

No toca el archivo de entrada: escribe uno nuevo.
"""

import io
import sys

import fitz
from PIL import Image

DPI_OBJETIVO = 200
CALIDAD_JPEG = 90
MAX_COLORES_PALETA = 256


def elegir_codificacion(img, permitir_jpeg=True):
    """Devuelve (bytes, etiqueta) con la codificacion mas pequena para esta imagen."""
    candidatos = []

    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True, compress_level=9)
    candidatos.append((buf.getvalue(), "png"))

    # PNG con paleta: muy eficaz en diagramas y capturas de pantalla
    base = img.convert("RGBA") if img.mode == "RGBA" else img.convert("RGB")
    colores = base.getcolors(maxcolors=MAX_COLORES_PALETA)
    if colores is not None:
        buf = io.BytesIO()
        img.convert("P", palette=Image.ADAPTIVE, colors=max(2, len(colores))).save(
            buf, format="PNG", optimize=True, compress_level=9
        )
        candidatos.append((buf.getvalue(), "png8"))

    if permitir_jpeg and img.mode != "RGBA":
        buf = io.BytesIO()
        img.convert("RGB").save(
            buf, format="JPEG", quality=CALIDAD_JPEG, optimize=True, progressive=True
        )
        candidatos.append((buf.getvalue(), "jpeg"))

    return min(candidatos, key=lambda c: len(c[0]))


def cargar_imagen(doc, xref, smask):
    """
    Devuelve (PIL.Image, bytes_originales_totales).

    Si la imagen tiene mascara de transparencia, compone base + mascara para
    obtener un RGBA fiel a como el visor la dibuja.
    """
    original = doc.extract_image(xref)["image"]

    if smask:
        base = fitz.Pixmap(doc, xref)
        mascara = fitz.Pixmap(doc, smask)
        if base.alpha:  # quitar alfa previo antes de aplicar la mascara
            base = fitz.Pixmap(base, 0)
        compuesta = fitz.Pixmap(base, mascara)
        img = Image.open(io.BytesIO(compuesta.tobytes("png"))).convert("RGBA")
        total = original + doc.extract_image(smask)["image"]
        return img, total

    img = Image.open(io.BytesIO(original))
    img.load()
    return img, original


def comprimir(entrada, salida, dpi_objetivo=DPI_OBJETIVO):
    doc = fitz.open(entrada)

    # Ancho mostrado (en puntos), pagina donde aparece y xref de su mascara
    ancho_mostrado, pagina_de, smask_de = {}, {}, {}
    for pno in range(doc.page_count):
        pagina = doc[pno]
        for img in doc.get_page_images(pno, full=True):
            xref, smask = img[0], img[1]
            for r in pagina.get_image_rects(xref):
                ancho_mostrado[xref] = max(ancho_mostrado.get(xref, 0), r.width)
                pagina_de.setdefault(xref, pno)
                smask_de[xref] = smask

    ahorro = 0
    print(f"{'xref':>6} {'antes':>20} {'despues':>14} {'fmt':>5} {'alfa':>5} {'KB':>16}")
    print("-" * 78)

    for xref, ancho_pt in sorted(ancho_mostrado.items()):
        smask = smask_de[xref]
        try:
            img, original_total = cargar_imagen(doc, xref, smask)
        except Exception as e:
            print(f"{xref:>6}  omitida (no se pudo abrir: {e})")
            continue

        w, h = img.size
        dpi_real = w / (ancho_pt / 72) if ancho_pt else 0

        if dpi_real > dpi_objetivo:
            escala = dpi_objetivo / dpi_real
            nuevo = (max(1, round(w * escala)), max(1, round(h * escala)))
            img = img.resize(nuevo, Image.LANCZOS)
        else:
            nuevo = (w, h)

        # Las paginas del documento son blancas: componer la transparencia
        # sobre blanco es visualmente identico y permite usar JPEG, que para
        # una fotografia pesa una fraccion de lo que pesa un PNG RGBA.
        if img.mode == "RGBA":
            fondo = Image.new("RGB", img.size, (255, 255, 255))
            fondo.paste(img, mask=img.split()[3])
            img = fondo

        datos, etiqueta = elegir_codificacion(img, permitir_jpeg=True)
        alfa = "si" if smask else "no"

        if len(datos) >= len(original_total):
            print(
                f"{xref:>6} {f'{w}x{h}':>20} {'sin cambios':>14} {'-':>5} {alfa:>5} "
                f"{len(original_total)/1024:>7.0f} -> {len(original_total)/1024:>6.0f}"
            )
            continue

        doc[pagina_de[xref]].replace_image(xref, stream=datos)
        ahorro += len(original_total) - len(datos)
        print(
            f"{xref:>6} {f'{w}x{h} @{dpi_real:.0f}dpi':>20} "
            f"{f'{nuevo[0]}x{nuevo[1]}':>14} {etiqueta:>5} {alfa:>5} "
            f"{len(original_total)/1024:>7.0f} -> {len(datos)/1024:>6.0f}"
        )

    try:
        doc.subset_fonts()
    except Exception as e:
        print(f"aviso: no se pudieron subconjuntar las fuentes ({e})")

    doc.save(salida, garbage=4, deflate=True, deflate_images=True, clean=True)
    doc.close()
    print("-" * 78)
    print(f"ahorro en imagenes: {ahorro/1e6:.2f} MB")


if __name__ == "__main__":
    comprimir(sys.argv[1], sys.argv[2])
