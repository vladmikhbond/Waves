import {opts, optz} from '../model/opts.js';
import {IsleL} from '../model/isle.js';

export class LineHandler
{
    static set(sea, view, view3d) {
        LineHandler.sea = sea;
        LineHandler.view = view;
        LineHandler.view3d = view3d;
        canvas2d.onmousedown = LineHandler.down;
        canvas2d.onmousemove = LineHandler.move;
        canvas2d.onmouseup = LineHandler.up;
        canvas2d.oncontextmenu = e => { e.preventDefault(); }
    }

    static down(e)  {
        LineHandler.isle = new IsleL({c: e.offsetX, r: e.offsetY});
    }

    static move(e) {
        let isle = LineHandler.isle;
        if (isle) {
            isle.w = e.offsetX;
            isle.h = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            LineHandler.view.draw();
            ctx.strokeStyle = "white";
            ctx.lineWidth = optz.lineIsleWidth;
            ctx.beginPath();
            ctx.moveTo(isle.c, isle.r);
            ctx.lineTo(isle.w, isle.h);
            ctx.stroke();
         }
    }

    static up()  {
        let sea = LineHandler.sea;
        let isle = LineHandler.isle;
        if (isle && !isle.isSmall) {
            isle.w -= isle.c;
            isle.h -= isle.r;
            sea.addIsle(isle);
            LineHandler.view3d.addIsle(isle);
            sea.getRocksFromCanvasData();
        }
        LineHandler.isle = null;
        LineHandler.view.draw();
    }

}
