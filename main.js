let canvas2d = document.getElementById("canvas2d");
let canvas1d = document.getElementById("canvas1d");
let canvas3d = document.getElementById("canvas3d");
let info = document.getElementById("info");
let resetButton = document.getElementById("resetButton");
let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
let rectButton = document.getElementById("rectButton");
let lineButton = document.getElementById("lineButton");
let meterButton = document.getElementById("meterButton");
let oscillatorsButton = document.getElementById("oscillatorsButton");
let optsButton = document.getElementById("optsButton");
let optsArea = document.getElementById("optsArea");
let helpArea = document.getElementById("helpArea");
let cameraRange = document.getElementById("cameraRange");
let lightRange = document.getElementById("lightRange");

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

function mainStep() {
    sea.step();

    view.draw();
    if (opts._3d)
        view3d.draw();
    if (opts._1d)
        view.draw1();

    infoTotalEnergy();
}

// -------------- handlers ----------

resetButton.onclick = () => init(opts.N, opts.D);

oscillatorsButton.onclick = () => OscilHandler.set();
rectButton.onclick = () => RectHandler.set();
lineButton.onclick = () => LineHandler.set();
meterButton.onclick = () => MeterHandler.set();


playPauseButton.onclick = function() {
    if (timerId) {
        // do pause
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    } else {
        // start to play
        timerId = setInterval(mainStep, 50);
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
        let resetFlag = opts.parse();
        if (resetFlag)
            init(opts.N, opts.D);
        optsArea.style.display = "none";
        helpArea.style.display = "none";
    }
};


// ------------------ range handlers -----------------------

kvisRange.onchange = function() {
    optz.Kvis = 2 ** kvisRange.value;
    optz.Kvis3d = 2 * kvisRange.value;
    kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
    view.draw();
};

cameraRange.onchange = function() {
    let r = opts.N;
    optz.cameraY = r * Math.sin(cameraRange.value);
    optz.cameraZ = r * Math.cos(cameraRange.value);
    view3d.draw();
};

lightRange.onchange = function() {
    optz.lightX = lightRange.value * opts.N / 2;
    view3d.draw();
};


// ------------------ keys handler -----------------------

document.body.onkeydown = e => {
    if ('SsЫы'.includes(e.key)) {
        mainStep()
    }
    if ('MmЬь'.includes(e.key)) {
        let energy = sea.energyDensity(20).toFixed(10);
        info.innerHTML = `r=${sea.point.r}  c=${sea.point.c}  E=${energy}` ;
    }
};

// ---------------------- just info ----------------------------

function infoTotalEnergy() {
    let total = sea.energyTotal();
    info.innerHTML = `Pot = ${total.eP.toFixed(5)}  Cin = ${total.eC.toFixed(5)}` ;
}

canvas1d.addEventListener('mousemove', function(e) {
    sea.point.c = e.offsetX;
    sea.point.r = e.offsetY;
    let o = sea.w[sea.point.r][sea.point.c];
    info.innerHTML = `c=${e.offsetX} r=${e.offsetY} X = ${o.x.toFixed(3)}  V = ${o.v.toFixed(3)}` ;
})