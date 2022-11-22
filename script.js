//define variables

// first value is x, second is y
const ball_pos = [200, 200];

// first value is vertical, second is horizontal
const ball_dir = [-8, -8];

// ball radius
let ball_r = 25;

// game status, 0 is inactive, 1 is active
let game = 1;

//game score
let score = 0;

// make opponent area variable global
const opponent_area = new Array;

function setup() {
    createCanvas(400, 400);
    background(0);
}

function draw() {
    background(0);

    if (game === 1) {
        //draw ball
        fill(255);
        circle(ball_pos[0], ball_pos[1], ball_r * 2);

        //move ball
        ball_pos[0] += ball_dir[0];
        ball_pos[1] += ball_dir[1];

        //load paddles
        opponent();
        opponent2();


        //check for collisions
        collisions();

    } else if (game === 0) {
        //show score
        textSize(32);
        fill(255);
        text(score, 10, 30);
    }
}

function collisions() {
    //check if ball is hitting the top/bottom, and proceed to bounce it
    if (ball_pos[1] + ball_r >= height || ball_pos[1] - ball_r <= 0) {
        ball_dir[1] *= -1;
    }

    //check if ball is hitting opponent and bounce ball in opposite trajectory
    if (ball_pos[0] <= 45 && ball_pos[1] >= opponent_area[0] && ball_pos[1] <= opponent_area[1]) {
        ball_dir[0] *= -1;
    } else if (ball_pos[0] >= 355) {
        ball_dir[0] *= -1;
    }
}

function opponent() {
    fill(255);
    rect(10, ball_pos[1] - 50, 10, 100);
    opponent_area[0, 1] = [ball_pos[1] + 50, ball_pos[1] - 50]
}


function opponent2() {
    fill(255);
    rect(380, ball_pos[1] - 50, 10, 100);
    opponent_area = [ball_pos[1] + 50, ball_pos[1] - 50]
}