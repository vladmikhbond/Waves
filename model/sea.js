class Sea
{
    constructor(n, m) {
        this.chronos = -1;
        this.n = n;
        this.margin = m;
        this.oscs = [];
        // water
        this.w = [];
        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < n; c++) {
                row.push({x: 0, f: 0, v: 0, rock: 0});
            }
            this.w.push(row);
        }
    }

    addOscillator(r, c, omega, ampl) {
        let osc = new Oscillator(r, c, omega, ampl, this );
        this.oscs.push(osc);
    }

    removeOscillator(r, c) {
        let i = this.oscs.findIndex(o => Math.hypot(o.r - r, o.c - c) < 3);
        if (i !== -1) this.oscs.splice(i, 1);
    }


    rocksFromImg(canvasData) {
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                let idx = (c + r * n) * 4;
                if (canvasData.data[idx] === 255)  // red
                    this.w[r][c].rock = 1;
            }
        }
    }

    clearRocks(canvasData, r0, c0, radius) {
        let n = this.n;
        for (let r = r0 - radius; r < r0 + radius; r++) {
            for (let c = c0 - radius; c < c0 + radius; c++) {
                let idx = (c + r * n) * 4;
                if (canvasData.data[idx] === 255)  // red
                    this.w[r][c].rock = 0;
            }
        }
    }

    step() {
        this.chronos++;

        // oscillators
        for (let o of this.oscs) {
            o.next();
        }
        // расчет сил
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                if (this.w[r][c].rock)
                    continue;
                this.w[r][c].f = (this.w[r-1][c].x + this.w[r+1][c].x +
                    this.w[r][c-1].x + this.w[r][c+1].x - this.w[r][c].x * 4) / 4 ;
            }
        }

        // расчет амплитуд
        let m = this.margin;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (this.w[r][c].rock)
                    continue;
                let o = this.w[r][c];
                // attenuation at the board
                if (c < m || c > n - m || r < m || r > n - m) {
                    let di = Math.min(c, r, n - c, n - r );
                    let k = 0.6 + 0.4 * di / m;
                    o.f *= k;
                    // change v
                    o.v += o.f;
                    o.v *= k;
                } else {
                    // change v
                    o.v += o.f;
                    o.v *= W;
                }
                // change x
                o.x += o.v;
            }
        }
    }

 }
