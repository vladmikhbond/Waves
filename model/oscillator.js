import {Obj} from './obj.js';

export class Oscillator extends Obj {
    constructor(r, c, o, a, sea) {
        super(r, c, sea);
        this.omega = o;
        this.ampl = a;
        this.phase = 0; // фаза
    }

    next() {
        this.sea.w[this.r][this.c].x =
            Math.sin(2 * Math.PI * this.omega * this.sea.chronos + this.phase) * this.ampl;
    }

    hasPoint(c, r) {
        let dc = this.c - c, dr = this.r - r;
            return dc * dc + dr * dr < 25;
    }

    stringify() {
        return `c = ${this.c} -- column            
r = ${this.r} -- row
omega = ${this.omega} -- 
ampl = ${this.ampl} -- 
phase = ${this.phase} -- фаза            
`;
    }


}
