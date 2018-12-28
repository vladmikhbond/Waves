class Sea
{
    constructor(n) {
        this.chronos = -1;
        this.n = n;
        this.oscs = [];
        this.isles = [];
        // water
        this.w = [];
        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < n; c++) {
                row.push({x: 0, f: 0, v: 0, rock: 1});
            }
            this.w.push(row);
        }
        this.point = {r: 0, c: 0};
    }

    addOscillator(r, c, omega, ampl) {
        let osc = new Oscillator(r, c, omega, ampl, this );
        this.oscs.push(osc);
    }

    removeOscillator(r, c) {
        let i = this.oscs.findIndex(o => Math.hypot(o.r - r, o.c - c) < 3);
        if (i !== -1) this.oscs.splice(i, 1);
    }


    getRocksFromCanvasData(canvasData) {
        let n = this.n;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let idx = (c + r * n) * 4;
                if (canvasData.data[idx] === 255)  // red
                    this.w[r][c].rock = 0;
            }
        }
    }

    getRocksFromIsle(isle) {
        let n = this.n;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (isle.has(r, c))  // red
                    this.w[r][c].rock = 0;
            }
        }
    }


    clearRocksInCircle(canvasData, r0, c0, radius) {
        let n = this.n;
        for (let r = r0 - radius; r < r0 + radius; r++) {
            for (let c = c0 - radius; c < c0 + radius; c++) {
                let idx = (c + r * n) * 4;
                if (canvasData.data[idx] === 255)  // red
                    this.w[r][c].rock = 1;
            }
        }
    }

    step() {
        this.chronos++;

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r][o.c].rock)
                o.next();
        }
        // расчет сил
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                if (!this.w[r][c].rock)
                    continue;
                this.w[r][c].f = (this.w[r-1][c].x + this.w[r+1][c].x +
                    this.w[r][c-1].x + this.w[r][c+1].x - this.w[r][c].x * 4) / 4 ;
            }
        }
        // расчет амплитуд

        // точки по периметру
        for (let t = 1; t < n-1; t++) {
            this.w[t][0].x = this.w[t][1].x - this.w[t][1].v;
            this.w[t][n-1].x = this.w[t][n-2].x - this.w[t][n-2].v;
            this.w[0][t].x = this.w[1][t].x - this.w[1][t].v;
            this.w[n-1][t].x = this.w[n-2][t].x - this.w[n-2][t].v;
        }
        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                let p = this.w[r][c];
                if (!p.rock)
                    continue;
                // change v
                p.v += p.f;
                p.v *= opts.W;
                 // change x
                p.x += p.v;
            }
        }
    }

    // замер энергии
    measure() {
        let r0 = this.point.r, c0 = this.point.c;
        let e = 0, n = 0, d = 20;
        for (let r = r0 - d; r < r0 + d; r++) {
            for (let c = c0 - d; c < c0 + d; c++) {
                if (r > 0 && r < this.n && c > 0 && c < this.n) {
                    let x = this.w[r][c].x;
                    let v = this.w[r][c].v;
                    e += Math.abs(x) + v * v / 2;
                    n++;
                }
            }
        }
        return e / n;
    }

 }
