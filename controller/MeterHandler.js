import {Ergometer} from '../model/ergometer.js';

export class MeterHandler
{
    static set(sea, view, view3d) {
        MeterHandler.sea = sea;
        MeterHandler.view = view;
        canvas2d.onmousedown = MeterHandler.down;
        canvas2d.onmousemove = MeterHandler.move;
        canvas2d.onmouseup = MeterHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }

    static down(e)  {
        MeterHandler.ergo = new Ergometer({c: e.offsetX, r: e.offsetY, sea: MeterHandler.sea});
    }

    static move(e) {
        let ergo = MeterHandler.ergo;
        if (ergo) {
            ergo.w = e.offsetX - ergo.c;
            ergo.h = e.offsetY - ergo.r;

            let ctx = canvas2d.getContext('2d');
            MeterHandler.view.draw();
            ctx.strokeStyle = "lightblue";
            ctx.strokeRect(ergo.c, ergo.r, ergo.w, ergo.h);
        }
    }

    static up() {
        let ergo = MeterHandler.ergo;
        if (ergo) {
            MeterHandler.sea.ergometer = ergo;
            MeterHandler.view.draw();
            MeterHandler.ergo = null;
            alert(`c: ${ergo.c}   r: ${ergo.r}   w: ${ergo.w}  h: ${ergo.h}`)
        }
    }

}

