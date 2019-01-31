class View
{
    constructor(river) {
        this.river = river;
        this.ctx = canvas1.getContext('2d');
        this.n = river.n;
    }


    draw () {
        const V_SCALE = 30;
        let n05 = this.n / 2 | 0;

        let ctx = canvas1.getContext('2d');
        ctx.clearRect(0, 0, this.n, this.n);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([5, 3]);


        ctx.beginPath();
        // Ox axis
        ctx.moveTo(0, n05); ctx.lineTo(this.n, n05);
        // merge v. line
        ctx.moveTo(this.n - opts.merge, 0); ctx.lineTo(this.n - opts.merge, this.n);
        // osc.ampl lines
        let osc = this.river.oscs[0];
        if (osc) {
            let h = n05 - osc.ampl * V_SCALE;
            ctx.moveTo(0, h); ctx.lineTo(this.n, h);
            h = n05 + osc.ampl * V_SCALE;
            ctx.moveTo(0, h); ctx.lineTo(this.n, h);
        }
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        for (let x = 0; x < opts.N; x++) {
            let h = this.river.w[x].x;
            ctx.moveTo(x, n05);
            ctx.lineTo(x, n05 + V_SCALE * h);
        }
        ctx.stroke();

        // info
        info.innerHTML = this.river.chronos;
    }



}

