"""
Dibuja la respuesta en frecuencia del resonador del Laboratorio 2 a partir del
barrido exportado por el simulador.

Uso:
    pip install matplotlib numpy
    python herramientas/graficar_bode.py

Genera  Laboratorio_2/LaTeX/imagenes/bode_resonador.pdf  en formato vectorial:
una curva no se remuestrea como una fotografia, asi que el PDF pesa unos pocos
kilobytes y se ve nitido a cualquier ampliacion. La tipografia es la misma del
documento (Trebuchet MS) para que la figura no desentone con el texto.

Ejes: ambos lineales. La magnitud va en ganancia V/V y la frecuencia en MHz,
no en decibelios ni en escala logaritmica. En lineal el pico de resonancia se
ve como lo que es --- una aguja estrecha en medio de una respuesta casi plana ---
y el ancho de banda se lee a 0,707 del maximo, que es el mismo criterio de los
-3 dB expresado sin logaritmos.

Sobre el archivo de datos
-------------------------
El .DAT es un CSV con la cabecera

    "FREQ","R1(1)[X=0.00]", ... ,"R1(1)[X=1.00]"

es decir, la magnitud del nodo sondeado para once valores del parametro X del
barrido. Las once columnas resultan identicas: el parametro no llego a afectar
al circuito en la simulacion que produjo el archivo. Se dibuja una sola curva y
el script avisa por consola si algun dia dejan de coincidir.

Unidades: el simulador exporta en dB o en magnitud lineal segun como este
configurado el eje, y las dos cosas han llegado ya en distintas versiones del
archivo. El script lo detecta solo y se queda siempre con la magnitud lineal.
El criterio es seguro para este circuito: es un divisor pasivo cuya ganancia
nunca pasa de 1, de modo que en dB todos los valores son negativos o cero. Si
todos son positivos, los datos ya son lineales.
"""

import csv
from pathlib import Path

import matplotlib
matplotlib.use('Agg')          # sin ventana: solo escribimos el archivo
import matplotlib.pyplot as plt
import numpy as np

RAIZ = Path(__file__).resolve().parent.parent
DATOS = RAIZ / 'Laboratorio_2' / 'LaTeX' / 'resonador_7100khz.DAT'
SALIDA = RAIZ / 'Laboratorio_2' / 'LaTeX' / 'imagenes' / 'bode_resonador.pdf'

L1 = 27e-6                     # henrios, la bobina del tanque
CAIDA = 1 / np.sqrt(2)         # fraccion del pico que define el ancho de banda


def coma(x, dec=1):
    """Formatea con coma decimal, como el resto del documento."""
    return f'{x:.{dec}f}'.replace('.', ',')


AZUL = '#1f4e79'
GRIS = '#4d4d4d'
ROJO = '#a11a1a'


def leer(ruta):
    """Devuelve (frecuencias en Hz, magnitud lineal) de la primera columna."""
    with ruta.open(encoding='utf-8-sig') as fh:
        lector = csv.reader(fh)
        cabecera = next(lector)
        filas = [[float(x) for x in fila] for fila in lector if fila]

    tabla = np.array(filas)
    frec, curvas = tabla[:, 0], tabla[:, 1:]

    # Las once columnas deberian ser la misma curva; si no, hay que mirar el .DAT.
    if not np.allclose(curvas, curvas[:, [0]]):
        print('  AVISO: las columnas del barrido X no coinciden; se dibuja la primera.')

    curva = curvas[:, 0]
    # Vease la nota sobre unidades en la cabecera del archivo: un valor negativo
    # es imposible en magnitud lineal, asi que delata datos en dB.
    if curva.min() < 0:
        print('  datos en dB; se convierten a magnitud lineal')
        curva = 10 ** (curva / 20)

    # El nodo sondeado se lee de la cabecera ("R1(1)[X=0.00]" -> "R1(1)") en vez de
    # escribirlo a mano: ya cambio una vez al rehacerse el esquema del simulador.
    nodo = cabecera[1].split('[')[0]

    print(f'  {len(frec)} puntos  ·  {len(cabecera) - 1} columnas  ·  '
          f'nodo {nodo}  ·  {frec[0] / 1e6:g} MHz a {frec[-1] / 1e6:g} MHz')
    return frec, curva, nodo


def banda(frec, mag, pico):
    """Frecuencias de corte a 0,707 del pico, interpoladas sobre el eje lineal."""
    umbral = mag[pico] * CAIDA

    def cruce(i):
        # Interpolacion lineal entre las muestras i e i+1. np.interp exige
        # abscisas crecientes, y en el flanco de bajada la magnitud decrece:
        # hay que darle el par invertido o devuelve el extremo.
        x, y = [mag[i], mag[i + 1]], [frec[i], frec[i + 1]]
        if x[0] > x[1]:
            x, y = x[::-1], y[::-1]
        return np.interp(umbral, x, y)

    bajo = next((cruce(i) for i in range(pico) if mag[i] < umbral <= mag[i + 1]), None)
    alto = next((cruce(i) for i in range(pico, len(mag) - 1)
                 if mag[i] >= umbral > mag[i + 1]), None)
    return bajo, alto


