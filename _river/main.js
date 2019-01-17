
let canvas1 = document.getElementById("canvas1");

// let info = document.getElementById("info");
// let resetButton = document.getElementById("resetButton");
// let kvisRange = document.getElementById("kvisRange");
let playPauseButton = document.getElementById("playPauseButton");
// let rectButton = document.getElementById("rectButton");
// let lineButton = document.getElementById("lineButton");
// let meterButton = document.getElementById("meterButton");
// let oscillatorsButton = document.getElementById("oscillatorsButton");
// let optsButton = document.getElementById("optsButton");
// let optsArea = document.getElementById("optsArea");
// let helpArea = document.getElementById("helpArea");
// let cameraRange = document.getElementById("cameraRange");
// let lightRange = document.getElementById("lightRange");

let opts = {N: 200, W: 1.0};

let timerId;
let river;
let view;


init(opts.N);

function init(n) {
    // set sizes
    canvas1.width = canvas1.height = n;
    // pause mode
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    }
    // create model
    river = new River(n);
    river.addOscillator(opts.N / 2, 0.013, 1);
    // create view
    view = new View(river);
    // initial drawing
    view.draw();
}

function mainStep() {
    river.step();
    view.draw();
}

// -------------- handlers ----------

// resetButton.onclick = () => init(opts.N, opts.D);
//
// oscillatorsButton.onclick = () => OscilHandler.set();
// rectButton.onclick = () => RectHandler.set();
// lineButton.onclick = () => LineHandler.set();
// meterButton.onclick = () => MeterHandler.set();


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


// ------------------ range handlers -----------------------

// kvisRange.onchange = function() {
//     optz.Kvis = 2 ** kvisRange.value;
//     optz.Kvis3d = 2 * kvisRange.value;
//     kvisRange.title = "Kvis = 2 ** " + kvisRange.value;
//     view.draw();
// };


// ------------------ keys handler -----------------------

document.body.onkeydown = e => {
    if ('SsЫы'.includes(e.key)) {
        mainStep()
    }
    // if ('MmЬь'.includes(e.key)) {
    //     let energy = sea.energyDensity(20).toFixed(10);
    //     info.innerHTML = `r=${sea.point.r}  c=${sea.point.c}  E=${energy}` ;
    // }
};

// ---------------------- just info ----------------------------

// function infoTotalEnergy() {
//     let total = sea.energyTotal();
//     info.innerHTML = `Pot = ${total.eP.toFixed(5)}  Cin = ${total.eC.toFixed(5)}` ;
// }

// canvas1d.addEventListener('mousemove', function(e) {
//     sea.point.c = e.offsetX;
//     sea.point.r = e.offsetY;
//     let o = sea.w[sea.point.r][sea.point.c];
//     info.innerHTML = `c=${e.offsetX} r=${e.offsetY} X = ${o.x.toFixed(3)}  V = ${o.v.toFixed(3)}` ;
// })