import {Obj} from './obj.js';
import {opts} from './opts.js';

export class Oscillator extends Obj {
    constructor(r, c, o, a, sea) {
        super(r, c, sea);
        this.omega = o;
        this.ampl = a;
        this.vr = 0;
        this.vc = 0;
        this.v_denominator = 10;
        this.phase = 0; // фаза (пока не использ)
    }

    next() {
        // change position
        if (this.r < opts.N - this.v_denominator && this.sea.chronos % this.v_denominator == 0) {
            // успокаиваем узел, бывший под осциллятором
            let p0 = this.sea.w[this.r][this.c];
            let p = this.sea.w[this.r + this.vr][this.c + this.vc];
            p0.x = p.x - p.v;
            p0.v = p.v;
            // перемещаем осциллятор
            this.r += this.vr;
            this.c += this.vc;
        }

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
vr = ${this.vr} -- перемешение по r
vc = ${this.vc} -- перемешение по c
v_denominator = ${this.v_denominator} -- знаменатель скорости          
`;
    }


}
