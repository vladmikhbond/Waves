class View
{
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas.getContext('2d');

        this.canvasData = this.ctx.getImageData(0, 0, N, N);
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let idx = (c + r * N) * 4;
                // this.canvasData.data[idx    ] = 0;  // red
                // this.canvasData.data[idx + 1] = 0;  // green
                // this.canvasData.data[idx + 2] = 0;  // blue
                // this.canvasData.data[idx + 3] = 0;  // alpha
            }
        }
    }

    draw () {
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let idx = (c + r * N) * 4;
                if (this.sea.w[r][c].r) {
                    this.canvasData.data[idx    ] = 255;  // red
                    // this.canvasData.data[idx + 1] = 0;  // green
                    // this.canvasData.data[idx + 2] = 0;  // blue
                    this.canvasData.data[idx + 3] = 255;  // alpha
                } else {
                    let color = this.sea.w[r][c].x * VIS | 0;

                    const maxColor = 127;
                    if (color > maxColor) color = maxColor;
                    if (color < -maxColor) color = -maxColor;
                    color += 127;

                    this.canvasData.data[idx    ] = 0;  // red
                    // this.canvasData.data[idx + 1] = 0;  // green
                    // this.canvasData.data[idx + 2] = 0;  // blue
                    this.canvasData.data[idx + 3] = color;  // alpha
                }
            }
        }
        this.ctx.putImageData(this.canvasData, 0, 0);
        this.drawInfo();
    }

    draw1 () {
        this.ctx.lineWidth = 1;
        this.ctx.style = 'black';

        let r = N / 2;
        this.ctx.clearRect(0, 0, N, N);
        this.ctx.beginPath();
        for (let c = 0; c < N; c++) {
            let h = this.sea.w[r][c].x;
            this.ctx.moveTo(c, r);
            this.ctx.lineTo(c, r + 30 * h);
        }
        this.ctx.stroke();
        this.drawInfo();
    }

    drawInfo() {
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeRect(sea.margin, sea.margin, N - 2 * sea.margin, N - 2 * sea.margin);
        info.innerHTML = sea.chronos;
    }

}



