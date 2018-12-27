let canvas2d = document.getElementById("canvas2d");
let canvas1d = document.getElementById("canvas1d");
let canvas3d = document.getElementById("canvas3d");
let info = document.getElementById("info");
let resetButton = document.getElementById("resetButton");
let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
let rocksButton = document.getElementById("rocksButton");
let oscillatorsButton = document.getElementById("oscillatorsButton");
let optsButton = document.getElementById("optsButton");
let optsArea = document.getElementById("optsArea");
let helpArea = document.getElementById("helpArea");

let timerId;
let sea;
let view;
let view3d;

init(opts.N, opts.M, opts.D);

function init(n, m, d) {
    // set sizes
    canvas1d.width = n;
    canvas1d.height = n;
    canvas2d.width = n;
    canvas2d.height = n;
    optsArea.style.width = helpArea.style.width = n + 'px';
    canvas3d.style.display = opts["3d"] ? "block" : "none";
    canvas1d.style.display = !opts["3d"] ? "block" : "none";
    // oscillators mode
    OscilHandler.set();
    oscillatorsButton.checked = true;
    // pause mode
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    }
    // create model
    sea = new Sea(n, m);
    // create view
    view = new View(sea);
    view3d = new View3d(sea, d);
    // initial drawing
    view.draw();
    view3d.draw();
}

// -------------- handlers ----------

resetButton.onclick = function() {
    init(opts.N, opts.M, opts.D);
};

oscillatorsButton.onclick = function() {
    OscilHandler.set();
};

rocksButton.onclick = function() {
    RockHandler.set();
};

kvisRange.onchange = function() {
    opts.Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

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

optsButton.onclick = function() {
    if (optsArea.style.display !== "block") {
        optsArea.value = opts.stringify();
        let lineCount = (optsArea.value.match(/\n/g) || []).length;
        helpArea.rows = optsArea.rows = lineCount + 1;
        optsArea.style.display = "block";
        helpArea.style.display = "block";
    } else {
        opts.parse();
        optsArea.style.display = "none";
        helpArea.style.display = "none";
    }
};

// ------------------ keys handler -----------------------
document.body.onkeydown = e => {
    if (e.key === 's') {
        sea.step();
        view.draw();
        view3d.draw();
    }
    info.innerHTML = `r=${sea.point.r}  c=${sea.point.c}  E=${sea.measure()}` ;
};








