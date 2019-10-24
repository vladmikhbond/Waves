class Oscillator {
    constructor({r=0, ampl=1, omega=0.1}) {
        this.r = r;  // coordinate
        this.ampl = ampl;
        this.omega = omega;
        this.owner = null;
    }

    next() {
        // changt position
        let contrVelo = 8;
        if (this.r < opts.N - contrVelo && this.owner.chronos % contrVelo == 0)
            this.r += opts.oscV;


        this.owner.w[this.r].x =
            Math.sin(this.omega * this.owner.chronos) * this.ampl;
    }
}

// class Meandr {
//     constructor(r, ampl, omega) {
//         this.r = r;
//         this.ampl = ampl;
//         this.omega = omega;
//         this.owner = null;
//     }
//
//     next() {
//         let h = Math.sin(2 * Math.PI * this.omega * this.owner.chronos);
//         this.owner.w[this.r].x = Math.sign(h) * this.ampl;
//
//     }
// }
//
// class Impuls {
//     constructor(r, ampl) {
//         this.r = r;
//         this.ampl = ampl;
//         this.owner = null;
//     }
//
//     next() {
//         if (this.ampl ) {
//             this.owner.w[this.r].x = this.ampl;
//             this.ampl = 0;
//         }
//     }
// }

