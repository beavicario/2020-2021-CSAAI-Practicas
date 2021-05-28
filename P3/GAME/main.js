
const canvas = document.getElementById("gameCanvas")
const easyButton = document.getElementById("easy")
const mediumButton = document.getElementById("medium")
const hardButton = document.getElementById("hard")
const paddleSound = new Audio('pong-raqueta.mp3');
const reboundSound = new Audio('pong-rebote.mp3');
const pointSound = new Audio('pong-tanto.mp3');



canvas.width = 400
canvas.height = 600
const ctx = canvas.getContext("2d")
const STATES = {
    WAITING: 0,
    PLAYING: 1
}

let maxScore = 0

let gameState = {
    lives: 3,
    score: 0,
    state: STATES.WAITING,
    draw: function(){
        ctx.textAlign = "center"
        ctx.font = "15pt Calibri"
        ctx.fillStyle = "white"
        ctx.fillText("LIVES " + String(this.lives) + "    SCORE " + String(this.score), canvas.width /2, 20)
        if (this.state == STATES.WAITING) {
            ctx.fillText("PRESS SPACEBAR TO START", canvas.width /2, 40)
        }
    },
    update: function(){
        if (this.score == maxScore) {
            pointSound.currentTime = 0
            pointSound.play()
            alert("YOU WIN")
            location.reload()
        }
        if (this.lives == 0) {
            alert("GAME OVER")
            location.reload()
        }
    }
}

let paddle = {
    x: canvas.width /2,
    y: canvas.height -20,
    width: 80,
    height: 10,
    dx: 0,
    boundingBox: {},
    draw: function(){
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
    },
    update: function(){
        if (this.x + this.dx >= 0 && this.x + this.dx + this.width <= canvas.width) {
            this.x += this.dx
            this.boundingBox.top.left.x += this.dx
            this.boundingBox.top.right.x += this.dx
            this.boundingBox.botttom.left.x += this.dx
            this.boundingBox.botttom.right.x += this.dx
        }
    }
}

paddle.boundingBox = {
    top:{
        left: {
            x: paddle.x,
            y: paddle.y
        },
        right:{
            x: paddle.x + paddle.width,
            y: paddle.y
        }
    },
    botttom:{
        left: {
            x: paddle.x,
            y: paddle.y + paddle.height
        },
        right:{
            x: paddle.x + paddle.width,
            y: paddle.y + paddle.height
        }
    }
}

