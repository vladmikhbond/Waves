class RectHandler
{
    static down(e)  {
        RectHandler.o = {type: "rect", c0: e.offsetX, r0: e.offsetY};
    }

    static move(e) {
        if (RectHandler.o) {
            RectHandler.o.w = e.offsetX - RectHandler.o.c0;
            RectHandler.o.h = e.offsetY - RectHandler.o.r0;
            view.draw();
            let ctx = canvas2d.getContext('2d');
            ctx.fillStyle = "red";
            ctx.fillRect(RectHandler.o.c0, RectHandler.o.r0, RectHandler.o.w, RectHandler.o.h);
        }
    }

    static up()  {
        if (RectHandler.o) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(RectHandler.o);
            RectHandler.o = null;
            view.draw();
        }
    }

    static set() {
        canvas2d.onmousedown = RectHandler.down;
        canvas2d.onmousemove = RectHandler.move;
        canvas2d.onmouseup = RectHandler.up;
        canvas2d.oncontextmenu = e => { e.preventDefault(); }
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
            view.draw();
            let ctx = canvas2d.getContext('2d');
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(LineHandler.o.c0, LineHandler.o.r0);
            ctx.lineTo(LineHandler.o.c, LineHandler.o.r);
            ctx.stroke();
        }
    }

    static up()  {
        if (LineHandler.o) {
            let ctx = canvas2d.getContext('2d');
            let canvasData = ctx.getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            sea.isles.push(LineHandler.o);
            LineHandler.o = null;
            view.draw();
        }
    }

    static set() {
        canvas2d.onmousedown = LineHandler.down;
        canvas2d.onmousemove = LineHandler.move;
        canvas2d.onmouseup = LineHandler.up;
        canvas2d.oncontextmenu = e => { e.preventDefault(); }
    }
}

