export class Obj {
    constructor(r, c, sea) {
        this.r = r;
        this.c = c;
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


}
