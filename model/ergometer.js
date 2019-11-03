import {Rect} from './rect.js';

// Измеритель энергии в заданном прямоугольнике.
// Энергия усредняется за период в time_gap тиков.
//
export class Ergometer extends Rect
{
    constructor({c, r, w=0, h=0, time_gap=20, sea=null}) {
        super({r, c, sea});
        this.w = w;
        this.h = h;
        this.e = new Array(time_gap);
    }

    // Сохраняет прямоугольник, заданный двумя точками {r1, c1, r2, c2}
    normalize() {
        if (this.h < 0) {
            this.h = -this.h;
            this.r -= this.h;
        }
        if (this.w < 0) {
            this.w = -this.w;
            this.c -= this.w;
        }
    }

    // производит один замер кинетической энергии и сохраняет его в кэше
    meter() {
        let E = 0;
        for (let r = this.r; r <= this.r + this.h; r++) {
            for (let c = this.c; c <= this.c + this.w; c++) {
                E += this.sea.w[r][c].v ** 2;
            }
        }
        // save in cash
        this.e[this.sea.chronos % this.e.length] = E / 2;
    }

    // усредненная энергия
    get energy() {
        const k = 10000;
        return k * this.e.reduce((a, x) => a + x) / this.e.length / (this.w * this.h);
    }


}




