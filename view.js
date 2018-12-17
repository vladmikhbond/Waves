class View {
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas.getContext('2d');

        this.canvasData = this.ctx.getImageData(0, 0, N, N);
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let index = (c + r * N) * 4;
                this.canvasData.data[index + 0] = 0;
                this.canvasData.data[index + 1] = 0;
                this.canvasData.data[index + 2] = 0;
                this.canvasData.data[index + 3] = 255;
            }
        }

    }

    draw () {
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                let color = 127 + (127 * (sea.m[r][c].x - sea.min) / (sea.max - sea.min)) | 0;
                let index = (c + r * N) * 4;
                this.canvasData.data[index + 2] = color;
            }
        }
        this.ctx.putImageData(this.canvasData, 0, 0);
        info.innerHTML = sea.min

    }
}