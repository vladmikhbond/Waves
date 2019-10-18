import {opts} from '../model/opts.js';

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
        RectHandler.o = {type: "rect", c0: e.offsetX, r0: e.offsetY, w: 0, h: 0};
    }

    static move(e) {
        if (RectHandler.o) {
            RectHandler.o.w = e.offsetX - RectHandler.o.c0;
            RectHandler.o.h = e.offsetY - RectHandler.o.r0;

            let ctx = canvas2d.getContext('2d');
            RectHandler.view.draw();
            ctx.fillStyle = "lightblue";
            ctx.fillRect(RectHandler.o.c0, RectHandler.o.r0, RectHandler.o.w, RectHandler.o.h);
        }
    }

    static up()  {
        let sea = RectHandler.sea;
        let isle = RectHandler.o;
        if (isle) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(isle);
            //
            RectHandler.view.draw();
            RectHandler.view3d.addIsle(isle);
            RectHandler.o = null;
        }
    }


}


