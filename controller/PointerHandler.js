import {opts} from '../model/opts.js';
import {Isle} from '../model/isle.js';


export class PointerHandler
{
    static set(sea, view) {
        PointerHandler.sea = sea;
        PointerHandler.view = view;
        canvas2d.onmousedown = PointerHandler.down;
        canvas2d.onmousemove = PointerHandler.move;
        canvas2d.onmouseup = PointerHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }

    static down(e)  {
        let sea = PointerHandler.sea;
        let c = e.offsetX;
        let r = e.offsetY;
        sea.selected = null;
        for (let o of sea.isles.concat(sea.oscs)) {
            if (o.hasPoint(c, r)) {
                sea.selected = o;
                break;
            }
        }
        PointerHandler.view.draw();
    }

    static move(e) {
    }

    static up() {
    }

}

