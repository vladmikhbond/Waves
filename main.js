// скорость волн = 1 пиксель/тик

const N = 500;
const OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
const M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
let Kvis = 2**9;                      // visualise coefficient
// let Mode = 'none'; // 'none', 'rock', 'clean'

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N, M);
let view = new View(sea);


//sea.addOscillator(N/2, N/2, OMEGA_MIN, 1);
sea.step();
view.draw();
OscilHandler.set();

// -------------- handlers ----------
// canvas.oncontextmenu = e => {e.preventDefault();}

document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        view.draw();
    }
};

kvisRange.onchange = function() {
    Kvis = 2 ** kvisRange.value;
    this.title = "Kvis = " + Kvis;
    view.draw();
};

rocksButton.onclick = function(e) {
    RockHandler.set();
};

cleanButton.onclick = function(e) {
    CleanHandler.set();
};

oscilButton.onclick = function(e) {
    OscilHandler.set();
};





