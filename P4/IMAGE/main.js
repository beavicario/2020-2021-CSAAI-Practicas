
const canvas = document.getElementById('canvas');
const img1 = document.getElementById('imagesrc1');
const img2 = document.getElementById('imagesrc2');
const img3 = document.getElementById('imagesrc3');
const ctx = canvas.getContext('2d');
const bwButton = document.getElementById('b&w');
const rgbButton = document.getElementById('rgb');
const mirrorButton = document.getElementById('mirror');
const downButton = document.getElementById('down');
const noiseButton = document.getElementById('noise');
const redSlider = document.getElementById('redslider');
const redRange = document.getElementById('redrange');
const greenSlider = document.getElementById('greenslider');
const greenRange = document.getElementById('greenrange');
const blueSlider = document.getElementById('blueslider');
const blueRange = document.getElementById('bluerange');

let img = null;

window.onload = function(){
    img = img1;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.value = 255;
    greenSlider.value = 255;
    blueSlider.value = 255;
};

img1.onclick = function(){
    img = img1;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.value = 255;
    redRange.innerHTML = "255";
    greenSlider.value = 255;
    greenRange.innerHTML = "255";
    blueSlider.value = 255;
    blueRange.innerHTML = "255";
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;
}

img2.onclick = function(){
    img = img2;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.value = 255;
    redRange.innerHTML = "255";
    greenSlider.value = 255;
    greenRange.innerHTML = "255";
    blueSlider.value = 255;
    blueRange.innerHTML = "255";
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;

}

img3.onclick = function(){
    img = img3;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.value = 255;
    redRange.innerHTML = "255";
    greenSlider.value = 255;
    greenRange.innerHTML = "255";
    blueSlider.value = 255;
    blueRange.innerHTML = "255";
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;

}

bwButton.onclick = function(){
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (let i = 0; i < data.length; i+=4) {
        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        let gray = (3*r+4*g+b)/8;
        data[i] = data[i+1] = data[i+2] = gray;
    }
    ctx.putImageData(imgData, 0, 0);
    redSlider.disabled = true;
    greenSlider.disabled = true;
    blueSlider.disabled = true;
}

rgbButton.onclick = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;
}

function sliderFunction(data) {
    for (let i = 0; i < data.length; i+=4){
        if (data[i] > redSlider.value) {
            data[i] = redSlider.value;
        }
        if (data[i+1] > greenSlider.value) {
            data[i+1] = greenSlider.value;
        }
        if (data[i+2] > blueSlider.value) {
            data[i+2] = blueSlider.value;
        }
    }
}

redSlider.oninput = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    redRange.innerHTML = redSlider.value;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    sliderFunction(data);
    ctx.putImageData(imgData, 0 ,0);
}

greenSlider.oninput = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    greenRange.innerHTML = greenSlider.value;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    sliderFunction(data);
    ctx.putImageData(imgData, 0 ,0);
}

blueSlider.oninput = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    blueRange.innerHTML = blueSlider.value;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    sliderFunction(data);
    ctx.putImageData(imgData, 0 ,0);
}

mirrorButton.onclick = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    ctx.translate(img.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;
}

downButton.onclick = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    ctx.translate(0, img.height);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0,0, img.width, img.height);
    redSlider.disabled = false;
    greenSlider.disabled = false;
    blueSlider.disabled = false;
}

noiseButton.onclick = function(){
    ctx.drawImage(img, 0,0, img.width, img.height);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (let i = 0; i < data.length; i++){
        let m = 255 - data[i];
        let a = Math.floor(Math.random() * m);
        data[i] += a;
    }
    ctx.putImageData(imgData, 0 ,0);
    redSlider.disabled = true;
    greenSlider.disabled = true;
    blueSlider.disabled = true;
}
