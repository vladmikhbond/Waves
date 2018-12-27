let opts = {
    D: 3,  // triangle size for 3d visualize
    N: 501, // 3 * 167 = 501
    OMEGA_MIN: 0.2 /(2 * Math.PI),  // 0.2 < OMEGA_MIN < 0.8
    M: 20,                          // Margin = 1/omegaMin
    W: 0.99,
    Kvis: 2**9,                     // visualise coefficient
    Kvis3d: 10,                     // visualise coefficient

    stringify() {
        return `"D": ${this.D},
"N": ${this.N},
"M": ${this.M | 0},
"W": ${this.W},
"OMEGA_MIN": ${this.OMEGA_MIN},
"Kvis": ${this.Kvis},
"Kvis3d": ${this.Kvis3d}`;
    },

    parse() {
        let o = JSON.parse("{" + toolsArea.value + "}");
        Object.assign(this, o);
    }
};
