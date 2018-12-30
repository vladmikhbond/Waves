let canvas2d = document.getElementById("canvas2d");
let canvas1d = document.getElementById("canvas1d");
let canvas3d = document.getElementById("canvas3d");
let info = document.getElementById("info");
let resetButton = document.getElementById("resetButton");
let kvisRange = document.getElementById("kvisRange");
let kvis3dRange = document.getElementById("kvis3dRange");
let playPauseButton = document.getElementById("playPauseButton");
let rectButton = document.getElementById("rectButton");
let lineButton = document.getElementById("lineButton");
let oscillatorsButton = document.getElementById("oscillatorsButton");
let optsButton = document.getElementById("optsButton");
let optsArea = document.getElementById("optsArea");
let helpArea = document.getElementById("helpArea");

let timerId;
let sea;
let view;
let view3d;

init(opts.N, opts.D);

function init(n, d) {
    // set sizes
    canvas1d.width = canvas1d.height = canvas2d.width = canvas2d.height = n;
    optsArea.style.width = helpArea.style.width = n + 'px';
    canvas3d.style.display = opts._3d ? "block" : "none";
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
    sea = new Sea(n);
    // create view
    view = new View(sea);
    view3d = new View3d(sea, d);
    // initial drawing
    view.draw();
    view3d.draw();
}

// -------------- handlers ----------

resetButton.onclick = () => init(opts.N, opts.D);

oscillatorsButton.onclick = () => OscilHandler.set();
rectButton.onclick = () => RectHandler.set();
lineButton.onclick = () => LineHandler.set();
// rocksButton.onclick = () => RockHandler.set();


kvisRange.onchange = function() {
    opts.Kvis = 2 ** kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

kvis3dRange.onchange = function() {
    opts.Kvis3d = kvis3dRange.value;
    view3d.draw();
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
            view.draw();
            if (opts._3d)
                view3d.draw();
            if (opts._1d)
                view.draw1();
        }, 50);
        playPauseButton.innerHTML = '►';
    }
};

optsButton.onclick = function()
{
    if (optsArea.style.display !== "block") {
        optsArea.value = opts.stringify();
        let lineCount = (optsArea.value.match(/\n/g) || []).length;
        helpArea.rows = optsArea.rows = lineCount + 1;
        optsArea.style.display = "block";
        helpArea.style.display = "block";
    } else {
        let resetFlag = opts.parse();
        if (resetFlag)
            init(opts.N, opts.D);
        optsArea.style.display = "none";
        helpArea.style.display = "none";
    }
};

// ------------------ keys handler -----------------------
document.body.onkeydown = e => {
    if ('SsЫы'.includes(e.key)) {
        sea.step();
        view.draw();
        view3d.draw();
    }
    info.innerHTML = `r=${sea.point.r}  c=${sea.point.c}  E=${sea.energyMeasure(20)}` ;
};