def dibujar(frec, mag, nodo):
    pico = int(np.argmax(mag))
    f0, pico_mag = frec[pico], mag[pico]
    bajo, alto = banda(frec, mag, pico)
    ceq = 1 / ((2 * np.pi * f0) ** 2 * L1)

    # Con el eje de frecuencia en lineal, los hercios saldrian en notacion
    # cientifica: se dibuja todo en MHz.
    fmhz, f0m = frec / 1e6, f0 / 1e6

    plt.rcParams.update({
        'font.family': ['Trebuchet MS', 'DejaVu Sans'],
        'font.size': 9,
        'axes.edgecolor': GRIS,
        'axes.labelcolor': GRIS,
        'xtick.color': GRIS,
        'ytick.color': GRIS,
    })

    fig, ax = plt.subplots(figsize=(6.3, 3.5))

    # El orden importa: primero las guias, encima la curva, y las etiquetas al
    # final, cada una en una zona libre del lienzo para que no se pisen.
    umbral = pico_mag * CAIDA
    if bajo and alto:
        ax.axvspan(bajo / 1e6, alto / 1e6, color=AZUL, alpha=0.07, lw=0)

    # La guia se recorta por la izquierda para no tachar la ficha, y su
    # etiqueta va en ese mismo arranque: al final del eje chocaria con la aguja.
    arranque = 0.30
    ax.axhline(umbral, xmin=arranque, color=AZUL, lw=0.7, ls=(0, (5, 4)), alpha=0.6)
    ax.text(fmhz[0] + arranque * (fmhz[-1] - fmhz[0]) + 0.05,
            umbral + pico_mag * 0.015, '0,707 del pico  (-3 dB)', ha='left',
            fontsize=7.5, color=AZUL, alpha=0.85, va='bottom')
    ax.axvline(f0m, color=ROJO, lw=0.8, ls=(0, (2, 3)))

    ax.plot(fmhz, mag, color=AZUL, lw=1.8, solid_joinstyle='round')
    ax.plot([f0m], [pico_mag], 'o', ms=5.5, color=ROJO, zorder=5,
            markeredgecolor='white', markeredgewidth=0.8)

    # Etiqueta del pico. Junto al maximo no cabe hacia la derecha si f0 esta
    # cerca del final del barrido, asi que se ancla a la izquierda de la aguja.
    cerca_del_borde = f0m > (fmhz[0] + 0.75 * (fmhz[-1] - fmhz[0]))
    ax.annotate(f'$f_0$ = {coma(f0m)} MHz   ({coma(pico_mag, 2)} V/V)',
                xy=(f0m, pico_mag), xytext=(-8 if cerca_del_borde else 0, 11),
                textcoords='offset points',
                ha='right' if cerca_del_borde else 'center',
                va='bottom', fontsize=8.5, color=ROJO)

    # Ficha de lectura en la esquina superior izquierda, que queda vacia porque
    # fuera de la resonancia la respuesta es practicamente plana y baja.
    # El valor de L1 se toma de la constante del modulo, no de un literal: antes
    # estaba escrito a mano y quedo desfasado al cambiar la bobina del circuito.
    ficha = [f'Magnitud en el nodo {nodo}',
             f'$C_{{eq}}$ = {coma(ceq * 1e12)} pF  con  $L_1$ = {L1 * 1e6:g} µH']
    if bajo and alto:
        # Un pico de Q alto mide decenas de kHz: en MHz con un decimal se veria
        # como "0.1 MHz" y se perderia la cifra que interesa.
        ancho = alto - bajo
        txt = (f'{coma(ancho / 1e6, 2)} MHz' if ancho >= 1e6
               else f'{ancho / 1e3:.0f} kHz')
        ficha.append(f'BW = {txt}   ·   Q $\\approx$ {coma(f0 / ancho)}')
    ax.text(0.015, 0.97, '\n'.join(ficha),
            transform=ax.transAxes, ha='left', va='top', fontsize=8, color=GRIS,
            linespacing=1.5)

    ax.set_xlim(fmhz[0], fmhz[-1])
    ax.set_ylim(0, pico_mag * 1.22)
    ax.set_xlabel('Frecuencia (MHz)')
    ax.set_ylabel('Ganancia (V/V)')
    ax.grid(which='major', color=GRIS, alpha=0.22, lw=0.6)
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)

    fig.tight_layout(pad=0.4)
    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(SALIDA)
    plt.close(fig)

    print(f'  pico    : {pico_mag:.3f} V/V en {f0m:.2f} MHz')
    if bajo and alto:
        print(f'  0,707   : {bajo / 1e6:.2f} MHz a {alto / 1e6:.2f} MHz  '
              f'(Q = {f0 / (alto - bajo):.2f})')
    print(f'  C equiv : {ceq * 1e12:.2f} pF')
    print(f'  escrito : {SALIDA.relative_to(RAIZ)}  '
          f'({SALIDA.stat().st_size / 1024:.0f} KB)')


if __name__ == '__main__':
    print(f'Leyendo {DATOS.relative_to(RAIZ)}')
    dibujar(*leer(DATOS))
