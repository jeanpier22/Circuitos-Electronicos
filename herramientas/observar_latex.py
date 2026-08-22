"""
Recompila el LaTeX cada vez que se guarda y actualiza el PDF que sirve la web.

Uso:
    python herramientas/observar_latex.py 1        # vigila la practica 1
    python herramientas/observar_latex.py 1 --una  # compila una vez y termina

Que hace en cada cambio:
    1. Ejecuta xelatex (el documento usa Trebuchet MS, una fuente del
       sistema que pdflatex no sabe cargar). Si el registro pide otra pasada (referencias cruzadas,
       indice), la repite: una sola pasada dejaria "??" en las referencias.
    2. Copia el PDF y el .tex a web/public/practicas/labN/, que es de donde
       los lee el navegador.
    3. El servidor de Vite detecta el archivo nuevo y recarga la pagina.

No comprime el PDF: durante la edicion se sirve en local y da igual que pese,
mientras que comprimir anadiria unos segundos a cada ciclo. Antes de publicar
hay que pasarlo por herramientas/comprimir_pdf.py.
"""

import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
INTERVALO = 0.7  # segundos entre comprobaciones


def rutas(numero):
    fuente = RAIZ / f'Laboratorio_{numero}' / 'LaTeX'
    return {
        'dir': fuente,
        'tex': fuente / f'Laboratorio_{numero}.tex',
        'pdf': fuente / f'Laboratorio_{numero}.pdf',
        'imagenes': fuente / 'imagenes',
        'destino': RAIZ / 'web' / 'public' / 'practicas' / f'lab{numero}',
    }


def huella(r):
    """Marca de tiempo combinada del .tex y de las imagenes."""
    marcas = []
    if r['tex'].exists():
        marcas.append(r['tex'].stat().st_mtime)
    if r['imagenes'].is_dir():
        marcas += [p.stat().st_mtime for p in r['imagenes'].iterdir() if p.is_file()]
    return max(marcas) if marcas else 0


def errores_del_log(log):
    """Extrae del registro de LaTeX solo las lineas utiles para corregir."""
    if not log.exists():
        return ['(no se generó registro)']
    texto = log.read_text(encoding='utf-8', errors='replace')
    salida = []
    for i, linea in enumerate(texto.splitlines()):
        if linea.startswith('!'):
            salida.append(linea)
        elif re.match(r'^l\.\d+', linea):  # numero de linea del error
            salida.append('  ' + linea)
    return salida[:12] or ['(sin errores explícitos; revisa el .log)']


def compilar(r):
    inicio = time.time()
    for pasada in (1, 2):
        proceso = subprocess.run(
            ['xelatex', '-interaction=nonstopmode', '-halt-on-error',
             r['tex'].name],
            cwd=r['dir'], capture_output=True, text=True, errors='replace',
        )
        if proceso.returncode != 0:
            print('\n  ERROR DE COMPILACIÓN')
            for linea in errores_del_log(r['pdf'].with_suffix('.log')):
                print('   ', linea)
            print('  El PDF anterior sigue publicado; corrige y guarda otra vez.\n')
            return False

        registro = proceso.stdout
        if pasada == 1 and 'Rerun to get' not in registro and 'Rerun LaTeX' not in registro:
            break  # no hacen falta dos pasadas

    r['destino'].mkdir(parents=True, exist_ok=True)
    shutil.copy2(r['pdf'], r['destino'] / r['pdf'].name)
    shutil.copy2(r['tex'], r['destino'] / r['tex'].name)

    peso = r['pdf'].stat().st_size / 1e6
    print(f'  OK  {time.strftime("%H:%M:%S")}  ·  {peso:.1f} MB  ·  '
          f'{time.time() - inicio:.1f}s  ->  recarga el navegador')
    return True


def main():
    numero = sys.argv[1] if len(sys.argv) > 1 else '1'
    r = rutas(numero)

    if not r['tex'].exists():
        sys.exit(f'No existe {r["tex"]}')

    print(f'Vigilando  {r["tex"].relative_to(RAIZ)}')
    print(f'Publicando en  {r["destino"].relative_to(RAIZ)}')
    print('Guarda el .tex para recompilar.  Ctrl+C para salir.\n')

    compilar(r)
    if '--una' in sys.argv:
        return

    ultima = huella(r)
    while True:
        time.sleep(INTERVALO)
        actual = huella(r)
        if actual != ultima:
            ultima = actual
            print(f'  cambio detectado, compilando…')
            compilar(r)
            ultima = huella(r)  # la compilacion no debe dispararse a si misma


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\nvigilancia detenida')
