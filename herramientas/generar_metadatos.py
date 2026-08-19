"""
Genera las imagenes de identidad del sitio:

  og-image.png     1200x630  tarjeta de previsualizacion al compartir el enlace
  icono-512.png     512x512  icono para PWA / marcadores
  icono-192.png     192x192  idem, tamano pequeno
  apple-touch.png   180x180  icono al anadir a la pantalla de inicio en iOS
  favicon.png        48x48   pestana del navegador

Estilo: la misma paleta indigo del sitio, con trama de placa de circuito.
"""

import math
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

FUENTES = 'C:/Windows/Fonts/'
NEGRITA = FUENTES + 'segoeuib.ttf'
NORMAL = FUENTES + 'segoeui.ttf'
LIGERA = FUENTES + 'segoeuisl.ttf'

# Paleta de marca (equivalentes RGB de los tokens oklch de index.css)
INDIGO_950 = (30, 27, 75)
INDIGO_800 = (55, 48, 163)
INDIGO_700 = (67, 56, 202)
INDIGO_500 = (99, 102, 241)
INDIGO_200 = (199, 210, 254)
BLANCO = (255, 255, 255)


def degradado(tam, inicio, fin, diagonal=True):
    """Degradado lineal, en diagonal o vertical."""
    w, h = tam
    base = Image.new('RGB', tam)
    px = base.load()
    for y in range(h):
        for x in range(0, w, 4):  # de 4 en 4 y luego se suaviza: mucho mas rapido
            t = ((x / w) * 0.6 + (y / h) * 0.4) if diagonal else (y / h)
            t = min(1.0, max(0.0, t))
            c = tuple(round(inicio[i] + (fin[i] - inicio[i]) * t) for i in range(3))
            for dx in range(4):
                if x + dx < w:
                    px[x + dx, y] = c
    return base.filter(ImageFilter.GaussianBlur(2))


def trama_circuito(img, paso=48, alfa=16):
    """Rejilla tenue tipo placa de circuito impreso."""
    capa = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    w, h = img.size
    for x in range(0, w, paso):
        d.line([(x, 0), (x, h)], fill=(255, 255, 255, alfa), width=1)
    for y in range(0, h, paso):
        d.line([(0, y), (w, y)], fill=(255, 255, 255, alfa), width=1)
    return Image.alpha_composite(img.convert('RGBA'), capa)


def pistas(img, semilla):
    """Trazos y nodos que evocan las pistas de una placa."""
    capa = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    w, h = img.size
    color = (*INDIGO_200, 46)
    nodo = (*INDIGO_200, 90)

    for i, (x0, y0, tramos) in enumerate(semilla):
        x, y = x0, y0
        for dx, dy in tramos:
            d.line([(x, y), (x + dx, y + dy)], fill=color, width=3)
            x, y = x + dx, y + dy
        r = 7
        d.ellipse([x - r, y - r, x + r, y + r], fill=nodo)
        r2 = 5
        d.ellipse([x0 - r2, y0 - r2, x0 + r2, y0 + r2], fill=nodo)
    return Image.alpha_composite(img, capa)


def resplandor(img, centro, radio, color, intensidad=70):
    capa = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    cx, cy = centro
    pasos = 40
    for i in range(pasos, 0, -1):
        r = radio * i / pasos
        a = int(intensidad * (1 - i / pasos) ** 2)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, a))
    capa = capa.filter(ImageFilter.GaussianBlur(radio / 8))
    return Image.alpha_composite(img, capa)


