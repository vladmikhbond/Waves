import {Rect} from './rect.js';
import {opts} from './opts.js';


export class Oscillator extends Rect
{
    constructor({c, r, w, h, sea, omega, a}) {
        super({c, r, sea});
        this.omega = omega;
        this.ampl = a;
        this.vr = 0;
        this.vc = 0;
        this.v_denominator = 10;
        this.phase = 0; // фаза (пока не использ)
    }

    normalize() {
        if (Math.abs(this.w) > Math.abs(this.h)) {
            this.h = 0;
            if (this.w < 0) {
                this.w = -this.w;
                this.c -= this.w;
            }
        } else {
            this.w = 0;
            if (this.h < 0) {
                this.h = -this.h;
                this.r -= this.h;
            }
        }
    }


    next() {
        // change position
        if ( (this.vc || this.vr) &&
            this.r < opts.N - this.v_denominator &&
            this.sea.chronos % this.v_denominator == 0)
        {
            // успокаиваем узел, бывший под осциллятором
            let p0 = this.sea.w[this.r][this.c];
            let p = this.sea.w[this.r + this.vr][this.c + this.vc];
            p0.x = p.x - p.v;
            p0.v = p.v;
            // перемещаем осциллятор
            this.r += this.vr;
            this.c += this.vc;
        }

        for (let r = this.r; r <= this.r + this.h; r++) {
            for (let c = this.c; c <= this.c + this.w; c++) {
                this.sea.w[r][c].x =
                    Math.sin(2 * Math.PI * this.omega * this.sea.chronos + this.phase) * this.ampl;
            }
        }

        // this.sea.w[this.r][this.c].x =
        //     Math.sin(2 * Math.PI * this.omega * this.sea.chronos + this.phase) * this.ampl;
    }


    stringify() {
        return `c = ${this.c} -- column            
r = ${this.r} -- row
omega = ${this.omega} -- 
ampl = ${this.ampl} -- 
vr = ${this.vr} -- перемещение по r
vc = ${this.vc} -- перемещение по c
v_denominator = ${this.v_denominator} -- знаменатель скорости          
`;
    }

    hasPoint(c, r) {
        const o = Rect.cr12(this, c, r);
        return Math.abs((o.c1 - o.c) * (o.r1 - o.r2) + (o.r1 - o.r) * (o.c1 - o.c2) ) < 500  ||
            Math.abs((o.c1 - o.c) * (o.r1 - o.r2) - (o.r1 - o.r) * (o.c1 - o.c2) ) < 500;
    }



}
