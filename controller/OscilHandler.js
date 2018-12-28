class OscilHandler
{
    static down(e)  {
        let c = e.offsetX;
        let r = e.offsetY;
        if (e.buttons === 1 && sea.w[r][c].free) {
            sea.addOscillator(r, c, opts.OMEGA, 1);
        } else if (e.buttons === 2) {
            sea.removeOscillator(r, c);
        }
        view.draw();
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        // set sea.point
        if (c < opts.N && r < opts.N ) {
            sea.point.r = r;
            sea.point.c = c;
        }
     }

    static up() {
    }

    static set() {
        canvas2d.onmousedown = OscilHandler.down;
        canvas2d.onmousemove = OscilHandler.move;
        canvas2d.onmouseup = OscilHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }
}

