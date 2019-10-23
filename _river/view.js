class View
{
    constructor(river) {
        this.river = river;
        this.ctx = canvas1.getContext('2d');
        this.n = river.n;
    }


    draw () {
        let zeroLevel = 100;

        let ctx = canvas1.getContext('2d');
        ctx.clearRect(0, 0, this.n, this.n);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([1, 1]);

        ctx.beginPath();
        // Ox axis
        ctx.moveTo(0, zeroLevel); ctx.lineTo(this.n, zeroLevel);
        // margin v. line
        ctx.moveTo(this.n - opts.margin, 0); ctx.lineTo(this.n - opts.margin, this.n);

        // osc.ampl lines
        let osc = this.river.oscs[0];
        if (osc) {
            let h = zeroLevel - osc.ampl * opts.V_SCALE;
            ctx.moveTo(0, h); ctx.lineTo(this.n, h);
            h = zeroLevel + osc.ampl * opts.V_SCALE;
            ctx.moveTo(0, h); ctx.lineTo(this.n, h);
        }
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';

        for (let col = 0; col < opts.N; col+=2) {
            let h = this.river.w[col].x;
            ctx.beginPath();
            ctx.moveTo(col, zeroLevel);
            ctx.lineTo(col, zeroLevel - opts.V_SCALE * h);
            ctx.stroke();
        }


        // info
        info.innerHTML = this.river.chronos;
    }



}

