import {Obj} from './obj.js';

// Измеритель энергии в заданном прямоугольнике.
// Энергия усредняется за период в time_gap тиков.
//
export class Ergometer extends Obj
{
    constructor({c, r, w=0, h=0, time_gap=20, sea=null}) {
        super(r, c, sea);
        this.w = w;
        this.h = h;
        this.e = new Array(time_gap);
    }

    // Сохраняет прямоугольник, заданный двумя точками {r1, c1, r2, c2}
    normalize() {
        let r1, r2, c1, c2;
        if (this.h > 0) {
            r1 = this.r;
            r2 = this.r + this.h;
        } else {
            r1 = this.r + this.h;
            r2 = this.r;
        }
        if (this.w > 0) {
            c1 = this.c;
            c2 = this.c + this.w;
        } else {
            c1 = this.c + this.w;
            c2 = this.c;
        }
        this.r1c1r2c2 = {r1, c1, r2, c2}
    }

    // производит один замер кинетической энергии и сохраняет его в кэше
    meter() {
        let {r1, c1, r2, c2} = this.r1c1r2c2;
        let K = 0;
        for (let r = r1; r < r2; r++) {
            for (let c = c1; c < c2; c++) {
                K += this.sea.w[r][c].v ** 2;
            }
        }
        // save in cash
        this.e[this.sea.chronos % this.e.length] = K / 2;
    }

    // усредненная энергия
    get energy() {
        return this.e.reduce((a, x) => a + x) / this.e.length;
    }


}




