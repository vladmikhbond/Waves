class View
{
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas2d.getContext('2d');
        this.canvasData = this.ctx.getImageData(0, 0, opts.N, opts.N);
    }

    draw () {
        this.canvasData = this.ctx.getImageData(0, 0, opts.N, opts.N);

        for (let r = 0; r < opts.N; r++) {
            for (let c = 0; c < opts.N; c++) {
                let idx = (c + r * opts.N) * 4;
                if (!this.sea.w[r][c].free) {
                    // draw free
                    this.canvasData.data[idx    ] = 255;  // red
                    // this.canvasData.data[idx + 1] = 0;  // green
                    // this.canvasData.data[idx + 2] = 0;  // blue
                    this.canvasData.data[idx + 3] = 255;  // alpha
                } else {
                    // define color
                    let color = this.sea.w[r][c].x * opts.Kvis | 0;
                    const maxColor = 127;
                    if (color > maxColor) color = maxColor;
                    if (color < -maxColor) color = -maxColor;
                    color += 127;
                    // draw water
                    this.canvasData.data[idx    ] = 0;  // red
                    // this.canvasData.data[idx + 1] = 0;  // green
                    this.canvasData.data[idx + 2] = 100;  // blue
                    this.canvasData.data[idx + 3] = color;  // alpha
                }
            }
        }
        // draw oscillators
        for (let o of this.sea.oscs) {
            let idx = (o.c + o.r * opts.N) * 4;
            // this.canvasData.data[idx    ] = 255;  // red
            // this.canvasData.data[idx + 1] = 255;  // green
            // this.canvasData.data[idx + 2] = 255;  // blue
            this.canvasData.data[idx + 3] = 0;  // alpha
        }
        this.ctx.putImageData(this.canvasData, 0, 0);

        this.draw1();
    }

    draw1 () {
        let r = this.sea.point.r;
        let c = this.sea.point.c;

        let ctx = canvas1d.getContext('2d');
        ctx.clearRect(0, 0, opts.N, opts.N);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.1;
        ctx.strokeRect(0,r, opts.N-1, 0);
        ctx.strokeRect(c,0, 0, opts.N-1);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        for (let c = 0; c < opts.N; c++) {
            let h = this.sea.w[r][c].x * kvisRange.value;
            ctx.moveTo(c, r);
            ctx.lineTo(c, r + 30 * h);
        }
        ctx.stroke();
    }

    drawInfo() {
        playPauseButton.innerHTML = this.sea.chronos;
        info.innerHTML = this.sea.point.e;
    }
    
    drawRockLine(r0, c0, r, c, lineWidth) {
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();
        this.ctx.moveTo(c0, r0);
        this.ctx.lineTo(c, r);
        this.ctx.stroke();
    }

    // drawCircle(r0, c0, radius) {
    //     this.ctx.lineWidth = 2;
    //     this.ctx.strokeStyle = 'orange';
    //     this.ctx.beginPath();
    //     this.ctx.ellipse(c0, r0, radius, radius, 0, 0, 2*Math.PI );
    //     this.ctx.stroke();
    // }

}



