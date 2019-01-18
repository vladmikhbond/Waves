class Oscillator {
    constructor(r, ampl, omega) {
        this.r = r;
        this.omega = omega;
        this.ampl = ampl;
        this.owner = null;
    }

    next() {
        this.owner.w[this.r].x =
            Math.sin(2 * Math.PI * this.omega * this.owner.chronos) * this.ampl;
    }
}

class Impuls {
    constructor(r, ampl) {
        this.r = r;
        this.ampl = ampl;
        this.owner = null;
    }

    next() {
        if (this.ampl ) {
            this.owner.w[this.r].x = this.ampl;
            this.ampl = 0;
        }
    }
}

