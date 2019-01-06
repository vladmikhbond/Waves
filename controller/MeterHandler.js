class MeterHandler
{
    static down(e)  {
        MeterHandler.o = {c0: e.offsetX, r0: e.offsetY, w: 0, h: 0};
    }

    static move(e) {
        if (MeterHandler.o) {
            MeterHandler.o.w = e.offsetX - MeterHandler.o.c0;
            MeterHandler.o.h = e.offsetY - MeterHandler.o.r0;

            let ctx = canvas1d.getContext('2d');
            ctx.fillStyle = "gray";
            ctx.clearRect(0, 0, opts.N, opts.N);
            ctx.fillRect(MeterHandler.o.c0, MeterHandler.o.r0, MeterHandler.o.w, MeterHandler.o.h);
        }
    }

    static up() {
        if (MeterHandler.o) {
            let energy = sea.energyDensity(MeterHandler.o);
            info.innerHTML = `energyDensity=${energy}` ;

            let ctx = canvas1d.getContext('2d');
            ctx.clearRect(0, 0, opts.N, opts.N);
            MeterHandler.o = null;
        }
    }

    static set() {
        canvas1d.onmousedown = MeterHandler.down;
        canvas1d.onmousemove = MeterHandler.move;
        canvas1d.onmouseup = MeterHandler.up;
        canvas1d.oncontextmenu = e => {e.preventDefault();}
    }
}

