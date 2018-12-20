// скорость волн 1 пиксель/тик

const N = 400;
const omega = 0.2 /(2 * Math.PI); // 0.2 < omega < 0.8
let M = 30;          //  = 1 / omega-min

let canvas = document.getElementById("canvas1");
let info = document.getElementById("info");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N, M);
let view = new View(sea);

let osc1 = new Oscillator(N / 2, N / 2, omega, 1, sea);
let osc2 = new Oscillator(N / 2, (N / 2 + 2/omega)|0, omega * 2, 1, sea);

sea.step();
view.draw();

document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        osc1.next();
        osc2.next();
        view.draw();
    }
};

canvas.onmousemove = e => {
    let c = e.offsetX, r = e.offsetY;
    if (c < N && r < N ) {
        info.innerHTML = sea.w[r][c].x;
    }
};