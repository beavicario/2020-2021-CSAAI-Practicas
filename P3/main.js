
const canvas = document.getElementById("gameCanvas")
canvas.width = 400
canvas.height = 800
const ctx = canvas.getContext("2d")

let paddle = {
    x: canvas.width /2,
    y: canvas.height -20,
    width: 30,
    height: 10,
    dx: 0,
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
        }
    }
}

let ball = {
    x: canvas.width /2,
    y: canvas.height /2,
    radius: 15,
    dx: 0,
    dy: 0,
    draw: function(){
        ctx.beginPath()
        ctx.arc (this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.closePath()
    },
    update: function(){
        if (this.x + this.dx - this.radius < 0 || this.x + this.dx + this.radius > canvas.width) {
            this.dx *= (-1)
        }
        if (this.y + this.dy - this.radius < 0 || this.y + this.dy + this.radius > canvas.height) {
            this.dy *= (-1)
        }
        this.x += this.dx
        this.y += this.dy
    }
}

let bricks = {
    all: [],
    rows: 5,
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
            y: 10 + 20 * i,
            width: 37.5,
            height: 15,
            visible: true
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
        if (ball.dx != 0 && ball.dy != 0) {
            return
        }
        ball.dx = 2
        ball.dy = 2
        
    }
})

document.addEventListener ("keyup", (e) => {
    if (e.keyCode == 39 || e.keyCode == 37) {
        paddle.dx = 0
    }
})

function mainLoop(){
    paddle.update()
    ball.update()
    ctx.clearRect(0,0,canvas.width, canvas.height)
    paddle.draw()
    ball.draw()
    bricks.draw()

    requestAnimationFrame(mainLoop)
}

mainLoop()

