class Isle {
    constructor(r, c) {
        this.capes = [{r, c}];
    }

    addShore(r1, c1, r2, c2) {
        if (Math.hypot(this.last.r - r1, this.last.c - c1) < 3) {
            this.capes.push({r: r2, c: c2});
            return true;
        }
        return false;
    }

    get last() {
        return this.capes[this.capes.length - 1];
    }

    get closed() {
        let a = this.capes[0], b = this.last;
        return Math.hypot(a.r - b.r, a.c - b.c) < 3;
    }

    has(r, c) {
        let rs = this.capes.map((a, i) => a.r);
        let cs = this.capes.map((a, i) => a.c);
        return Math.min(...rs) <= r && r <= Math.max(...rs) && Math.min(...cs) <= c && c <= Math.max(...cs);
    }
}