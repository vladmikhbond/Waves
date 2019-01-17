class Oscillator {
    constructor(x, o, a, river) {
        this.x = x;
        this.omega = o;
        this.ampl = a;
        this.river = river;
    }

    next() {
        this.river.w[this.x].x =
            Math.sin(2 * Math.PI * this.omega * this.river.chronos) * this.ampl;
    }

}
