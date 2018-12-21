class OscilHandler
{
    static down(e)  {
        let c = e.offsetX;
        let r = e.offsetY;
        sea.addOscillator(r, c, OMEGA_MIN, 1);
        view.drawCircle(r, c, 2);
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (c < N && r < N )
            info.innerHTML = sea.w[r][c].x;
     }

    static up() {
    }

    static set() {
        canvas.onmousedown = OscilHandler.down;
        canvas.onmousemove = OscilHandler.move;
        canvas.onmouseup = OscilHandler.up;
    }
}

