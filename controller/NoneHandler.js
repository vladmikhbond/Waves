class NoneHandler {
    static down(e)  {
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
        canvas.onmousedown = NoneHandler.down;
        canvas.onmousemove = NoneHandler.move;
        canvas.onmouseup = NoneHandler.up;
    }
}

