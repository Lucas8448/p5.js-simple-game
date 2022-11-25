var xstart = 200
var ystart = 200
var size = 20
var xspeed =size
var yspeed = 0
var input_timeout = 0

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setup() {
    createCanvas(400, 400);
    background(0, 255, 0);
    frameRate(3);
    var squares = [];
    for (var i = 0; i < width; i += size) {
        for (var j = 0; j < height; j += size) {
            squares.push([i, j]);
        }
    }
    console.log(squares);
}

//make array of all possible square positions

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

class apple {
    constructor(xpos, ypos, size) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.size = size;
    }

    draw() {
        fill(255, 0, 0);
        square(this.xpos, this.ypos, this.size)
    }
}


var snake = [
    new bodypart(xstart, ystart, size),
    new bodypart(xstart + size, ystart, size),
    new bodypart(xstart + size * 2, ystart, size),
]

var apples = [
    new apple(20 * getRandomInt(20), 20 * getRandomInt(20), size)
]

function draw() {
    input_timeout = 0
    background(0, 200, 0);
    //check if snake is near any of the apples
    for (var i = 0; i < apples.length; i++) {
        if (snake[0].xpos == apples[i].xpos && snake[0].ypos == apples[i].ypos) {
            snake.push(new bodypart(snake[snake.length - 1].xpos, snake[snake.length - 1].ypos, size))
            apples.splice(i, 1);
            apples.push(new apple(20 * getRandomInt(20), 20 * getRandomInt(20), size))
            apples.push(new apple(20 * getRandomInt(20), 20 * getRandomInt(20), size))
        }
    }

    for (var i = 0; i < apples.length; i++) {
        apples[i].draw();
    }
    for (var i = 0; i < snake.length; i++) {
        snake[i].draw();
    }

    //restart if snake hits itself
    for (var i = 1; i < snake.length; i++) {
        if (snake[0].xpos == snake[i].xpos && snake[0].ypos == snake[i].ypos) {
            snake = [
                new bodypart(xstart, ystart, size),
                new bodypart(xstart + size, ystart, size),
                new bodypart(xstart + size * 2, ystart, size),
            ]
            apples = [
                new apple(20 * getRandomInt(20), 20 * getRandomInt(20), size)
            ]
        }
    }

    // teleport snake to other side when hit
    if (snake[0].xpos >= width) {
        snake[0].xpos = 0;
    } else if (snake[0].xpos < 0) {
        snake[0].xpos = width - size;
    } else if (snake[0].ypos >= height) {
        snake[0].ypos = 0;
    } else if (snake[0].ypos < 0) {
        snake[0].ypos = height - size;
    }
    snake.unshift(new bodypart(snake[0].xpos + xspeed, snake[0].ypos + yspeed, size));
    snake.pop();
}


function keyPressed() {
    if ((keyCode === UP_ARROW || keyCode === 87) && yspeed != size) {
        if (input_timeout === 0) {
            xspeed = 0;
            yspeed = -size;
            input_timeout = 1;
        }
    } else if ((keyCode === DOWN_ARROW  || keyCode === 83) && yspeed != -size) {
        if (input_timeout === 0) {
            xspeed = 0;
            yspeed = size;
            input_timeout = 1;
        }
    } else if ((keyCode === LEFT_ARROW || keyCode === 65) && xspeed != size) {
        if (input_timeout === 0) {
            xspeed = -size;
            yspeed = 0;
            input_timeout = 1;
        }
    } else if ((keyCode === RIGHT_ARROW  || keyCode === 68) && xspeed != -size ) {
        if (input_timeout === 0) {
            xspeed = size;
            yspeed = 0;
            input_timeout = 1;
        }
    } else if (keyCode === 82) {
        snake = [
            new bodypart(xstart, ystart, size),
            new bodypart(xstart + size, ystart, size),
            new bodypart(xstart + size * 2, ystart, size),
        ]
        apples = [
            new apple(20 * getRandomInt(20), 20 * getRandomInt(20), size)
        ]
        xspeed = size;
        yspeed = 0;
    }
}

