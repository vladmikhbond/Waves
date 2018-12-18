const N = 600;
let omega = 0.05;

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");
// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N);
let view = new View(sea);

let vib = new Vibrator(N / 2, N / 2, omega, 1, sea);
sea.step();
view.draw();

document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        vib.next();
        view.draw();
    }

};

canvas.onmousemove = e => {
    let c = e.offsetX, r = e.offsetY;
    if (c < N && r < N ) {
        info.innerHTML = sea.m[r][c].x;
    }
};