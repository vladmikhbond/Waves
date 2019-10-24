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

        for (let i = 0; i < opts.margin; i++) {
            let r = n - opts.margin + i;
            this.w[r].w = opts.W;
        }

    }

    addOscillator(osc) {
        osc.owner = this;
        this.oscs.push(osc);
    }

    removeOscillatorNear(x) {
        let i = this.oscs.findIndex(o => Math.abs(o.x - x) < 5);
        if (i !== -1) {
            this.oscs.splice(i, 1);
        }
    }


    step() {
        this.chronos++;

        // oscillators
        let osc = this.oscs[0];
        osc.next();

        let n = this.n;
        // === расчет сил (только внутренние точки)
        for (let r = 1; r < n-1; r++) {
            this.w[r].a = (this.w[r-1].x + this.w[r+1].x - this.w[r].x * 2) * this.w[r].km;
        }

        // === расчет отклонений

        let reflection = 0;

        // периферийные точки
        if (reflection) {
            // полное отражение от границ
            this.w[0].x = 0;
            this.w[n-1].x = 0;
        } else {
            // поглощение границами (неполное)
             this.w[0].x = this.w[1].x
             this.w[n-1].x = this.w[n-2].x
        }

        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            if ( r === osc.r)
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
