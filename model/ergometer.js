import {Obj} from './obj.js';

export class Ergometer extends Obj
{
    // при отрицательных w или h тоже работает ?
    constructor({c, r, w=0, h=0, time_window=100, sea=null}) {
        super(r, c, sea);
        this.w = w;
        this.h = h;
        this.time_window = time_window;
    }

    getEnergy() {

        let K = 0;
        for (let r = this.r; r < this.r + this.h; r++) {
            for (let c = this.c; c < this.c + this.w; c++) {
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




