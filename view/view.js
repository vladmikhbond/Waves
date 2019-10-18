import {opts, optz} from '../model/opts.js';


export class View
{
    constructor(sea) {
        this.sea = sea;
        this.ctx = canvas2d.getContext('2d');
        this.canvasData = this.ctx.getImageData(0, 0, opts.N, opts.N);
    }

    draw () {
        const ROCK_COLOR = 160; // 0xa0

        for (let r = 0; r < opts.N; r++) {
            for (let c = 0; c < opts.N; c++) {
                let idx = (c + r * opts.N) * 4;
                if (!this.sea.w[r][c].free) {
                    // draw free
                    this.canvasData.data[idx    ] = 1;  // red
                    this.canvasData.data[idx + 1] = ROCK_COLOR;  // green
                    // this.canvasData.data[idx + 2] = 0;  // blue
                    this.canvasData.data[idx + 3] = 255;  // alpha
                } else {
                    // define alpha
                    let color = this.sea.w[r][c].x * optz.Kvis | 0;
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
            // alpha
            this.canvasData.data[idx + 3] = 0;
            this.canvasData.data[idx + 3 + 4] = 0;
            this.canvasData.data[idx + 3 - 4] = 0;
            this.canvasData.data[idx + 3 + (4 * opts.N) ] = 0;
            this.canvasData.data[idx + 3 - (4 * opts.N) ] = 0;
        }
        this.ctx.putImageData(this.canvasData, 0, 0);
    }

    draw1d () {
        let r = this.sea.point.r;
        let c = this.sea.point.c;

        let ctx = canvas2d.getContext('2d');
        // ctx.clearRect(0, 0, opts.N, opts.N);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.1;
        ctx.strokeRect(0,r, opts.N-1, 0);
        ctx.strokeRect(c,0, 0, opts.N-1);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        for (let c = 0; c < opts.N; c++) {
            let h = this.sea.w[r][c].x * kvisRange.value;
            ctx.moveTo(c, r);
            ctx.lineTo(c, r + 30 * h);
        }
        ctx.stroke();
    }

    // drawInfo() {
    //     playPauseButton.innerHTML = this.sea.chronos;
    //     info.innerHTML = this.sea.point.e;
    // }


}

