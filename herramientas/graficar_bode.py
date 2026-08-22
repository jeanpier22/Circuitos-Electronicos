"""
Dibuja el diagrama de Bode del resonador del Laboratorio 2 a partir del
barrido en frecuencia exportado por el simulador (LAB2.DAT).

Uso:
    pip install matplotlib numpy
    python herramientas/graficar_bode.py

Genera  Laboratorio_2/LaTeX/imagenes/bode_resonador.pdf  en formato vectorial:
una curva no se remuestrea como una fotografia, asi que el PDF pesa unos pocos
kilobytes y se ve nitido a cualquier ampliacion. La tipografia es la misma del
documento (Trebuchet MS) para que la figura no desentone con el texto.

Sobre el archivo de datos
-------------------------
LAB2.DAT es un CSV con la cabecera

    "FREQ","C1(2)[X=0.00]", ... ,"C1(2)[X=1.00]"

es decir, la magnitud en dB del nodo C1(2) para once valores del parametro X
del barrido. Las once columnas resultan identicas: el parametro no llego a
afectar al circuito en la simulacion que produjo el archivo. Se dibuja una
sola curva y el script avisa por consola si algun dia dejan de coincidir.
"""

import csv
from pathlib import Path

import matplotlib
matplotlib.use('Agg')          # sin ventana: solo escribimos el archivo
import matplotlib.pyplot as plt
import numpy as np

RAIZ = Path(__file__).resolve().parent.parent
DATOS = RAIZ / 'Laboratorio_2' / 'LaTeX' / 'LAB2.DAT'
SALIDA = RAIZ / 'Laboratorio_2' / 'LaTeX' / 'imagenes' / 'bode_resonador.pdf'

L1 = 10e-6      # henrios, la bobina del tanque
CAIDA = 3.0     # dB por debajo del pico que definen el ancho de banda

AZUL = '#1f4e79'
GRIS = '#4d4d4d'
ROJO = '#a11a1a'


def leer(ruta):
    """Devuelve (frecuencias, magnitud en dB) de la primera columna de datos."""
    with ruta.open(encoding='utf-8-sig') as fh:
        lector = csv.reader(fh)
        cabecera = next(lector)
        filas = [[float(x) for x in fila] for fila in lector if fila]

    tabla = np.array(filas)
    frec, curvas = tabla[:, 0], tabla[:, 1:]

    # Las once columnas deberian ser la misma curva; si no, hay que mirar el .DAT.
    if not np.allclose(curvas, curvas[:, [0]]):
        print('  AVISO: las columnas del barrido X no coinciden; se dibuja la primera.')
    print(f'  {len(frec)} puntos  ·  {len(cabecera) - 1} columnas  ·  '
          f'{frec[0] / 1e6:g} MHz a {frec[-1] / 1e6:g} MHz')
    return frec, curvas[:, 0]


def banda(frec, db, pico):
    """Frecuencias de corte a -3 dB, interpoladas sobre el eje logaritmico."""
    umbral = db[pico] - CAIDA
    lx = np.log10(frec)

    def cruce(i):
        # Interpolacion lineal en log(f) entre las muestras i e i+1.
        # np.interp exige abscisas crecientes, y en el flanco de bajada los dB
        # decrecen: hay que darle el par invertido o devuelve el extremo.
        x, y = [db[i], db[i + 1]], [lx[i], lx[i + 1]]
        if x[0] > x[1]:
            x, y = x[::-1], y[::-1]
        return 10 ** np.interp(umbral, x, y)

    bajo = next((cruce(i) for i in range(pico) if db[i] < umbral <= db[i + 1]), None)
    alto = next((cruce(i) for i in range(pico, len(db) - 1)
                 if db[i] >= umbral > db[i + 1]), None)
    return bajo, alto


def dibujar(frec, db):
    pico = int(np.argmax(db))
    f0, pico_db = frec[pico], db[pico]
    bajo, alto = banda(frec, db, pico)
    ceq = 1 / ((2 * np.pi * f0) ** 2 * L1)

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
    if bajo and alto:
        ax.axvspan(bajo, alto, color=AZUL, alpha=0.07, lw=0)
        ax.annotate('', xy=(bajo, pico_db - CAIDA), xytext=(alto, pico_db - CAIDA),
                    arrowprops=dict(arrowstyle='<->', color=AZUL, lw=0.9))
        # La cifra del ancho de banda va en la ficha de la esquina: junto a la
        # flecha se cruzaria con la vertical de f0 y con los flancos de la curva.

    ax.axhline(pico_db - CAIDA, color=AZUL, lw=0.7, ls=(0, (5, 4)), alpha=0.6)
    # A la derecha, no a la izquierda: alli la esquina la ocupa la ficha.
    ax.text(frec[-1] * 0.88, pico_db - CAIDA + 0.7, '-3 dB', ha='right',
            fontsize=7.5, color=AZUL, alpha=0.85, va='bottom')
    ax.axvline(f0, color=ROJO, lw=0.8, ls=(0, (2, 3)))

    ax.plot(frec, db, color=AZUL, lw=1.8, solid_joinstyle='round')
    ax.plot([f0], [pico_db], 'o', ms=5.5, color=ROJO, zorder=5,
            markeredgecolor='white', markeredgewidth=0.8)

    # Etiqueta del pico, centrada justo encima del marcador.
    ax.annotate(f'$f_0$ = {f0 / 1e6:.1f} MHz   ({pico_db:.2f} dB)',
                xy=(f0, pico_db), xytext=(0, 11), textcoords='offset points',
                ha='center', va='bottom', fontsize=8.5, color=ROJO)

    # Ficha de lectura en la esquina superior izquierda, que queda vacia porque
    # la curva entra por abajo con pendiente de +20 dB/decada.
    ficha = ['Magnitud en el nodo C1(2)',
             f'$C_{{eq}}$ = {ceq * 1e12:.1f} pF  con  $L_1$ = 10 µH']
    if bajo and alto:
        ficha.append(f'BW$_{{-3\\,dB}}$ = {(alto - bajo) / 1e6:.1f} MHz'
                     f'   ·   Q $\\approx$ {f0 / (alto - bajo):.2f}')
    ax.text(0.015, 0.97, '\n'.join(ficha),
            transform=ax.transAxes, ha='left', va='top', fontsize=8, color=GRIS,
            linespacing=1.5)

    ax.set_xscale('log')
    ax.set_xlim(frec[0], frec[-1])
    ax.set_ylim(min(db) - 3, max(db) + 9)
    ax.set_xlabel('Frecuencia (Hz)')
    ax.set_ylabel('Ganancia (dB)')
    ax.grid(which='major', color=GRIS, alpha=0.22, lw=0.6)
    ax.grid(which='minor', color=GRIS, alpha=0.10, lw=0.4)
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)

    fig.tight_layout(pad=0.4)
    SALIDA.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(SALIDA)
    plt.close(fig)

    print(f'  pico    : {pico_db:.3f} dB en {f0 / 1e6:.2f} MHz')
    if bajo and alto:
        print(f'  -3 dB   : {bajo / 1e6:.2f} MHz a {alto / 1e6:.2f} MHz  '
              f'(Q = {f0 / (alto - bajo):.2f})')
    print(f'  C equiv : {ceq * 1e12:.2f} pF')
    print(f'  escrito : {SALIDA.relative_to(RAIZ)}  '
          f'({SALIDA.stat().st_size / 1024:.0f} KB)')


if __name__ == '__main__':
    print(f'Leyendo {DATOS.relative_to(RAIZ)}')
    dibujar(*leer(DATOS))
