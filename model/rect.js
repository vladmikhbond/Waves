export class Rect {
    constructor({c, r, w=0, h=0, sea=null}) {
        this.c = c;
        this.r = r;
        this.w = w;
        this.h = h;
        this.sea = sea;
    }

    parse(txt) {
        let lines = txt.split('\n');
        let regex = /\s*(\w+)\s*=\s*([\w\.]+)\s*/;
        for (let line of lines.slice(1)) {
            let found = line.match(regex);
            if (found) {
                this[found[1]] = found[1] == 'type' ? found[2] : +found[2];
            }
        }
        return false;
    }

    get isSmall() {
        return Math.hypot(this.w, this.h) < 3;
    }

    static cr12({c, r, w, h}, c0, r0) {
        let c1 = c, c2 = c + w;
        let r1 = r, r2 = r + h;
        if (c2 < c1) {
            c1 = -c1; c2 = -c2;  c0 = -c0;
        }
        if (r2 < r1) {
            r1 = -r1; r2 = -r2;  r0 = -r0;
        }
        return {c1, r1, c2, r2, c:c0, r:r0};
    }

    hasPoint(c, r) {
        const o = Rect.cr12(this, c, r);
        return o.c1 < o.c && o.c < o.c2 && o.r1 < o.r && o.r < o.r2;
    }


}
