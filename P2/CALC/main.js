
const numButtons = document.getElementsByClassName("number")
const opButtons = document.getElementsByClassName("operation")
const display = document.getElementById("display")
const acButton = document.getElementById("AC")
const delButton = document.getElementById("DEL")
const dotButton = document.getElementById("DOT")


let states = {
    init:0,
    op1:1,
    operation:2,
    op2:3,
    current:0,
    old:[],
    dot:false
}

for (let i = 0; i < numButtons.length; i++) {
    numButtons[i].onclick = function (e){
        display.innerHTML += e.target.value
        states.old.push(states.current)
        if (states.current == states.operation) {
            states.current = states.op2
        }
    }    
}

for (let i = 0; i < opButtons.length; i++) {
    opButtons[i].onclick = function (e){
        if (e.target.value == "=") {
            if (display.innerHTML.length < 1) {
                return
            }
            display.innerHTML = eval(display.innerHTML)
            states.old = []
            states.current = states.init
            states.dot = false
        }else if (e.target.value == "%") {
            if (display.innerHTML.length < 1) {
                return
            }
            display.innerHTML = eval(display.innerHTML + "/100")
            states.old = []
            states.current = states.init
            states.dot = false
        } else {
            if (states.current == states.op2) {
                return
            }   
            if (states.current != states.operation) {
                display.innerHTML += e.target.value
                states.old.push(states.current)
                states.dot = false
                if (e.target.value == "**") {
                    states.old.push(states.operation)
                }
                states.current = states.operation
            }
        }
    }    
}

acButton.onclick = function(e){
    display.innerHTML = ""
    states.old = []
    states.current = states.init
}

delButton.onclick = function(e){
    display.innerHTML = display.innerHTML.substring(0,display.innerHTML.length -1)
    states.current = states.old.pop()
}

dotButton.onclick = function(e){
    if (!states.dot) {
        display.innerHTML += "."
        states.old.push(states.current)  
        states.dot = true
        if (states.current == states.operation) {
            states.current = states.op2
        } 
    }
}