// import {opts} from '../model/opts.js';
import {IsleR} from '../model/isle.js';

export class RectHandler
{
    static set(sea, view, view3d) {
        RectHandler.sea = sea;
        RectHandler.view = view;
        RectHandler.view3d = view3d;
        canvas2d.onmousedown = RectHandler.down;
        canvas2d.onmousemove = RectHandler.move;
        canvas2d.onmouseup = RectHandler.up;
        canvas2d.oncontextmenu = e => { e.preventDefault(); }
    }

    static down(e)  {
        RectHandler.isle = new IsleR({c: e.offsetX, r: e.offsetY});
    }

    static move(e) {
        let isle = RectHandler.isle;
        if (isle) {
            isle.w = e.offsetX - isle.c0;
            isle.h = e.offsetY - isle.r0;

            let ctx = canvas2d.getContext('2d');
            RectHandler.view.draw();
            ctx.fillStyle = "lightblue";
            ctx.fillRect(isle.c0, isle.r0, isle.w, isle.h);
        }
    }

    static up()  {
        let sea = RectHandler.sea;
        let isle = RectHandler.isle;
        if (isle && !isle.isSmall) {
            sea.addIsle(isle);
            RectHandler.view3d.addIsle(isle);
            sea.getRocksFromCanvasData();
        }
        RectHandler.isle = null;
        RectHandler.view.draw();
    }


}


