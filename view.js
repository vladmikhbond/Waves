class View {
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas.getContext('2d');

        this.canvasData = this.ctx.getImageData(0, 0, N, N);
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let i = (c + r * N) * 4;
                // let color = 255;
                // this.canvasData.data[i    ] = color;  // reg
                // this.canvasData.data[i + 1] = color;  // green
                // this.canvasData.data[i + 2] = color;  // blue
                this.canvasData.data[i + 3] = 255;  // alpha
            }
        }

    }

    draw () {
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let color = this.sea.m[r][c].x * 400 | 0;
                let A = 127;
                if (color > A) color = A;
                if (color < -A) color = -A;
                color += 127;

                let i = (c + r * N) * 4;
                this.canvasData.data[i    ] = color;  // reg
                this.canvasData.data[i + 1] = color;  // green
                this.canvasData.data[i + 2] = color;  // blue
            }
        }
        this.ctx.putImageData(this.canvasData, 0, 0);
        // draw info
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeRect(sea.margin, sea.margin, N - 2 * sea.margin, N - 2 * sea.margin);
        info.innerHTML = sea.t;
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
        // draw info
        this.ctx.lineWidth = 0.1;
        this.ctx.strokeRect(sea.margin, sea.margin, N - 2 * sea.margin, N - 2 * sea.margin);
        info.innerHTML = sea.t;
    }

}