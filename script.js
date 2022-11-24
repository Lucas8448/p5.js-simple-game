var xstart = 100
var ystart = 300
var size = 20
var xspeed =size
var yspeed = 0

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setup() {
    createCanvas(400, 400);
    background(255);
    frameRate(5);
}

class bodypart {
    constructor(xpos, ypos, size, color=(0, 255, 0)) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.size = size;
        this.color = color;
    }

    draw() {
        fill(this.color);
        square(this.xpos, this.ypos, this.size)
    }
}

var snake = [
    new bodypart(xstart, ystart, size),
    new bodypart(xstart + size, ystart, size),
    new bodypart(xstart + size * 2, ystart, size),
]

function draw() {
    background(255);
    for (var i = 0; i < snake.length; i++) {
        snake[i].draw();
    }
    snake.unshift(new bodypart(snake[0].xpos + xspeed, snake[0].ypos + yspeed, size));
    snake.pop();
}

function keyPressed() {
    if ((keyCode === UP_ARROW || keyCode === 87) && yspeed != size) {
        xspeed = 0;
        yspeed = -size;
    } else if ((keyCode === DOWN_ARROW  || keyCode === 83) && yspeed != -size) {
        xspeed = 0;
        yspeed = size;
    } else if ((keyCode === LEFT_ARROW  || keyCode === 65) && xspeed != size ){
        xspeed = -size;
        yspeed = 0;
    } else if ((keyCode === RIGHT_ARROW  || keyCode === 68) && xspeed != -size ) {
        xspeed = size;
        yspeed = 0;
    }
}