import {Obj} from './obj.js';

export class Oscillator extends Obj {
    constructor(r, c, o, a, sea) {
        super(r, c, sea);
        this.vr = 0;
        this.vc = 0;
        this.omega = o;
        this.ampl = a;
    }

    next() {
        this.sea.w[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.omega * this.sea.chronos) * this.ampl;
        // moving
        if (this.sea.chronos % 10 == 0) {
            this.c += this.vc;
            this.r += this.vr;
        }
    }

    hasPoint(c, r) {
        let dc = this.c - c, dr = this.r - r;
            return dc * dc + dr * dr < 25;
    }

    stringify() {
        return `c = ${this.c} --             
r = ${this.r} -- 
vc = ${this.vc} --             
vr = ${this.vr} -- 
omega = ${this.omega} -- 
ampl = ${this.ampl} -- 
`;
    }


}
