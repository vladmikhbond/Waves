import {opts, optz} from '../model/opts.js';
import {Isle} from '../model/isle.js';

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
        LineHandler.isle = new Isle({type: "line", c: e.offsetX, r: e.offsetY, width: optz.lineIsleWidth});
    }

    static move(e) {
        if (LineHandler.isle) {
            LineHandler.isle_c = e.offsetX;
            LineHandler.isle_r = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            LineHandler.view.draw();
            ctx.strokeStyle = "white";
            ctx.lineWidth = LineHandler.isle.width;
            ctx.beginPath();
            ctx.moveTo(LineHandler.isle.c0, LineHandler.isle.r0);
            ctx.lineTo(LineHandler.isle_c, LineHandler.isle_r);
            ctx.stroke();
         }
    }

    static up()  {
        let isle = LineHandler.isle;
        if (isle) {
            // normalize line isle
            if (LineHandler.isle_c < isle.c0) {
                isle.c0 = LineHandler.isle_c;
                isle.r0 = LineHandler.isle_r;
            }

            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            LineHandler.sea.getRocksFromCanvasData(canvasData);
            LineHandler.sea.isles.push(isle);
            //
            LineHandler.view.draw();
            LineHandler.view3d.addIsle(isle);
            LineHandler.isle = null;
        }
    }

}
