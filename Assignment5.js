//creating canvas

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 810;
canvas.height = 640;
canvas.style.border = "5px dashed Red";

//initializing conditions
var ctx = canvas.getContext("2d");
var time = 0;
var beforeCatch = false;
var frameRate = 10;

//bg img
var backgroundImg = false;
var backgroundImage = new Image();

backgroundImage.onload = function()
{
    backgroundImg = true;
};
backgroundImage.src = "grass2.jpg"

//img for bug
var bugImg = false;
var bugImage = new Image();

bugImage.onload = function()
{
    bugImg = true;
};
bugImage.src = "bugg.png";

var ladybug = {};
var ladybugCatch = 0;

//resetting
var reset = function()
{
    ladybug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        ladybug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (ladybug.y < 100)
};


//mousedown
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e)
{
    if (e.button != 0) return;

    xMouseCanvas = e.clientX;
    yMouseCanvas = e.clientY;

    if (bodyOfBug(ladybug, xMouseCanvas, yMouseCanvas)) {
        beforeCatch = true;
        clearInterval(time);
        time = setInterval(reset, 10000 / frameRate);
        reset();
    }
    if (scoreReset(xMouseCanvas, yMouseCanvas)) {
        location.reload();
    }
    if (speedReset(xMouseCanvas, yMouseCanvas)) {
        clearInterval(time);
        time = setInterval(reset, 10000 / frameRate);
        reset();
        render();
    }
};

//bugs body
function bodyOfBug(ladybug, x, y)
{
    if (x <= (ladybug.x + 80)
        && ladybug.x <= (x + 80)
        && y <= (ladybug.y + 80)
        && ladybug.y <= (y + 80)
    ) {
        frameRate = frameRate + 5;
        ladybugCatch++;
        return true;
    }
    return false;
};

//score reset button
function scoreReset(x, y)
{
    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    )
    {
        return true;
    }
    return false;
};

//speed reset button
function speedReset(x, y)
{
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        frameRate = 10;
        return true;
    }
    return false;
};

//on canvas
var render = function()
{

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (backgroundImg) {
        ctx.drawImage(backgroundImage, 0, 100);
    }
    if (bugImg) {
        ctx.drawImage(bugImage, ladybug.x, ladybug.y);
    }
    if (beforeCatch == true) {
        if (backgroundImg)
        {
            ctx.drawImage(backgroundImage, 0, 100);
        }
        beforeCatch = false;
    }

    //css Score, Title
    ctx.fillStyle = "rgb(255, 240, 33)";
    ctx.font = "40px Verdana";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bug Smasher Game!", 25, 40);
    ctx.font = "20px Serif";
    ctx.fillText(" Your Score: " + ladybugCatch, 120, 10);

    //Speed and reset button
    ctx.fillStyle = "rgb(47, 86, 107)";
    ctx.fillRect(320, 18, 200, 61);
    ctx.fillRect(560, 18, 200, 61);
    ctx.fillStyle = "rgb(240, 194, 238)";
    ctx.fillRect(325, 21, 190, 54);
    ctx.fillRect(565, 21, 190, 54);
    ctx.fillStyle = "rgb(117, 91, 186)";
    ctx.font = "25px Serif";
    ctx.fillText("Score Reset", 350, 34);
    ctx.fillText("Speed Reset", 590, 34);


};

// loop the game to continue playing
var main = function()
{
    render();
    requestAnimationFrame(main);
};

// support for getAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame;


// this starts the game
reset();
main();