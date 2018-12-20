class Oscillator {
    constructor(r, c, o, a, sea) {
        this.r = r;
        this.c = c;
        this.o = o;
        this.a = a;
        this.sea = sea;
    }

    next() {
        this.sea.w[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.o * this.sea.chronos) * this.a;
    }


}