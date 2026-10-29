"""Graficas de las simulaciones del Practica 6 (salidas wrdata de ngspice)."""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.rcParams.update({"font.size": 10, "axes.grid": True, "grid.alpha": 0.3})

# --- Experimento 1: VCE frente a RB
fig, ax = plt.subplots(figsize=(7, 4))
for archivo, nombre, color in [("exp1_barrido_rb.data", "BC548B", "C0"),
                               ("exp1_barrido_rb_2n2222a.data", "2N2222A", "C3")]:
    d = np.loadtxt(archivo)
    ax.plot(d[:, 0] / 1e3, d[:, 1], color=color, label=nombre)
for rb, txt, y in [(2.2, "2,2 k\n(β forzado 10)", 6.6),
                   (47, "47 k\n(β forzado 200)", 6.6), (100, "100 k", 1.6)]:
    ax.axvline(rb, color="k", ls=":", lw=0.8)
    ax.text(rb * 1.06, y, txt, fontsize=8)
ax.axhline(0.3, color="gray", ls="--", lw=0.8)
ax.text(0.55, 0.45, "V_CE = 0,3 V", fontsize=8, color="gray")
ax.set_xscale("log")
ax.set_xlabel("R_B (kΩ)")
ax.set_ylabel("V_CE (V)")
ax.set_title("Exp. 1: LED azul, V_CC = 12 V, V_BB = 5 V, R_C = 470 Ω")
ax.legend(loc="upper left")
fig.tight_layout()
fig.savefig("exp1_vce_vs_rb.png", dpi=150)

# --- Experimento 3: apertura del rele con y sin diodo volante
c = np.loadtxt("exp3_con_diodo.data")
s = np.loadtxt("exp3_sin_diodo.data")
fig, (a1, a2) = plt.subplots(2, 1, figsize=(7, 5.5), sharex=True)
a1.plot(c[:, 0] * 1e3, c[:, 3], "k", lw=0.8, label="v_A (W1)")
a1.plot(c[:, 0] * 1e3, c[:, 1], "C0", label="v_C con diodo")
a1.set_ylabel("V")
a1.set_ylim(-0.5, 7)
a1.legend(loc="upper right", fontsize=8)
a1.set_title("Exp. 3: relé de 5 V (70 Ω, ~0,1 H) con 2N2222A y R_B = 1,2 kΩ")
a2.plot(s[:, 0] * 1e3, s[:, 1], "C3", label="v_C sin diodo")
a2.set_yscale("symlog", linthresh=10)
a2.axhline(40, color="gray", ls="--", lw=0.8)
a2.text(1, 55, "V_CEO del 2N2222A = 40 V", fontsize=8, color="gray")
a2.set_ylabel("V (escala log)")
a2.set_xlabel("t (ms)")
a2.legend(loc="upper left", fontsize=8)
fig.tight_layout()
fig.savefig("exp3_rele.png", dpi=150)
print("listo")
