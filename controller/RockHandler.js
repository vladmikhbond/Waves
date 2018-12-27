class RockHandler
{
    static down(e)  {
        RockHandler.c0 = e.offsetX;
        RockHandler.r0 = e.offsetY;
        RockHandler.button = e.buttons;
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (RockHandler.button === 1) {
            view.draw();
            view.drawRockLine(RockHandler.r0, RockHandler.c0, r, c, 3);
        } else if (RockHandler.button === 2) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.clearRocks(canvasData, r, c, 3);
            view.draw();
        }
        // set sea.point
        if (c < opts.N && r < opts.N ) {
            sea.point.r = r;
            sea.point.c = c;
        }
    }

    static up()  {
        if (RockHandler.button === 1) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.rocksFromImg(canvasData);
            view.draw();
        } else if (RockHandler.button === 2){
            // e.preventDefault();
        }
        RockHandler.button = null;
    }

    static set() {
        canvas2d.onmousedown = RockHandler.down;
        canvas2d.onmousemove = RockHandler.move;
        canvas2d.onmouseup = RockHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }
}

