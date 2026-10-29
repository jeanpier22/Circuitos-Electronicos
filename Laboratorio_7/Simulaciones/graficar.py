"""Graficas de las simulaciones de la Practica 7 (salidas wrdata de ngspice)."""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.rcParams.update({"font.size": 10, "axes.grid": True, "grid.alpha": 0.3})

# --- Experimento 3: push-pull clase B y clase AB
fig, axs = plt.subplots(2, 1, figsize=(7, 5.5), sharex=True)
for ax, archivo, titulo in [(axs[0], "exp3_claseB.data", "Clase B: distorsión de cruce"),
                            (axs[1], "exp3_claseAB.data", "Clase AB con dos 1N4148")]:
    d = np.loadtxt(archivo)
    t = (d[:, 0] - 8e-3) * 1e3
    ax.plot(t, d[:, 1], "k", lw=0.8, label="v_in")
    ax.plot(t, d[:, 3], "C3", label="v_o (R_L = 47 Ω)")
    ax.set_ylabel("V")
    ax.set_title(titulo)
    ax.legend(loc="upper right", fontsize=8)
axs[1].set_xlabel("t (ms)")
fig.tight_layout()
fig.savefig("exp3_push_pull.png", dpi=150)
print("listo")
