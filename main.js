
const N = 600;
let sea = new Sea(N);
let view = new View(sea);
sea.m[N / 2][N / 2].x = 1;
sea.step();
view.draw();


document.body.onkeydown = e => {
    if (e.key === ' ') {
        sea.step();
        view.draw();
    }

}
canvas.onmousemove = e => {
    let c = e.offsetX, r = e.offsetY;
    if (c < sea.m.length && r < sea.m.length )
        info.innerHTML = sea.m[r][c].x
}