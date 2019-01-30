class View
{
    constructor(river) {
        this.river = river;
        this.ctx = canvas1.getContext('2d');
        this.n = river.n;
    }


    draw () {
        let n05 = this.n / 2 | 0;

        let ctx = canvas1.getContext('2d');
        ctx.clearRect(0, 0, this.n, this.n);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.moveTo(n05, 0); ctx.lineTo(n05, this.n);
        ctx.moveTo(0, n05); ctx.lineTo(this.n, n05);

        ctx.moveTo(opts.merge, 0); ctx.lineTo(opts.merge, this.n);
        ctx.moveTo(this.n - opts.merge, 0); ctx.lineTo(this.n - opts.merge, this.n);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        for (let x = 0; x < opts.N; x++) {
            let h = this.river.w[x].x;
            ctx.moveTo(x, n05);
            ctx.lineTo(x, n05 + 30 * h);
        }
        ctx.stroke();

        // info
        info.innerHTML = this.river.chronos;
    }



}

