// скорость волн = 1 пиксель/тик

const N = 500;
const OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
const M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
let Kvis = 2**9;                      // visualise coefficient
let Mode = 'none'; // 'none', 'rock', 'clean'

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N, M);
let view = new View(sea);

let osc1 = new Oscillator(N / 2, N / 2, OMEGA_MIN, 1, sea);
// let osc2 = new Oscillator(N / 2, (N / 2 + 2/OMEGA_MIN)|0, OMEGA_MIN * 2, 1, sea);

sea.step();
view.draw();

document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        osc1.next();
        //osc2.next();
        view.draw();
    }
};


class R {
    static down(e)  {
        R.c0 = e.offsetX;
        R.r0 = e.offsetY;
    }

    static move(e) {
        let c = e.offsetX;
        let r = e.offsetY;
        if (R.r0) {
            view.draw();
            view.drawRockLine(R.r0, R.c0, r, c);
        } else {
            if (c < N && r < N ) info.innerHTML = sea.w[r][c].x;
        }
    }

    static up()  {
        if (R.r0) {
            R.r0 = null;
            let canvasData = canvas.getContext("2d").getImageData(0, 0, N, N);
            sea.rocksFromImg(canvasData);
            view.draw();
        }
    }

}

R.r0 = null;
R.c0 = null;



canvas.onmousedown = R.down;
canvas.onmousemove = R.move;
canvas.onmouseup = R.up;

kvisRange.onchange = function() {
  Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = " + Kvis;
};