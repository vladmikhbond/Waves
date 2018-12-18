
const N = 200;
let canvas = document.getElementById("canvas");
let info = document.getElementById("info");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N);
let view = new View(sea);
let omega = 0.51;
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
        //let color = (255 * (sea.m[r][c].x - sea.min) / (sea.max - sea.min)) | 0;
        info.innerHTML = JSON.stringify(sea.m[N / 2][N / 2]);
    }
};