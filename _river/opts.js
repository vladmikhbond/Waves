// N - число узлов (всегда четное)
// W - потери (1 - потерь нет)
// Km = модуль упругости / масса узла
// скорость распространения волны ~ Km ** 0.5 и не зависит от частоты осциллятора

let opts = {
    N: 2 * 200,
    W: 1,          // energy dissipation (W = 1 - no dissipation)
    Km: 0.2,      //   K/m
    omega: 1/20,
    margin: 50,
    V_SCALE: 30,
    oscPos: 100,     // position of the oscillator
    oscV: 1,       // not used
};

