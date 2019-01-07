class Oscillator {
    constructor(r, c, o, a, sea) {
        this.r = r;
        this.c = c;
        this.omega = o;
        this.ampl = a;
        this.sea = sea;
    }

    next() {
        this.sea.w[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.omega * this.sea.chronos) * this.ampl;
    }


}