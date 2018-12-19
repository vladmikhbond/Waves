class Sea {
    constructor(n, m) {
        this.t = -1;
        this.n = n;
        this.margin = m;
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
        this.t++;
        let n = this.n;
        // расчет сил
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

        // препятствие
        // for (let r = 100; r < 200; r++) {
        //     sea.m[r][N/4].f = 0;
        // }

        let s = this.margin;
        // расчет амплитуд
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let o = this.m[r][c];

                // attenuation
                if (c < s || c > n-s || r < s || r > n-s) {
                    let di = Math.min(c, r, n - c, n - r );
                    let w = 0.6 + 0.4 * di / s;
                    o.f *= w;
                    // change v
                    o.v += o.f;
                    o.v *= w;
                } else {
                    // change v
                    o.v += o.f;
                }
                // change x
                o.x += o.v;
            }
        }
    }
}


class Oscillator {
    constructor(r, c, o, a, sea) {
        this.r = r;
        this.c = c;
        this.o = o;
        this.a = a;
        this.sea = sea;
    }

    next() {
        this.sea.m[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.o * this.sea.t) * this.a;
    }


}