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


# --------------------------------------------------------------- tarjeta social
def tarjeta_og(salida):
    W, H = 1200, 630
    img = degradado((W, H), INDIGO_800, INDIGO_950)
    img = trama_circuito(img, paso=48, alfa=15)
    img = resplandor(img, (1010, 130), 340, INDIGO_500, 80)
    img = resplandor(img, (120, 600), 260, INDIGO_700, 55)
    img = pistas(img, [
        (980, 470, [(0, -60), (90, 0), (0, -70)]),
        (1080, 560, [(0, -80), (-70, 0)]),
        (900, 560, [(60, 0), (0, -50)]),
    ])

    d = ImageDraw.Draw(img)
    X = 80

    # --- distintivo superior
    f_badge = ImageFont.truetype(NEGRITA, 21)
    texto = 'UNIVERSIDAD CATÓLICA SAN PABLO  ·  2026-2'
    caja = d.textbbox((0, 0), texto, font=f_badge)
    pw, ph = caja[2] - caja[0], caja[3] - caja[1]
    d.rounded_rectangle([X, 74, X + pw + 52, 74 + ph + 30], radius=24,
                        fill=(255, 255, 255, 26), outline=(*INDIGO_200, 70), width=2)
    d.text((X + 26, 74 + 14), texto, font=f_badge, fill=INDIGO_200)

    # --- titulo
    f1 = ImageFont.truetype(LIGERA, 62)
    f2 = ImageFont.truetype(NEGRITA, 84)
    d.text((X, 172), 'Laboratorios de', font=f1, fill=(214, 219, 252))
    d.text((X, 246), 'Circuitos', font=f2, fill=BLANCO)
    d.text((X, 340), 'Electrónicos', font=f2, fill=BLANCO)

    # --- linea de acento
    d.rounded_rectangle([X, 452, X + 108, 458], radius=3, fill=INDIGO_500)

    # --- descripcion
    f3 = ImageFont.truetype(NORMAL, 27)
    d.text((X, 486), 'Guías de práctica, documentos descargables', font=f3, fill=(186, 195, 245))
    d.text((X, 524), 'y canal directo de retroalimentación', font=f3, fill=(186, 195, 245))

    # --- pie
    f4 = ImageFont.truetype(NORMAL, 21)
    d.text((X, 578), 'Facultad de Ingeniería  ·  Ing. Electrónica y de Telecomunicaciones',
           font=f4, fill=(140, 150, 210))

    img.convert('RGB').save(salida, 'PNG', optimize=True)
    return salida


# ---------------------------------------------------------------------- iconos
def icono(salida, lado, radio_rel=0.0):
    """
    Monograma CE sobre degradado indigo.

    El centrado no se calcula con textbbox: PIL mide y dibuja con anclas
    distintas por defecto, y el desajuste se nota mucho en tamanos pequenos.
    En su lugar se dibuja el texto en una capa aparte, se mide la tinta que
    realmente ha quedado (getbbox) y se desplaza esa capa para que su centro
    coincida con el del lienzo. Asi el resultado es opticamente exacto sea
    cual sea la fuente.
    """
    S = 512
    img = degradado((S, S), INDIGO_500, INDIGO_800).convert('RGBA')
    img = trama_circuito(img, paso=64, alfa=20)

    if radio_rel:
        mascara = Image.new('L', (S, S), 0)
        ImageDraw.Draw(mascara).rounded_rectangle(
            [0, 0, S - 1, S - 1], radius=int(S * radio_rel), fill=255)
        img.putalpha(mascara)

    # Texto en su propia capa
    capa = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(capa).text(
        (S // 2, S // 2), 'CE',
        font=ImageFont.truetype(NEGRITA, 206),
        fill=(255, 255, 255, 255), anchor='mm',
    )

    # Recentrar segun la tinta real
    caja = capa.getbbox()
    if caja:
        cx = (caja[0] + caja[2]) / 2
        cy = (caja[1] + caja[3]) / 2
        capa = ImageChops.offset(capa, int(round(S / 2 - cx)), int(round(S / 2 - cy)))

    img = Image.alpha_composite(img, capa)

    if lado != S:
        img = img.resize((lado, lado), Image.LANCZOS)
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
