// скорость волн = 1 пиксель/тик

const N = 500;
const OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
const M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
let Kvis = 2**9;                      // visualise coefficient
let Mode = 'none'  // 'none', 'rock', 'clean'

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N, M);
let view = new View(sea);

let osc1 = new Oscillator(N / 2, N / 2, OMEGA_MIN, 1, sea);
let osc2 = new Oscillator(N / 2, (N / 2 + 2/OMEGA_MIN)|0, OMEGA_MIN * 2, 1, sea);

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

let r0 = null, c0;

canvas.onmousedown = e => {
    c0 = e.offsetX, r0 = e.offsetY;
};

canvas.onmousemove = e => {
    let c = e.offsetX, r = e.offsetY;
    if (r0) {
        view.draw();
        view.drawRockLine(r0, c0, r, c);
    } else {
        if (c < N && r < N ) info.innerHTML = sea.w[r][c].x;
    }
};

canvas.onmouseup = e => {
    let c = e.offsetX, r = e.offsetY;
    if (r0) {
        r0 = null;
        var canvasData = canvas.getContext("2d").getImageData(0, 0, N, N);
        sea.rocksFromImg(canvasData);
        view.draw();
    }
};


kvisRange.onchange = e => {
  Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = " + Kvis;
};