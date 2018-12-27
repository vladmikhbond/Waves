let opts = {
    D: 5,                           // triangle size for 3d visualize
    N: 500,                         // 3 * 167 = 501
    OMEGA_MIN: (0.3 /(2 * Math.PI)).toFixed(4),  // 0.2 < OMEGA_MIN < 0.8
    W: 0.99,
    Kvis: 2**9,                     // visualise coefficient
    Kvis3d: 10,                     // visualise coefficient
    "3d": false,

    stringify() {
        return `"D": ${this.D},
"N": ${this.N},
"W": ${this.W},
"OMEGA_MIN": ${this.OMEGA_MIN},
"Kvis": ${this.Kvis},
"Kvis3d": ${this.Kvis3d},
"3d": ${this['3d']}`;
    },

    parse() {
        let obj = JSON.parse("{" + optsArea.value + "}");
        obj.N = Math.round(obj.N / obj.D) * obj.D;
        obj.OMEGA_MIN = Math.round(obj.OMEGA_MIN * 10000) / 10000;
        let reset = this["3d"] != obj["3d"];
        Object.assign(this, obj);
        return reset;
    }
};
