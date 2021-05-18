
const button1 = document.getElementById("button1")
const parrafo = document.getElementById("parrafo")

parrafo.onclick =  function(){
    console.log("¿un qué?")
}

button1.onclick = function(){
    console.log("¡un Click!")
    parrafo.innerHTML += " 1"
}
