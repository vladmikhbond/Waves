import {opts} from '../model/opts.js';
import {Oscillator} from '../model/oscillator.js';

export class OscilHandler
{
    static set(sea, view) {
        OscilHandler.sea = sea;
        OscilHandler.view = view;
        canvas2d.onmousedown = OscilHandler.down;
        canvas2d.onmousemove = OscilHandler.move;
        canvas2d.onmouseup = OscilHandler.up;
        canvas2d.oncontextmenu = e => {e.preventDefault();}
    }

    static down(e)  {
        OscilHandler.osc = new Oscillator({
            c: e.offsetX, r: e.offsetY, sea: OscilHandler.sea, omega: opts.OMEGA, a:1});
    }

    static move(e) {
        let osc = OscilHandler.osc;
        if (osc) {
            osc.w = e.offsetX;
            osc.h = e.offsetY;

            let ctx = canvas2d.getContext('2d');
            OscilHandler.view.draw();
            ctx.strokeStyle = "lightblue";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(osc.c, osc.r);
            ctx.lineTo(osc.w, osc.h);
            ctx.stroke();
        }
    }

    static up()  {
        let sea = OscilHandler.sea;
        let osc = OscilHandler.osc;
        if (osc && sea.w[osc.r][osc.c].free) {
            osc.w -= osc.c;
            osc.h -= osc.r;
            sea.addOscillator(osc);
        }
        OscilHandler.osc = null;
        OscilHandler.view.draw();
    }

}

