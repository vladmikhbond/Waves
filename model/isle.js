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
        const o = Rect.cr12(this, c, r);
        return Math.abs((o.c1 - o.c) * (o.r1 - o.r2) + (o.r1 - o.r) * (o.c1 - o.c2) ) < 500  ||
            Math.abs((o.c1 - o.c) * (o.r1 - o.r2) - (o.r1 - o.r) * (o.c1 - o.c2) ) < 500;
    }

}
