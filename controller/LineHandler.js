import {opts, optz} from '../model/opts.js';

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
        LineHandler.o = {type: "line", c0: e.offsetX, r0: e.offsetY, width: optz.lineIsleWidth};
    }

    static move(e) {
        if (LineHandler.o) {
            LineHandler.o.c = e.offsetX;
            LineHandler.o.r = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            LineHandler.view.draw();
            ctx.strokeStyle = "white";
            ctx.lineWidth = LineHandler.o.width;
            ctx.beginPath();
            ctx.moveTo(LineHandler.o.c0, LineHandler.o.r0);
            ctx.lineTo(LineHandler.o.c, LineHandler.o.r);
            ctx.stroke();
         }
    }

    static up()  {
        let isle = LineHandler.o;
        if (isle) {
            // normalize line isle
            if (isle.c < isle.c0) {
                [isle.c, isle.c0] = [isle.c0, isle.c];
                [isle.r, isle.r0] = [isle.r0, isle.r];
            }

            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            LineHandler.sea.getRocksFromCanvasData(canvasData);
            LineHandler.sea.isles.push(isle);
            //
            LineHandler.view.draw();
            LineHandler.view3d.addIsle(isle);
            LineHandler.o = null;
        }
    }

}
