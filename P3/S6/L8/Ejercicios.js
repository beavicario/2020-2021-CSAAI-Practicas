
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const start = document.getElementById("start")
const right = document.getElementById("right")
const left = document.getElementById("left")

canvas.width = 400
canvas.height = 600

let gameState = {
    lives: 3,
    score: 0,
    draw: function(){
        ctx.textAlign = "center"
        ctx.font = "15pt Calibri"
        ctx.fillStyle = "black"
        ctx.fillText("LIVES " + String(this.lives) + "    SCORE " + String(this.score), canvas.width /2, 20)
    },
    update: function(){
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
        ctx.fillStyle = "black"
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
        ctx.fillStyle = "black"
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

start.onclick = function(){
    ball.dx = 2
    ball.dy = 2
} 

right.onclick = function(){
    paddle.dx = 2
}

left.onclick = function(){
    paddle.dx = -2
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
                ctx.fillStyle = "black"
                ctx.fill()
                ctx.closePath()
            }
        }
        
    }
}

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

function checkCollisions(){
    if (ball.collide(paddle)) {
        ball.dy *= (-1)
    }
}

function mainLoop(){
    checkCollisions()
    gameState.update()
    paddle.update()
    ball.update()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    gameState.draw()
    paddle.draw()
    ball.draw()
    bricks.draw()
    requestAnimationFrame(mainLoop)
}

mainLoop()

