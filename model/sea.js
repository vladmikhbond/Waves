import {opts, optz} from './opts.js';
import {Oscillator} from './oscillator.js';
import {IsleR, IsleL} from "../model/isle.js";

export class Sea
{
    constructor(n) {
        this.chronos = -1;
        this.n = n;
        this.oscs = [];
        this.isles = [];
        this.selected = null;
        this.ergometer = null;
        // water
        this.w = [];
        for (let r = 0; r < n; r++) {
            let row = [];
            for (let c = 0; c < n; c++) {
                row.push({x: 0, a: 0, v: 0, free: 1});
            }
            this.w.push(row);
        }
        this.point = {r: 0, c: 0};
        this._1dRow = 0;
    }

    addIsle(isle) {
        this.isles.push(isle);
        this.selected = isle;

    }

    addOscillator(osc) {
        this.oscs.push(osc);
        this.selected = osc;
    }

    removeOscillatorNear(r, c) {
        let i = this.oscs.findIndex(o => Math.hypot(o.r - r, o.c - c) < 5);
        if (i !== -1) this.oscs.splice(i, 1);
    }

    removeSelected() {
        if (this.selected instanceof IsleR) {
            let i = this.isles.indexOf(this.selected);
            if (i !== -1) {
                this.isles.splice(i, 1);
                this.getRocksFromCanvasData();
                this.selected = null;
            }
        }
        if (this.selected instanceof Oscillator) {
            let i = this.oscs.indexOf(this.selected);
            if (i !== -1) {
                this.oscs.splice(i, 1);
                this.selected = null;
            }
        }
    }


    getRocksFromCanvasData() {
        let n = this.n;
        // create canvas
        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = n;
        let ctx = canvas.getContext("2d");
        // draw rocks
        for (let isle of this.isles) {
            if (isle instanceof IsleL) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = optz.lineIsleWidth;
                ctx.beginPath();
                ctx.moveTo(isle.c, isle.r);
                ctx.lineTo(isle.c + isle.w, isle.r + isle.h);
                ctx.stroke();
            } else if (isle instanceof IsleR) {
                ctx.fillStyle = "red";
                ctx.fillRect(isle.c, isle.r, isle.w, isle.h);
            }
        }
        // extract freedom from data
        let canvasData = ctx.getImageData(0, 0, n, n);
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                let idx = (c + r * n) * 4;
                this.w[r][c].free = canvasData.data[idx] > 0 ? 0 : 1;
            }
        }
    }

    step() {
        this.chronos++;

        // oscillators
        for (let o of this.oscs) {
            if (this.w[o.r][o.c].free)
                o.next();
        }

        // расчет сил (только внутренние точки)
        let n = this.n;
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++)
            {
                this.w[r][c].a = (this.w[r-1][c].x + this.w[r+1][c].x +
                    this.w[r][c-1].x + this.w[r][c+1].x - this.w[r][c].x * 4) / 4 * opts.Km ;
            }
        }

        // расчет отклонений
        // периферийные точки
        for (let p = 1; p < n-1; p++) {
            // поглощение границами (неполное)
            // left
            const k = 1;  // is k = 1 optimum ?
            this.w[p][0].x   = this.w[p][1].x   - this.w[p][1].v * k ;
            // right
            this.w[p][n-1].x = this.w[p][n-2].x - this.w[p][n-2].v * k ;
            // up
            this.w[0][p].x   = this.w[1][p].x   - this.w[1][p].v * k ;
            // down
            this.w[n-1][p].x = this.w[n-2][p].x - this.w[n-2][p].v * k ;

        }

        // внутренние точки
        for (let r = 1; r < n-1; r++) {
            for (let c = 1; c < n-1; c++) {
                // change v
                this.w[r][c].v += this.w[r][c].a;
                 // change x
                this.w[r][c].x += this.w[r][c].v;

                // rock
                if (!this.w[r][c].free) {
                    this.w[r][c].x = 0;
                }
            }
        }

        // замер энергии
        if (this.ergometer) {
            this.ergometer.meter();
            if (this.chronos % 20 === 0) {
                info.innerHTML = `E = ${this.ergometer.energy.toFixed(3)}`;
            }
        }
    }

 }
