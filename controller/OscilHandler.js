class OscilHandler
{
    static down(e)  {
        let c = e.offsetX;
        let r = e.offsetY;
        if (e.buttons === 1) {
            sea.addOscillator(r, c, opts.OMEGA_MIN, 1);
        } else if (e.buttons === 2) {
            sea.removeOscillator(r, c);
        }
        view.draw();
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (c < opts.N && r < opts.N ) {
            sea.point.r = r;
            sea.point.c = c;
        }
     }

    static up() {
    }

    static set() {
        canvas.onmousedown = OscilHandler.down;
        canvas.onmousemove = OscilHandler.move;
        canvas.onmouseup = OscilHandler.up;
        canvas.oncontextmenu = e => {e.preventDefault();}
    }
}

