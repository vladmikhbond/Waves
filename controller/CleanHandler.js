class CleanHandler
{
    static down(e)  {
        CleanHandler.r0 = e.offsetY;
        // CleanHandler.c0 = e.offsetX;
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (CleanHandler.r0) {
            let canvasData = canvas.getContext("2d").getImageData(0, 0, N, N);
            sea.clearRocks(canvasData, r, c, 3);
            view.draw();
        }
    }

    static up()  {
        if (CleanHandler.r0) {
            CleanHandler.r0 = null;
        }
    }

    static set() {
        canvas.onmousedown = CleanHandler.down;
        canvas.onmousemove = CleanHandler.move;
        canvas.onmouseup = CleanHandler.up;
        CleanHandler.r0 = null;
        // CleanHandler.c0 = null;
    }
}

