class RockHandler {
    static down(e)  {
        RockHandler.c0 = e.offsetX;
        RockHandler.r0 = e.offsetY;
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (RockHandler.r0) {
            view.draw();
            view.drawRockLine(RockHandler.r0, RockHandler.c0, r, c, 3);
        }
        // else {
        //     if (c < N && r < N ) info.innerHTML = sea.w[r][c].x;
        // }
    }

    static up()  {
        if (RockHandler.r0) {
            RockHandler.r0 = null;
            let canvasData = canvas.getContext("2d").getImageData(0, 0, N, N);
            sea.rocksFromImg(canvasData);
            view.draw();
        }
    }

    static set() {
        canvas.onmousedown = RockHandler.down;
        canvas.onmousemove = RockHandler.move;
        canvas.onmouseup = RockHandler.up;
        RockHandler.r0 = null;
        RockHandler.c0 = null;
    }
}

