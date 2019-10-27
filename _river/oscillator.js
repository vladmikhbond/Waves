class Oscillator {
    constructor() {
        this.r = opts.oscPos;  // coordinate
        this.ampl = 1;
        this.omega = opts.omega;
        this.owner = null;
    }

    next() {
        // change position
        let contrVelo = 2;

        if (this.r < opts.N - contrVelo && this.owner.chronos % contrVelo == 0) {
            this.r += opts.oscV;
            this.owner.w[this.r].x =
                Math.sin(this.omega * this.owner.chronos) * this.ampl;
        } else {
            this.owner.w[this.r].x =
                Math.sin(this.omega * this.owner.chronos) * this.ampl;
        }

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

