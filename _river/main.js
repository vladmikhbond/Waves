let canvas1 = document.getElementById("canvas1");
let info = document.getElementById("info");
let playPauseButton = document.getElementById("playPauseButton");

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

    /////
    let osc = new Oscillator({r: opts.oscPos, omega: 0.1});
    river.addOscillator(osc);
    /////

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

// canvas2d.addEventListener('mousemove', function(e) {
//     sea.point.c = e.offsetX;
//     sea.point.r = e.offsetY;
//     let isle = sea.w[sea.point.r][sea.point.c];
//     info.innerHTML = `c=${e.offsetX} r=${e.offsetY} X = ${isle.x.toFixed(3)}  V = ${isle.v.toFixed(3)}` ;
// })
