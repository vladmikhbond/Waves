
let canvas = document.getElementById("canvas2d");
let canvas3d = document.getElementById("canvas3d");
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

init(opts.N, opts.M, opts.D);

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
    view3d = new View3d(sea, d);
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
        toolsArea.value = opts.stringify();
        let lineCount = (toolsArea.value.match(/\n/g) || []).length;
        toolsArea.rows = lineCount + 1;
        toolsArea.style.display = "block";
    } else {
        opts.parse();
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
    init(opts.N, opts.M, opts.D);
};


kvisRange.onchange = function() {
    opts.Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

rocksButton.onclick = function() {
    RockHandler.set();
};


oscillatorsButton.onclick = function() {
    OscilHandler.set();
};







