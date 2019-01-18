
let opts = {N: 200, W: 1, Kf: 1};

class River
{
    constructor(n) {
        this.chronos = -1;
        this.n = n;
        this.oscs = [];
        this.isles = [];
        // water
        this.w = [];
        for (let r = 0; r < n; r++) {
            this.w.push({x: 0, f: 0, v: 0, free: 1});
        }
        this.point = 0;
    }

    addOscillator(x, omega, ampl) {
        let osc = new Oscillator(x, omega, ampl, this );
        this.oscs.push(osc);
    }

    removeOscillatorNear(x) {
        let i = this.oscs.findIndex(o => Math.abs(o.x - x) < 5);
        if (i !== -1) this.oscs.splice(i, 1);
    }


    step() {
        this.chronos++;

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r].free)
                o.next();
        }
        // расчет сил
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            this.w[r].f = (this.w[r-1].x + this.w[r+1].x - this.w[r].x * 2) / 2 * opts.Kf;
        }

        // расчет отклонений

        // точки на периметре
        let reflect = true;
        if (!reflect) {
            // полное отражение от границ
            this.w[0].x = this.w[n-1].x = 0;
        } else {
            // поглощение границами (неполное)
            this.w[0].x = this.w[1].x - this.w[1].v;
            this.w[n-1].x = this.w[n-2].x - this.w[n-2].v;
        }

        // внутренние точки
        for (let r = 1; r < n-1; r++) {
                 // change v
                this.w[r].v += this.w[r].f;
                this.w[r].v *= opts.W;                ///////
                // change x
                this.w[r].x += this.w[r].v;
        }
    }


}
