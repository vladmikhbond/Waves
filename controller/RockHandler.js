class RockHandler
{
    static down(e)  {
        RockHandler.c0 = e.offsetX;
        RockHandler.r0 = e.offsetY;
        RockHandler.button = e.buttons; // indicator
        // isle
        if (!RockHandler.isle)
            RockHandler.isle = new Isle(RockHandler.r0, RockHandler.c0);
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (RockHandler.button === 1) {
            view.draw();
            view.drawRockLine(RockHandler.r0, RockHandler.c0, r, c, 3);
        } else if (RockHandler.button === 2) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.clearRocksInCircle(canvasData, r, c, 3);
            view.draw();
        }
        // set sea.point
        if (c < opts.N && r < opts.N ) {
            sea.point.r = r;
            sea.point.c = c;
        }
    }

    static up(e)  {
        if (RockHandler.button === 1) {
            let canvasData = canvas2d.getContext("2d").getImageData(0, 0, opts.N, opts.N);
            sea.getRocksFromCanvasData(canvasData);
            view.draw();
            // isle
            let c = e.offsetX;
            let r = e.offsetY;
            if (!RockHandler.isle.addShore(RockHandler.r0, RockHandler.c0, r, c)) {
                RockHandler.isle = null;
            } else

            if (RockHandler.isle.closed) {
                sea.isles.push(RockHandler.isle);
                sea.getRocksFromIsle(RockHandler.isle);
                RockHandler.isle = null;
            }
        }
        RockHandler.button = null;
        view.draw();
    }


    static set() {
        canvas2d.onmousedown = RockHandler.down;
        canvas2d.onmousemove = RockHandler.move;
        canvas2d.onmouseup = RockHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }
}

