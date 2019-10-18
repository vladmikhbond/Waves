import {opts} from '../model/opts.js';

export class MeterHandler
{
    static set(sea, view, view3d) {
        MeterHandler.sea = sea;
        MeterHandler.view = view;
        // MeterHandler.view3d = view3d;
        canvas2d.onmousedown = MeterHandler.down;
        canvas2d.onmousemove = MeterHandler.move;
        canvas2d.onmouseup = MeterHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }

    static down(e)  {
        MeterHandler.o = {c0: e.offsetX, r0: e.offsetY, w: 0, h: 0};
    }

    static move(e) {
        if (MeterHandler.o) {
            MeterHandler.o.w = e.offsetX - MeterHandler.o.c0;
            MeterHandler.o.h = e.offsetY - MeterHandler.o.r0;

            let ctx = canvas2d.getContext('2d');
            ctx.fillStyle = "gray";
            MeterHandler.view.draw();
            ctx.fillRect(MeterHandler.o.c0, MeterHandler.o.r0, MeterHandler.o.w, MeterHandler.o.h);
        }
    }

    static up() {
        if (MeterHandler.o) {
            let energy = MeterHandler.sea.energyDensity(MeterHandler.o);
            info.innerHTML = `energyDensity=${energy}` ;

            // let ctx = canvas2d.getContext('2d');
            MeterHandler.view.draw();
            MeterHandler.o = null;
        }
    }

}

