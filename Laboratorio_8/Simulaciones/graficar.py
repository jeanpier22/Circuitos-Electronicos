"""Graficas de las simulaciones de la Practica 8 (salidas wrdata de ngspice)."""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

plt.rcParams.update({"font.size": 10, "axes.grid": True, "grid.alpha": 0.3})

# --- Experimentos 1 y 3: curvas de transferencia del 2N5457 y del 2N7000
fig, axs = plt.subplots(1, 2, figsize=(9, 3.6))
d = np.loadtxt("exp1_transferencia.data")
axs[0].plot(d[:, 0], d[:, 1] * 1e3, "C0", label="simulado")
vgs = np.linspace(-1.4, 0, 50)
axs[0].plot(vgs, 2.1 * (1 - vgs / -1.4) ** 2, "k--", lw=0.8, label="Shockley (2,1 mA; -1,4 V)")
axs[0].set_xlabel("V_GS (V)")
axs[0].set_ylabel("I_D (mA)")
axs[0].set_title("JFET 2N5457")
axs[0].legend(fontsize=8)
d = np.loadtxt("exp3_transferencia.data")
axs[1].plot(d[:, 0], d[:, 1] * 1e3, "C3")
axs[1].set_xlabel("V_GS (V)")
axs[1].set_ylabel("I_D (mA)")
axs[1].set_title("MOSFET 2N7000 (12 V, R_D = 1 kΩ)")
fig.tight_layout()
fig.savefig("exp1_exp3_transferencia.png", dpi=150)

# --- Experimento 2: corriente en el LED contra V_DD
d = np.loadtxt("exp2_fuente.data")
fig, ax = plt.subplots(figsize=(6, 3.6))
ax.plot(d[:, 0], d[:, 1] * 1e3, "C0", label="A: R_S = 0")
ax.plot(d[:, 2], d[:, 3] * 1e3, "C1", label="B: R_S = 390 Ω")
ax.plot(d[:, 4], d[:, 5] * 1e3, "C2", label="C: solo 4,7 kΩ")
ax.set_xlabel("V_DD (V)")
ax.set_ylabel("I_LED (mA)")
ax.set_title("El JFET como fuente de corriente")
ax.legend(fontsize=8)
fig.tight_layout()
fig.savefig("exp2_fuente.png", dpi=150)

# --- Experimento 4: PWM con D = 25 %
d = np.loadtxt("exp4_pwm25.data")
t = (d[:, 0] - 2e-3) * 1e3
fig, axs = plt.subplots(2, 1, figsize=(7, 4.5), sharex=True)
axs[0].plot(t, d[:, 1], "k", lw=0.8, label="v_W1")
axs[0].plot(d[:, 2] * 0 + t, d[:, 3], "C3", label="v_DS")
axs[0].set_ylabel("V")
axs[0].legend(loc="upper right", fontsize=8)
axs[1].plot(t, d[:, 5] * 1e3, "C0")
axs[1].set_ylabel("I_D (mA)")
axs[1].set_xlabel("t (ms)")
axs[0].set_title("Atenuador PWM, D = 25 %")
fig.tight_layout()
fig.savefig("exp4_pwm25.png", dpi=150)
print("listo")
