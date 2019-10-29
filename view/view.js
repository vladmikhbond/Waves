import {opts, optz} from '../model/opts.js';
import {IsleL, IsleR} from "../model/isle.js";

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
                if (this.sea.w[r][c].free) {
                    // define alpha
                    let color = this.sea.w[r][c].x * optz.Kvis | 0;
                    const maxColor = 127;
                    if (color > maxColor) color = maxColor;
                    if (color < -maxColor) color = -maxColor;
                    color += 127;
                    // draw water
                    this.canvasData.data[idx    ] = 0;  // red
                    this.canvasData.data[idx + 1] = 0;  // green
                    this.canvasData.data[idx + 2] = 100;  // blue
                    this.canvasData.data[idx + 3] = color;  // alpha
                }
            }
        }

        this.ctx.putImageData(this.canvasData, 0, 0);

        // draw oscillators
        for (let osc of this.sea.oscs) {
            let color = osc == this.sea.selected ? "white" : "red";
            this.ctx.fillStyle = color;
            this.ctx.fillRect(osc.c - 1, osc.r - 1, 3, 3);
        }

        // draw rocks (isles)
        for (let isle of this.sea.isles) {
            let color = isle == this.sea.selected ? "white" : "green";
            if (isle instanceof IsleL)
            {
                this.ctx.strokeStyle = color;
                this.ctx.lineWidth = 5; //isle.width;
                this.ctx.beginPath();
                this.ctx.moveTo(isle.c0, isle.r0);
                this.ctx.lineTo(isle.c0 + isle.w, isle.r0 + isle.h);
                this.ctx.stroke();
            }
            else if (isle instanceof IsleR)
            {
                this.ctx.fillStyle = color;
                this.ctx.fillRect(isle.c0, isle.r0, isle.w, isle.h);
            }
        }
        // draw ergometer
        let ergo = this.sea.ergometer;
        if (ergo) {
            this.ctx.strokeStyle = "brown";
            this.ctx.strokeRect(ergo.c, ergo.r, ergo.w, ergo.h);
        }
    }

    draw1d () {
        let r = this.sea._1dRow;
        //let c = this.sea.point.c;
        if (r <= 0 || r >= opts.N)
            return;

        let ctx = canvas2d.getContext('2d');
        // ctx.clearRect(0, 0, opts.N, opts.N);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 0.1;
        ctx.strokeRect(0, r, opts.N-1, 0);
        //ctx.strokeRect(c, 0, 0, opts.N-1);

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

}

