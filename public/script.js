const canvas = document.getElementById('canvas');

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

var socket = io();
let ctx = canvas.getContext('2d');

let x,y;
let mouseDown = false;

window.onmousedown = (e) => {
    ctx.moveTo(x, y);
    socket.emit('down', {x, y});
    mouseDown = true;
};

window.onmouseup = (e) => {
    mouseDown = false;
};

socket.on("draw", ({x, y}) =>{
    ctx.lineTo(x, y);
    ctx.stroke();
})

socket.on("down", ({x, y}) =>{
    ctx.moveTo(x, y);
    ctx.stroke();
})

window.onmousemove = (e) => {
    x = e.clientX;
    y = e.clientY;

    if(mouseDown) {
        socket.emit("draw", {x, y});
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}