
let directo = document.getElementById('directo')
const video1 = document.getElementById('video1')
const video2 = document.getElementById('video2')
const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const testButton = document.getElementById('test')
const fuentesOn = document.getElementById('fuentesOn')
const fuentesOff = document.getElementById('fuentesOff')
const autoButton = document.getElementById('auto')
const loopButton = document.getElementById('loop')
const testImage =  "test.gif"

let auto =  null
let loop = null

directo.width = 420
directo.height = 200
directo.poster = testImage
video1.width = 200
video1.height = 100
video1.poster = testImage
video2.width = 200
video2.height = 100
video2.poster = testImage

fuentesOn.onclick =  function(){
    video1.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
    video1.currentTime = 0
    video1.play()
    video1.muted = true

    video2.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
    video2.currentTime = 0
    video2.play()
    video2.muted =  true

    directo.poster = testImage

}

fuentesOff.onclick =  function(){
    video1.poster = testImage
    video1.src = ""
    video2.poster = testImage
    video2.src = ""
    directo.poster = testImage
    directo.src = ""
}

button1.onclick =  function() {
    directo.src = video1.src
    directo.currentTime = video1.currentTime
    directo.play()
}

button2.onclick =  function() {
    directo.src = video2.src
    directo.currentTime = video2.currentTime
    directo.play()
}

testButton.onclick =  function(){
    directo.poster =  testImage
    directo.src = ""
}

autoButton.onclick = function(){
    button1.disabled = !button1.disabled
    button2.disabled = !button2.disabled
    loopButton.disabled = !loopButton.disabled

    if (auto != null) {
        clearInterval(auto)
        video1.poster = testImage
        video1.src = ""
        video2.poster = testImage
        video2.src = ""
        directo.poster = testImage
        directo.src = ""
        auto = null
        return   
    }

    auto = setInterval(function(){
        if (directo.src == video1.src) {
            directo.src = video2.src
            directo.currentTime = video2.currentTime
            directo.play()       
        }else{
            directo.src = video1.src
            directo.currentTime = video1.currentTime
            directo.play()       
        }

    }, 3000)
}

loopButton.onclick = function(){
    autoButton.disabled = !autoButton.disabled

    if (loop != null) {
        clearInterval(loop)
        loop = null
        return   
    }

    loop = setInterval(function(){
        directo.currentTime = 0
    }, 2000)
}