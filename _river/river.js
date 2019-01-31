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
            // km = K / m (модуль упругости, деленный на массу)
            this.w.push({free: 1, w: opts.W, km: opts.Km, x: 0, a: 0, v: 0, });
        }

        let w = opts.W;
        for (let i = 0; i < opts.merge; i++) {
            let r = n - opts.merge + i;
            w -= 0.001;
            this.w[r].w = w;
        }

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

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r].free)
                o.next();
        }
        // расчет ускорений
        let n = this.n;
        // крайние точки
        this.w[0].a = (this.w[1].x - this.w[0].x) * this.w[0].km;
        this.w[n-1].a = (this.w[n-2].x - this.w[n-1].x) * this.w[n-1].km;
        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            this.w[r].a = (this.w[r-1].x + this.w[r+1].x - this.w[r].x * 2) * this.w[r].km;
        }

        // расчет отклонений

        let reflection = 0;

        // крайние точки
        if (reflection) {
            // полное отражение от границ
            this.w[0].x = this.w[n-1].x = 0;
        } else {
            // поглощение границами (неполное)
             this.w[0].x = this.w[1].x - this.w[1].v;
             this.w[n-1].x = this.w[n-2].x - this.w[n-2].v;
             this.w[0].v = 0;
             this.w[n-1].v = 0;
        }

        // все точки
        for (let r = 1; r < n-1; r++) {
            if (!this.w[r].free)
                continue;
            // change v
            this.w[r].v += this.w[r].a ;
            // energy dissipation
            this.w[r].v *= this.w[r].w;
            // change x
            this.w[r].x += this.w[r].v;
        }
    }


}
