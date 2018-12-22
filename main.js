// скорость волн = 1 пиксель/тик

const N = 500;
const OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
const M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
let Kvis = 2**9;                      // visualise coefficient
// let Mode = 'none'; // 'none', 'rock', 'clean'

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");
let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
let rocksButton = document.getElementById("rocksButton");
let oscilButton = document.getElementById("oscilButton");

// init
canvas.width = N;
canvas.height = N;
let sea = new Sea(N, M);
let view = new View(sea);


//sea.addOscillator(N/2, N/2, OMEGA_MIN, 1);
// sea.step();
view.draw();
OscilHandler.set();

// -------------- handlers ----------
// canvas.oncontextmenu = e => {e.preventDefault();}

let timerId;

playPauseButton.onclick = function() {
    if (timerId) {
        // stop
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    } else {
        // start to play
        timerId = setInterval( function () {
            sea.step();
            view.draw();
        }, 50);
        playPauseButton.innerHTML = '►';
    }
};


document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        view.draw();
    }
};

kvisRange.onchange = function() {
    Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

rocksButton.onclick = function() {
    RockHandler.set();
};


oscilButton.onclick = function() {
    OscilHandler.set();
};





