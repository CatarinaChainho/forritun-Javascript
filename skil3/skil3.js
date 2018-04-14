var canvas, ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dot_flag = false;


//color variables
var rColor = 0;
var gColor = 0;
var bColor = 0;


//paintbrush default
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
canvas.style.backgroundColor = "black";
canvas.style.border = "2px solid rgb(204, 0, 153)";
mirror = document.getElementById('mirror');

console.log(window.innerWidth);

w = canvas.width;
h = canvas.height;


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


function draw(/*rColor, gColor, bColor, */pointsize) {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = "white"/*'rgb('+rColor+','+gColor+','+bColor+')'*/;
	ctx.lineWidth = pointsize;
	ctx.stroke();
	ctx.closePath();
};

function reset() {
	ctx.clearRect(0, 0, w, h);
	document.getElementById('redColor').value = 0;
	document.getElementById('greenColor').value = 0;
	document.getElementById('blueColor').value = 0;
	rColor = 0;
	gColor = 0;
	bColor = 0;
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
			ctx.fillStyle = "white"/*'rgb('+rColor+','+gColor+','+bColor+')'*/;
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