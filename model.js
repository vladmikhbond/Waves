class Sea {
    constructor(n) {
        this.m = [];
        for (let r = 0; r < n; r++) {
            let q = [];
            for (let c = 0; c < n; c++) {
                q.push({x: 0, f: 0, v: 0});
            }
            this.m.push(q);
        }
    }

    step() {
        let n = this.m.length;
        for (let r = 1; r < n - 1; r++) {
            for (let c = 1; c < n - 1; c++) {
                this.m[r][c].f = (
                    this.m[r-1][c].x + this.m[r+1][c].x +
                    this.m[r][c-1].x + this.m[r][c+1].x -
                    4 * this.m[r][c].x) / 4;
            }
        }
        let min = this.m[1][1].x, max = min;
        for (let r = 1; r < n - 1; r++) {
            for (let c = 1; c < n - 1; c++) {
                this.m[r][c].v += this.m[r][c].f;
                this.m[r][c].x += this.m[r][c].v;

                if (this.m[r][c].x < min) min = this.m[r][c].x;
                if (this.m[r][c].x > max) max = this.m[r][c].x;
            }
        }
        this.min = min;
        this.max = max;
    }
}


class Vibrator {
    constructor(r, c, o, a, sea) {
        this.r = r;
        this.c = c;
        this.o = o;
        this.a = a;
        this.sea = sea;
        this.t = 0;
    }

    next() {
        this.sea.m[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.o * this.t++) * this.a;
    }


}