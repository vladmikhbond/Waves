class Oscillator {
    constructor(r, omega, ampl, river) {
        this.r = r;
        this.omega = omega;
        this.ampl = ampl;
        this.river = river;
    }

    next() {
        if (this.ampl ) {
            this.river.w[this.r].x = this.ampl;
            this.ampl = 0;
        }
        // this.river.w[this.r].x =
        //     Math.sin(2 * Math.PI * this.omega * this.river.chronos) * this.ampl;
    }

}
