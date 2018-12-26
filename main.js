// скорость волн = 1 пиксель/тик

var D = 10;  // triangle size for 3d visualize
var N = D * 50 // 3 * 167 = 501
var OMEGA_MIN = 0.2 /(2 * Math.PI); // 0.2 < OMEGA_MIN < 0.8
var M = 1 / OMEGA_MIN;              // Margin = 1/omegaMin
var W = 0.99;
var Kvis = 2**9;                      // visualise coefficient
var Kvis3d = 10;                      // visualise coefficient

let canvas = document.getElementById("canvas1");
let info = document.getElementById("info");
let resetButton = document.getElementById("resetButton");
let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
let rocksButton = document.getElementById("rocksButton");
let oscillatorsButton = document.getElementById("oscillatorsButton");
let optionsButton = document.getElementById("optionsButton");
let toolsArea = document.getElementById("toolsArea");

let timerId;
let sea;
let view;
let view3d;

init(N, M, D);

function init(n, m, d) {
    canvas.width = n;
    canvas.height = n;
    OscilHandler.set();
    oscillatorsButton.checked = true;
    // do pause
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    }

    sea = new Sea(n, m);

    view = new View(sea);
    view.draw();

    view3d = new View3d(sea, D);
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
            view.draw();
        }, 50);
        playPauseButton.innerHTML = '►';
    }
};

optionsButton.onclick = function() {
    if (toolsArea.style.display !== "block") {
        toolsArea.value = `"D": ${D},
"N": ${N},
"M": ${M | 0},
"W": ${W},
"OMEGA_MIN": ${OMEGA_MIN},
"Kvis": ${Kvis},
"Kvis3d": ${Kvis3d}`;

        let lineCount = (toolsArea.value.match(/\n/g) || []).length;
        toolsArea.rows = lineCount + 1;
        toolsArea.style.display = "block";
    } else {
        let o = JSON.parse("{" + toolsArea.value + "}");
        Object.assign(window, o);
        toolsArea.style.display = "none";
    }
};

document.body.onkeydown = e => {
    if (e.key === 's') {
        sea.step();
        view.draw();
        view3d.draw();

    } else if (e.key === 'm') {

    }
    info.innerHTML = `r=${sea.point.r}  c=${sea.point.c}  E=${sea.measure()}` ;
};

resetButton.onclick = function() {
    init(N, M, D);
}


kvisRange.onchange = function() {
    Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

rocksButton.onclick = function() {
    RockHandler.set();
};


oscillatorsButton.onclick = function() {
    OscilHandler.set();
};







