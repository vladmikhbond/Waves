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
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let m = this.m[r][c].x;
                let a = r !== 0     ? this.m[r-1][c].x - m : 0;
                let b = r !== n - 1 ? this.m[r+1][c].x - m : 0;
                let d = c !== 0     ? this.m[r][c-1].x - m : 0;
                let e = c !== n - 1 ? this.m[r][c+1].x - m : 0;
                this.m[r][c].f = (a + b + d + e) / 4;
            }
        }
        let min = this.m[1][1].x, max = min;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
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