def placa_ce(lado, radio_rel=0.22, cuerpo=0.44):
    """
    Placa cuadrada con el monograma CE centrado. Se usa tanto para los iconos
    como para el logo de la tarjeta social, de modo que sean identicos.

    El centrado no se calcula con textbbox: PIL mide y dibuja con anclas
    distintas por defecto y el desajuste se nota en tamanos pequenos. El texto
    se dibuja en una capa aparte, se mide la tinta real con getbbox y se
    desplaza la capa hasta el centro exacto del lienzo.
    """
    S = 512
    img = degradado((S, S), INDIGO_500, INDIGO_800).convert('RGBA')

    if radio_rel:
        mascara = Image.new('L', (S, S), 0)
        ImageDraw.Draw(mascara).rounded_rectangle(
            [0, 0, S - 1, S - 1], radius=int(S * radio_rel), fill=255)
        img.putalpha(mascara)

    capa = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(capa).text(
        (S // 2, S // 2), 'CE',
        font=ImageFont.truetype(NEGRITA, int(S * cuerpo)),
        fill=(255, 255, 255, 255), anchor='mm',
    )
    caja = capa.getbbox()
    if caja:
        capa = ImageChops.offset(
            capa,
            int(round(S / 2 - (caja[0] + caja[2]) / 2)),
            int(round(S / 2 - (caja[1] + caja[3]) / 2)),
        )
    img = Image.alpha_composite(img, capa)

    if lado != S:
        img = img.resize((lado, lado), Image.LANCZOS)
    return img


# --------------------------------------------------------------- tarjeta social
def tarjeta_og(salida):
    """
    Tarjeta de previsualizacion, 1200x630.

    Diseno pensado para sobrevivir al recorte: WhatsApp y varios clientes de
    mensajeria no muestran la tarjeta ancha, sino un CUADRADO recortado del
    centro y reducido a pocos pixeles. Por eso:

      - Todo el contenido va centrado y dentro de la zona segura (el cuadrado
        central de 630x630, es decir x entre 285 y 915).
      - Poco texto y muy grande: en la miniatura solo debe leerse el nombre
        del curso. Las descripciones largas se quedan en las etiquetas
        og:description, que si se muestran como texto aparte.
    """
    W, H = 1200, 630
    CX = W // 2
    SEGURO = (W - H) // 2  # 285: borde izquierdo del recorte cuadrado

    img = degradado((W, H), INDIGO_800, INDIGO_950)
    img = trama_circuito(img, paso=48, alfa=15)
    img = resplandor(img, (CX, 190), 430, INDIGO_500, 70)
    img = resplandor(img, (CX, 640), 320, INDIGO_700, 45)

    d = ImageDraw.Draw(img)

    # Solo el logo y el nombre del curso. El resto de la informacion
    # (periodo, universidad, descripcion) viaja en las etiquetas del HTML,
    # que los clientes muestran como texto aparte junto a la miniatura.

    # --- logo CE
    LOGO = 148
    logo = placa_ce(LOGO, radio_rel=0.24, cuerpo=0.42)
    img.paste(logo, (CX - LOGO // 2, 114), logo)
    d = ImageDraw.Draw(img)

    # --- nombre del curso, en dos lineas centradas
    f_titulo = ImageFont.truetype(NEGRITA, 96)
    d.text((CX, 366), 'Circuitos', font=f_titulo, fill=BLANCO, anchor='mm')
    d.text((CX, 468), 'Electrónicos', font=f_titulo, fill=BLANCO, anchor='mm')

    img.convert('RGB').save(salida, 'PNG', optimize=True)
    return salida


# ---------------------------------------------------------------------- iconos
def icono(salida, lado, radio_rel=0.0):
    img = placa_ce(lado, radio_rel=radio_rel)
    if radio_rel:
        img.save(salida, 'PNG', optimize=True)
    else:
        img.convert('RGB').save(salida, 'PNG', optimize=True)
    return salida


if __name__ == '__main__':
    destino = sys.argv[1].rstrip('/')
    print(tarjeta_og(f'{destino}/og-image.png'))
    # apple-touch-icon sin transparencia: iOS la rellena de negro.
    for lado, nombre, radio in [(512, 'icono-512.png', 0.0),
                                (192, 'icono-192.png', 0.0),
                                (180, 'apple-touch-icon.png', 0.0),
                                (48, 'favicon.png', 0.18)]:
        print(icono(f'{destino}/{nombre}', lado, radio))
