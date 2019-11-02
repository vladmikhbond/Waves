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


}
