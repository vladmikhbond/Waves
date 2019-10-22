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
        if (LineHandler.isle) {
            LineHandler.isle.w = e.offsetX;
            LineHandler.isle.h = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            LineHandler.view.draw();
            ctx.strokeStyle = "white";
            ctx.lineWidth = LineHandler.isle.width;
            ctx.beginPath();
            ctx.moveTo(LineHandler.isle.c0, LineHandler.isle.r0);
            ctx.lineTo(LineHandler.isle.w, LineHandler.isle.h);
            ctx.stroke();
         }
    }

    static up()  {
        let isle = LineHandler.isle;
        if (isle) {
            isle.w -= isle.c0;
            isle.h -= isle.r0;
            if (isle.isSmall)
                return;
            LineHandler.sea.getRocksFromCanvasData();
            LineHandler.sea.isles.push(isle);
            //
            LineHandler.view.draw();
            LineHandler.view3d.addIsle(isle);
            LineHandler.isle = null;
        }
    }

}
