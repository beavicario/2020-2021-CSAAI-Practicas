
const button1 = document.getElementById("button1")
const button2 = document.getElementById("button2")
const parrafo = document.getElementById("parrafo")

parrafo.onclick =  function(){
    console.log("¿un qué?")
}

button1.onclick = function(){
    console.log("¡Click 1!")
    parrafo.innerHTML += " 1"
}

button2.onclick = function(){
    console.log("¡Click 2!")
    parrafo.innerHTML += " 2"
}

