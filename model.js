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
                let center = this.m[r][c].x;
                let up = r > 0 ? this.m[r-1][c].x - center : 0;
                let down = r < n - 1 ? this.m[r+1][c].x - center : 0;
                let left = c > 0 ? this.m[r][c-1].x - center : 0;
                let right = c < n - 1 ? this.m[r][c+1].x - center : 0;
                this.m[r][c].f = (up + down + left + right) / 4 ;
            }
        }
        let min = this.m[1][1].x, max = min;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                this.m[r][c].v += this.m[r][c].f;
                let s = 25
                if (c < s || c > n-s || r < s || r > n-s)
                    this.m[r][c].v *= 0.9;
                this.m[r][c].x += this.m[r][c].v;
            }
        }
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