import {Rect} from './rect.js';

export class IsleR extends Rect {

    stringify() {
        return `c0 = ${this.c} --             
r0 = ${this.r} -- 
w = ${this.w} -- width
h = ${this.h} -- height
`;
    }

}



export class IsleL extends IsleR {

    hasPoint(c, r) {
        let c1 = this.c, c2 = this.c + this.w;
        let r1 = this.r, r2 = this.r + this.h;
        if (c2 < c1) {
            c1 = -c1; c2 = -c2;  c = -c;
        }
        if (r2 < r1) {
            r1 = -r1; r2 = -r2;  r = -r;
        }
        return Math.abs((c1 - c) * (r1 - r2) + (r1 - r) * (c1 - c2) ) < 500  ||
               Math.abs((c1 - c) * (r1 - r2) - (r1 - r) * (c1 - c2) ) < 500;
    }

}