let ball = {
    x: canvas.width /2,
    y: canvas.height /2,
    radius: 15,
    dx: 0,
    dy: 0,
    boundingBox: {},
    draw: function(){
        ctx.beginPath()
        ctx.arc (this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
    },
    collide: function(objCollide){
        let bb = objCollide.boundingBox
        if (bb.top.left.y <= this.boundingBox.botttom.left.y && this.boundingBox.botttom.left.y <= bb.botttom.left.y) {
            if (bb.top.left.x <= this.boundingBox.botttom.left.x && this.boundingBox.botttom.left.x <= bb.top.right.x) {
                return true
            }
            if (bb.top.left.x <= this.boundingBox.botttom.right.x && this.boundingBox.botttom.right.x <= bb.top.right.x) {
                return true
            }
        }
        if (this.boundingBox.top.left.y <= bb.botttom.left.y && bb.botttom.left.y <= this.boundingBox.botttom.left.y) {
            if (this.boundingBox.top.left.x <= bb.botttom.left.x && bb.botttom.left.x <= this.boundingBox.top.right.x) {
                return true
            }
            if (this.boundingBox.top.left.x <= bb.botttom.right.x && bb.botttom.right.x <= this.boundingBox.top.right.x) {
                return true
            }
        }
        return false
    },
    update: function(){
        if (this.x + this.dx - this.radius < 0 || this.x + this.dx + this.radius > canvas.width) {
            this.dx *= (-1)
        }
        if (this.y + this.dy - this.radius < 0) {
            this.dy *= (-1)
        }
        if (this.y + this.dy + this.radius > canvas.height) {
            gameState.lives--
            gameState.state = STATES.WAITING
            this.dx = 0
            this.dy = 0
            this.x = canvas.width /2
            this.y = canvas.height /2
            this.boundingBox.top.left.x = this.x - this.radius
            this.boundingBox.top.right.x = this.x + this.radius
            this.boundingBox.botttom.left.x = this.x - this.radius
            this.boundingBox.botttom.right.x = this.x + this.radius
            this.boundingBox.top.left.y = this.y - this.radius
            this.boundingBox.top.right.y = this.y - this.radius
            this.boundingBox.botttom.left.y = this.y + this.radius
            this.boundingBox.botttom.right.y = this.y + this.radius 
            return 
        }
        this.x += this.dx
        this.y += this.dy
        this.boundingBox.top.left.x += this.dx
        this.boundingBox.top.right.x += this.dx
        this.boundingBox.botttom.left.x += this.dx
        this.boundingBox.botttom.right.x += this.dx
        this.boundingBox.top.left.y += this.dy
        this.boundingBox.top.right.y += this.dy
        this.boundingBox.botttom.left.y += this.dy
        this.boundingBox.botttom.right.y += this.dy
    }
}

ball.boundingBox = {
    top:{
        left: {
            x: ball.x - ball.radius,
            y: ball.y - ball.radius
        },
        right:{
            x: ball.x + ball.radius,
            y: ball.y - ball.radius
        }
    },
    botttom:{
        left: {
            x: ball.x - ball.radius,
            y: ball.y + ball.radius
        },
        right:{
            x: ball.x + ball.radius,
            y: ball.y + ball.radius
        }
    }
}

let bricks = {
    all: [],
    rows: 6,
    cols: 9,
    draw: function(){
        for (let i = 0; i < this.all.length; i++) {
            let brick = this.all[i]
            if (brick.visible) {
                ctx.beginPath()
                ctx.rect(brick.x, brick.y, brick.width, brick.height)
                ctx.fillStyle = "white"
                ctx.fill()
                ctx.closePath()
            }
        }
        
    }
}

maxScore = (bricks.rows * bricks.cols) * 100

for (let i = 0; i < bricks.rows; i++) {
    for (let j = 0; j < bricks.cols; j++) {
        let brick = {
            x: 10 + 42.5 * j,
            y: 50 + 20 * i,
            width: 37.5,
            height: 15,
            visible: true,
            boundingBox: {
                top:{
                    left: {
                        x: 10 + 42.5 * j,
                        y: 50 + 20 * i
                    },
                    right:{
                        x: 10 + 42.5 * j + 37.5,
                        y: 50 + 20 * i
                    }
                },
                botttom:{
                    left: {
                        x: 10 + 42.5 * j,
                        y: 50 + 20 * i + 15
                    },
                    right:{
                        x: 10 + 42.5 * j + 37.5,
                        y: 50 + 20 * i + 15
                    }
                }
            }
        }
        bricks.all.push(brick)
    }
    
} 

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        paddle.dx = 2
    }
    if (e.keyCode == 37) {
        paddle.dx = -2
    }
    if (e.keyCode == 32) {
        if (gameState.state == STATES.PLAYING) {
            return
        }
        gameState.state = STATES.PLAYING
        ball.dx = 2
        ball.dy = 2
    }
})

easyButton.onchange = () => {
    ball.dx = 2
    ball.dy = 2 
}

mediumButton.onchange = () => {
    ball.dx = 3
    ball.dy = 3 
}

hardButton.onchange = () => {
    ball.dx = 5
    ball.dy = 5 
}



document.addEventListener ("keyup", (e) => {
    if (e.keyCode == 39 || e.keyCode == 37) {
        paddle.dx = 0
    }
})

function checkCollisions(){
    if (ball.collide(paddle)) {
        ball.dy *= (-1)
        paddleSound.currentTime = 0
        paddleSound.play()
    }
    for (let i = 0; i < bricks.all.length; i++) {
        let brick = bricks.all[i]
        if (brick.visible) {
            if (ball.collide(brick)) {
                ball.dy *= (-1)
                reboundSound.currentTime = 0
                reboundSound.play()   
                gameState.score += 100
                brick.visible = false
                break
            }
        }
    }
}

function mainLoop(){
    checkCollisions()
    gameState.update()
    paddle.update()
    ball.update()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    gameState.draw()
    switch (gameState.state) {
        case STATES.WAITING:
            //
            break
        case STATES.PLAYING:
            paddle.draw()
            ball.draw()
            bricks.draw()
            break
        default:
            break
    }

    requestAnimationFrame(mainLoop)
}

mainLoop()

