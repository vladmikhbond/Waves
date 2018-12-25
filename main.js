// скорость волн = 1 пиксель/тик

const D = 2;  // triangle size for 3d visualize
const N = D * 250 // 3 * 167 = 501
const OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
const M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
let W = 0.99;
let Kvis = 2**9;                      // visualise coefficient
let Kvis3d = 10;                      // visualise coefficient

let canvas = document.getElementById("canvas");
let info = document.getElementById("info");
let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
let rocksButton = document.getElementById("rocksButton");
let oscilButton = document.getElementById("oscilButton");
let resetButton = document.getElementById("resetButton");
let timerId;
let sea;
let view;
let view3d;

init(N, M);

function init(n, m) {
    canvas.width = n;
    canvas.height = n;
    OscilHandler.set();
    oscilButton.checked = true;
    // do pause
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    }

    sea = new Sea(n, m);

    view = new View(sea);
    view.draw();

    view3d = new View3d(sea);
    view3d.draw();
}

// -------------- handlers ----------

playPauseButton.onclick = function() {
    if (timerId) {
        // do pause
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
        view.drawInfo();
    } else {
        // start to play
        timerId = setInterval( function () {
            sea.step();
            view3d.draw();
            //view.draw();
        }, 50);
        playPauseButton.innerHTML = '►';
    }
};

resetButton.onclick = function() {
    init(N, M);
}


document.body.onkeydown = e => {
    if (e.key === 's') {
        sea.step();
        view.draw();
        view3d.draw();
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







