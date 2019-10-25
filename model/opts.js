class Options
{
    constructor() {
        this.D = 2;
        this.N = 500;    // 3 * 167 = 501
        this.OMEGA =   0.03
        this.Km = 0.25;  //   K / m < 0.25
        this.W = 1;
        this.R = 0;
        this.W_ROCK = 1;
    }

    stringify() {
        return `D = ${this.D} -- triangle size for 3d visualize
N = ${this.N} -- сторона квадрата модели (должна быть кратна D)
W = ${this.W} -- поглощение средой (0 < W <= 1, v *= W )
R = ${this.R} -- =1 отражение от границ, =0 - поглощение границами
OMEGA = ${this.OMEGA} -- частота нового осциллятора (от 0.001 до 0.1)
Km = ${this.Km} -- модуль упругости / масса узла 
W_ROCK = ${this.W_ROCK} -- "поглощение" скалами (0 < W_ROCK <= 1)
`;
    }

    parse() {
        let txt = optsArea.value.trim();
        let lines = txt.split('\n');
        let regex = /\s*(\w+)\s*=\s*([\w\.]+)\s*/;
        for (let line of lines) {
            let found = line.match(regex);
            if (found) {
                this[found[1]] = +found[2];
            }
        }
        this.N = Math.round(this.N / this.D) * this.D;
        this.OMEGA = this.OMEGA.toFixed(4);
        return false;
    }

}


export let opts = new Options();


export let optz = {
    Kvis: 2**9,                     // 2d visualise coefficient
    Kvis3d: 2*9,                    // 3d visualise coefficient
    cameraY: 0,
    cameraZ: opts.N * Math.cos(cameraRange.value),
    lightX: lightRange.value * opts.N / 2,
    lineIsleWidth: 1,               // width of the line isle
    meterRadius: 20,
};

