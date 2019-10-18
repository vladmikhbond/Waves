import {OscilHandler} from './controller/OscilHandler.js';
import {RectHandler} from './controller/RectHandler.js';
import {LineHandler} from './controller/LineHandler.js';
import {MeterHandler} from './controller/MeterHandler.js';
import {View} from './view/view.js';
import {View3d} from './view/view3d.js';
import {Sea} from './model/sea.js';
import {opts, optz} from './model/opts.js';
import {radios} from './globals.js';

let timerId;

export let sea;
export let view;
export let view3d;


init();

function init() {
    // set sizes
    canvas2d.width = canvas2d.height = opts.N;
    optsArea.style.width = helpArea.style.width = opts.N + 'px';
    canvas2d.style.display = "block";
    tools2d.style.display = "inline";
    _2dCheckBox.checked = 1;
    canvas3d.style.display = "none";
    tools3d.style.display = "none";
    for (let r of radios) r.disabled = false;

    // create model
    sea = new Sea(opts.N);
    // create view
    view = new View(sea);
    view3d = new View3d(sea, opts.D);

    // oscillators mode
    OscilHandler.set(sea, view);
    oscillatorsButton.checked = true;
    // pause mode
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        playPauseButton.innerHTML = '■';
    }
    // initial drawing
    view.draw();
    view3d.draw();
}

function mainStep() {
    let t1 = new Date();  // timing
    sea.step();
    console.log(`model: ${new Date().valueOf() - t1.valueOf()}`);

    let t2 = new Date();  // timing
    view.draw();
    console.log(`draw_2d: ${new Date().valueOf() - t2.valueOf()}`);


    let t3 = new Date();  // timing
    view3d.draw();
    console.log(`draw_3d: ${new Date().valueOf() - t3.valueOf()}`);


    let t4 = new Date();  // timing
    view.draw1d();
    console.log(`others: ${new Date().valueOf() - t4.valueOf()}`);

    infoTotalEnergy();
    // timing
    console.log(`--------- All: ${new Date().valueOf() - t1.valueOf()}`);

}

// -------------- handlers ----------

resetButton.onclick = () => init(opts.N, opts.D);

oscillatorsButton.onclick = () => OscilHandler.set(sea, view, view3d);
rectButton.onclick = () => RectHandler.set(sea, view, view3d);
lineButton.onclick = () => LineHandler.set(sea, view, view3d);
meterButton.onclick = () => MeterHandler.set(sea, view, view3d);


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

helpButton.onclick = function() {
    if (helpArea.style.display !== "block") {
        helpArea.style.display = "block";
    } else {
        helpArea.style.display = "none";
    }
};

optsButton.onclick = function() {
    if (optsArea.style.display !== "block") {
        optsArea.value = opts.stringify();
        let lineCount = (optsArea.value.match(/\n/g) || []).length;
        optsArea.style.display = "block";
     } else {
        let resetFlag = opts.parse();
        if (resetFlag)
            init(opts.N, opts.D);
        optsArea.style.display = "none";
    }
};

_2dCheckBox.onchange = function() {
    if (_2dCheckBox.checked) {
        canvas2d.style.display = "block";
        canvas3d.style.display = "none";
        tools3d.style.display = "none";
        tools2d.style.display = "inline";
        for (let r of radios) r.disabled = false;
    } else {
        canvas2d.style.display = "none";
        canvas3d.style.display = "block";
        tools3d.style.display = "inline";
        tools2d.style.display = "none";
        for (let r of radios) r.disabled = true;
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

// canvas2d.addEventListener('mousemove', function(e) {
//     sea.point.c = e.offsetX;
//     sea.point.r = e.offsetY;
//     let o = sea.w[sea.point.r][sea.point.c];
//     info.innerHTML = `c=${e.offsetX} r=${e.offsetY} X = ${o.x.toFixed(3)}  V = ${o.v.toFixed(3)}` ;
// });
