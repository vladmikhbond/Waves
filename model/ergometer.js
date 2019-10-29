import {Obj} from './obj.js';

export class Ergometer extends Obj
{
    constructor({c, r, w=0, h=0, time_window=100, sea=null}) {
        super(r, c, sea);
        this.w = w;
        this.h = h;
        this.time_window = time_window;
    }

    // при отрицательных w или h тоже работает
    getEnergy() {
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

        let K = 0;
        for (let r = r1; r < r2; r++) {
            for (let c = c1; c < c2; c++) {
                K += this.sea.w[r][c].v ** 2;
            }
        }
        return K / 2;
    }

    stringify() {
        return `type = ${this.type} -- 
c = ${this.c0} --             
r = ${this.r0} -- 
w = ${this._w} -- width
h = ${this._h} -- height
time_window = ${this.time_window} -- time span of metering
`;
    }

    get isSmall() {
        return Math.hypot(this._w, this._h) < 3;
    }
}




