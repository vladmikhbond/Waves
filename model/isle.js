import {Obj} from './obj.js';

export class IsleR extends Obj {

    constructor({c, r, w=0, h=0 }, sea=null) {
        super(r, c, sea);
        this.w = w;
        this.h = h;
    }

    hasPoint(c, r) {
        let c1 = this.c, c2 = this.c + this.w;
        let r1 = this.r, r2 = this.r + this.h;
        if (c2 < c1) {
            c1 = -c1; c2 = -c2;  c = -c;
        }
        if (r2 < r1) {
            r1 = -r1; r2 = -r2;  r = -r;
        }
        return c1 < c && c < c2 && r1 < r && r < r2;
    }

    stringify() {
        return `c0 = ${this.c} --             
r0 = ${this.r} -- 
w = ${this.w} -- width
h = ${this.h} -- height
`;
    }

    get isSmall() {
        return Math.hypot(this.w, this.h) < 3;
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
