var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;


var round = false;

var pointsize = 2;


//select the paintbrush size
function takePoint(){
    pointsize  = document.getElementById('pointsize').value;

    if (pointsize > 5){
        document.getElementById('pointsize').value = 5;
        pointsize = 5;
    };

    if (pointsize < 0){
        document.getElementById('pointsize').value = 0;
        pointsize = 0;
    };
};


//create the canvas
canvas = document.getElementById('myCanvas');

ctx = canvas.getContext("2d");
canvas.style.cursor = "crosshair";
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth / 2;
canvas.style.left = "100px";
canvas.style.backgroundColor = "white";
canvas.style.border = "2px solid rgb(204, 0, 153)";
mirror = document.getElementById('mirror');


mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
});


canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);

canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);

canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);

canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);

function draw(pointsize) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.lineWidth = pointsize;
    ctx.stroke();
    ctx.closePath();
};

function redPen(){
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
};

function greenPen(){
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
};

function bluePen(){
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
};

function yellowPen(){
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
};

function orangePen(){
    ctx.strokeStyle = "orange";
    ctx.fillStyle = "orange";
};

function babybluePen(){
    ctx.strokeStyle = "#00BFFF";
    ctx.fillStyle = "#00BFFF";
};

function purplePen(){
    ctx.strokeStyle = "purple";
    ctx.fillStyle = "purple";
};

function blackPen(){
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
};

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('pointsize').value = 0;
    pointsize = 2;

};

function makeRound(){
    ctx.lineJoin = ctx.lineCap = 'round';  
};

function makeSquare(){
    ctx.lineJoin = ctx.lineCap = 'square';
};

//'res' lets you know how many px the mouse has moved
function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        //flag tells you when the mouse button is being held down
        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        };
    };
    if (res == 'up' || res == "out") {
        flag = false;
    };
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw(/*rColor,gColor,bColor, */pointsize);
        };
    };
};
