class RectHandler
{
    static down(e)  {
        RectHandler.o = {type: "rect", c0: e.offsetX, r0: e.offsetY};
    }

    static move(e) {
        if (RectHandler.o) {
            RectHandler.o.w = e.offsetX - RectHandler.o.c0;
            RectHandler.o.h = e.offsetY - RectHandler.o.r0;

            let ctx = canvas1d.getContext('2d');
            ctx.fillStyle = "gray";
            ctx.clearRect(0, 0, opts.N, opts.N);
            ctx.fillRect(RectHandler.o.c0, RectHandler.o.r0, RectHandler.o.w, RectHandler.o.h);
        }
    }

    static up()  {
        if (RectHandler.o) {
            let canvasData = canvas1d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(RectHandler.o);
            RectHandler.o = null;
            view.draw();
        }
    }

    static set() {
        canvas1d.onmousedown = RectHandler.down;
        canvas1d.onmousemove = RectHandler.move;
        canvas1d.onmouseup = RectHandler.up;
        canvas1d.oncontextmenu = e => { e.preventDefault(); }
    }
}

class LineHandler
{
    static down(e)  {
        LineHandler.o = {type: "line", c0: e.offsetX, r0: e.offsetY};
    }

    static move(e) {
        if (LineHandler.o) {
            LineHandler.o.c = e.offsetX;
            LineHandler.o.r = e.offsetY;

            let ctx = canvas1d.getContext('2d');
            ctx.strokeStyle = "gray";
            ctx.clearRect(0, 0, opts.N, opts.N);

            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(LineHandler.o.c0, LineHandler.o.r0);
            ctx.lineTo(LineHandler.o.c, LineHandler.o.r);
            ctx.stroke();
         }
    }

    static up()  {
        if (LineHandler.o) {
            let canvasData = canvas1d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(LineHandler.o);
            LineHandler.o = null;
            view.draw();
        }
    }

    static set() {
        canvas1d.onmousedown = LineHandler.down;
        canvas1d.onmousemove = LineHandler.move;
        canvas1d.onmouseup = LineHandler.up;
        canvas1d.oncontextmenu = e => { e.preventDefault(); }
    }
}

