class View {
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas.getContext('2d');

        this.canvasData = this.ctx.getImageData(0, 0, N, N);
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let index = (c + r * N) * 4;
                this.canvasData.data[index    ] = 255;  // reg
                this.canvasData.data[index + 1] = 255;  // green
                this.canvasData.data[index + 2] = 255;  // blue
                this.canvasData.data[index + 3] = 255;  // alpha
            }
        }

    }

    draw () {
        let delta = this.sea.max - this.sea.min;
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let color = this.sea.m[r][c].x > 10e-3 ? 0 : 255;

                let index = (c + r * N) * 4;
                this.canvasData.data[index    ] = color;
                this.canvasData.data[index + 1] = color;
                this.canvasData.data[index + 2] = color;
            }
        }
        this.ctx.putImageData(this.canvasData, 0, 0);
        info.innerHTML = sea.m[N / 2][N / 2].x;
    }

    draw1 () {
        let r = N / 2;
        this.ctx.clearRect(0, 0, N, N);
        this.ctx.beginPath();
        for (let c = 0; c < N; c++) {
            let h = this.sea.m[r][c].x;
            this.ctx.moveTo(c, r);
            this.ctx.lineTo(c, r + 30 * h);
        }
        this.ctx.stroke();
    }

}