class LineHandler
{
    static down(e)  {
        LineHandler.o = {type: "line", c0: e.offsetX, r0: e.offsetY, width: optz.lineIsleWidth};
    }

    static move(e) {
        if (LineHandler.o) {
            LineHandler.o.c = e.offsetX;
            LineHandler.o.r = e.offsetY;

            let ctx = canvas1d.getContext('2d');
            ctx.strokeStyle = "white";
            ctx.clearRect(0, 0, opts.N, opts.N);

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

            let canvasData = canvas1d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(isle);

            //
            view.draw();
            view3d.addIsle(isle);
            view3d.draw();
            let ctx = canvas1d.getContext('2d');
            ctx.clearRect(0, 0, opts.N, opts.N);

            LineHandler.o = null;
        }
    }

    static set() {
        canvas1d.onmousedown = LineHandler.down;
        canvas1d.onmousemove = LineHandler.move;
        canvas1d.onmouseup = LineHandler.up;
        canvas1d.oncontextmenu = e => { e.preventDefault(); }
    }
}

