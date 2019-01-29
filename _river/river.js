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
            // node object
            this.w.push({free: 1, m: 1, x: 0, f: 0, v: 0, });
        }
        this.point = 0;
    }

    addOscillator(osc) {
        osc.owner = this;
        this.oscs.push(osc);
    }

    removeOscillatorNear(x) {
        let i = this.oscs.findIndex(o => Math.abs(o.x - x) < 5);
        if (i !== -1) this.oscs.splice(i, 1);
    }


    step() {
        this.chronos++;
        let reflection = false;

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r].free)
                o.next();
        }
        // расчет ускорений (f)
        let n = this.n;
        // крайние точки
        this.w[0].f = (this.w[1].x - this.w[0].x) * opts.Kf / this.w[0].m;
        this.w[n-1].f = (this.w[n-2].x - this.w[n-1].x) * opts.Kf / this.w[n-1].m;
        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            this.w[r].f = (this.w[r-1].x + this.w[r+1].x - this.w[r].x * 2) * opts.Kf / this.w[r].m;
        }

        // расчет отклонений

        // крайние точки
         if (reflection) {
            // полное отражение от границ
            this.w[0].x = this.w[n-1].x = 0;
        } else {
            // поглощение границами (неполное)
            this.w[0].x = this.w[1].x - this.w[1].v;
            this.w[n-1].x = this.w[n-2].x - this.w[n-2].v;
        }

        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            if (!this.w[r].free)
                continue;
            // change v
            this.w[r].v += this.w[r].f ;
            // energy dissipation
            this.w[r].v *= opts.W;
            // change x
            this.w[r].x += this.w[r].v;
        }
    }


}
