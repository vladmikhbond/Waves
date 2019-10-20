import {Obj} from './obj.js';

export class Isle extends Obj {

    constructor({type, c, r, w, h }, sea) {
        super(r, c, sea);
        this.type = type;
        this.c0 = c;
        this.r0 = r;
        this.w = w;
        this.h = h;
    }

    hasPoint(c, r) {
        let c1 = this.c0, c2 = this.c0 + this.w, r1 = this.r0, r2 = this.r0 + this.h;
        if (c2 < c1) {
            c1 = -c1; c2 = -c2;  c = -c;
        }
        if (r2 < r1) {
            r1 = -r1; r2 = -r2;  r = -r;
        }
        let b = c1 < c && c < c2 && r1 < r && r < r2;

        switch (this.type) {
            case "rect":
                return  b;
            case "line":
                return Math.abs((c1 - c) * (r1 - r2) + (r1 - r) * (c1 - c2) ) < 500  ||
                    Math.abs((c1 - c) * (r1 - r2) - (r1 - r) * (c1 - c2) ) < 500;
        }
    }

    stringify() {
        return `type = ${this.type} -- 
c0 = ${this.c0} --             
r0 = ${this.r0} -- 
w = ${this.w} -- width
h = ${this.h} -- height
`;
    }

    get isSmall() {
        return Math.hypot(this.w, this.h) < 3;
    }
}
