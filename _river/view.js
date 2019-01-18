class View
{
    constructor(river) {
        this.river = river;
        this.ctx = canvas1.getContext('2d');
        this.n = river.n;
    }


    draw () {
        let y = this.n / 2 | 0;

        let ctx = canvas1.getContext('2d');
        ctx.clearRect(0, 0, this.n, this.n);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(0, y, this.n-1, 0);
        ctx.strokeRect(y, 0, 0, this.n-1);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        for (let x = 0; x < opts.N; x++) {
            let h = this.river.w[x].x;
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 30 * h);
        }
        ctx.stroke();

        // info
        info.innerHTML = this.river.chronos;
    }



}

