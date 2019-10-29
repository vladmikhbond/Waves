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
        LineHandler.isle = new IsleL({c: e.offsetX, r: e.offsetY, width: optz.lineIsleWidth});
    }

    static move(e) {
        let isle = LineHandler.isle;
        if (isle) {
            isle._w = e.offsetX;
            isle._h = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            view.draw();
            ctx.strokeStyle = "white";
            ctx.lineWidth = isle.width;
            ctx.beginPath();
            ctx.moveTo(isle.c0, isle.r0);
            ctx.lineTo(isle.w, isle.h);
            ctx.stroke();
         }
    }

    static up()  {
        let sea = LineHandler.sea;
        let isle = LineHandler.isle;
        if (isle && !isle.isSmall) {
            isle._w -= isle.c0;
            isle._h -= isle.r0;
            sea.isles.push(isle);
            LineHandler.view3d.addIsle(isle);
            sea.getRocksFromCanvasData();
        }
        LineHandler.isle = null;
        LineHandler.view.draw();
    }

}
