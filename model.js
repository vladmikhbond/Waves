class Sea
{
    constructor(n, m) {
        this.chronos = -1;
        this.n = n;
        this.margin = m;
        // water
        this.w = [];
        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < n; c++) {
                row.push({x: 0, f: 0, v: 0});
            }
            this.w.push(row);
        }
        // rocks
        this.rocks = [];
        for (let r = 0; r < n; r++) {
            this.rocks.push(new Array(n));
        }

        // макет скалы
        for (let r = 100; r < 300; r++) {
            this.rocks[r][100] = 1;
        }
    }

    step() {
        this.chronos++;
        let n = this.n;
        // расчет сил
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                if (!this.rocks[r][c])
                    this.w[r][c].f = (this.w[r-1][c].x + this.w[r+1][c].x +
                        this.w[r][c-1].x + this.w[r][c+1].x - this.w[r][c].x * 4) / 4 ;
            }
        }

        // расчет амплитуд
        let s = this.margin;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (this.rocks[r][c])
                    continue;
                let o = this.w[r][c];
                // attenuation at the board
                if (c < s || c > n - s || r < s || r > n - s) {
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
        this.sea.w[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.o * this.sea.chronos) * this.a;
    }


}