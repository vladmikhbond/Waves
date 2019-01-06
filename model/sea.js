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
                row.push({x: 0, f: 0, v: 0, free: 1});
            }
            this.w.push(row);
        }
        this.point = {r: 0, c: 0};
    }

    addOscillator(r, c, omega, ampl) {
        let osc = new Oscillator(r, c, omega, ampl, this );
        this.oscs.push(osc);
    }

    removeOscillatorNear(r, c) {
        let i = this.oscs.findIndex(o => Math.hypot(o.r - r, o.c - c) < 5);
        if (i !== -1) this.oscs.splice(i, 1);
    }


    getRocksFromCanvasData(canvasData) {
        let n = this.n;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let idx = (c + r * n) * 4;
                if (canvasData.data[idx] > 0)  // red
                    this.w[r][c].free = 0;
            }
        }
    }


    // clearRocksInCircle(canvasData, r0, c0, radius) {
    //     let n = this.n;
    //     for (let r = r0 - radius; r < r0 + radius; r++) {
    //         for (let c = c0 - radius; c < c0 + radius; c++) {
    //             let idx = (c + r * n) * 4;
    //             if (canvasData.data[idx] > 0)  // red
    //                 this.w[r][c].free = 1;
    //         }
    //     }
    // }

    step() {
        this.chronos++;

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r][o.c].free)
                o.next();
        }
        // расчет сил
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++)
            {
                this.w[r][c].f = (this.w[r-1][c].x + this.w[r+1][c].x +
                    this.w[r][c-1].x + this.w[r][c+1].x - this.w[r][c].x * 4) / 4 ;
            }
        }

        // расчет отклонений

        // точки на периметре
        for (let p = 1; p < n-1; p++) {
            if (opts.R) {
                // полное отражение от границ
                this.w[p][0].x = this.w[p][n-1].x = this.w[0][p].x = this.w[n-1][p].x = 0;
            } else {
                // поглощение границами (неполное)
                this.w[p][0].x   = this.w[p][1].x   - this.w[p][1].v;

                this.w[p][n-1].x = this.w[p][n-2].x - this.w[p][n-2].v;
                this.w[0][p].x   = this.w[1][p].x   - this.w[1][p].v;
                this.w[n-1][p].x = this.w[n-2][p].x - this.w[n-2][p].v;
            }
        }
        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                // change v
                this.w[r][c].v += this.w[r][c].f;
                this.w[r][c].v *= opts.W;
                 // change x
                this.w[r][c].x += this.w[r][c].v;

                // rock
                if (!this.w[r][c].free) {
                    this.w[r][c].x = 0;
                    // eat energy
                    // this.w[r][c].v = 0;
                    // this.w[r][c].x = (this.w[r-1][c].x + this.w[r+1][c].x + this.w[r][c+1].x + this.w[r][c-1].x) / 4;
                }


            }
        }
    }

    // замер плотности энергии в области {c0, r0, w, h}
    energyDensity(o) {
        let e = 0, n = 0;
        for (let r = o.r0;  r < o.r0 + o.w; r++) {
            for (let c = o.c0;  c < o.c0 + o.h; c++) {
                let dxr = this.w[r][c].x - this.w[r-1][c].x;
                let dxc = this.w[r][c].x - this.w[r][c-1].x;
                let v = this.w[r][c].v;
                e += (dxr**2 + dxc**2) / 4 + v**2;
                n++;
            }
        }
        return e / n;
    }

    // замер энергии в целом
    //
    energyTotal() {
        let eP = 0, eC = 0;
        for (let r = 1; r < this.n-1; r++) {
            for (let c = 1; c < this.n-1; c++) {
                let dxr = this.w[r][c].x - this.w[r-1][c].x;
                let dxc = this.w[r][c].x - this.w[r][c-1].x;
                let v = this.w[r][c].v;
                eP += (dxr**2 + dxc**2)/4;
                eC += v**2;
            }
        }
        return {eP, eC};
    }

 }
