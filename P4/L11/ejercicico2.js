console.log("Ejecutando JavaScript...");

/* Obtener elementos del DOM */

const canvas = document.getElementById("canvas");
const img = document.getElementById("imagesrc");
const ctx = canvas.getContext("2d");

/* Acceso al Ddeslizador */

const deslizador = document.getElementById("deslizador");

const R = document.getElementById('R');
const G = document.getElementById('R');
const B = document.getElementById('R');

/* Valor del deslizador */

const rRange = document.getElementById('Rrange');
const gRange = document.getElementById('Grange');
const bRange = document.getElementById('Brange');

/* Función de retrollamada de la imagen cargada. */
/* La imagen no se carga instantaneamente, sino que lleva un tiempo. Solo podemos acceder a ella una vez que este totalmente cargada. */

img.onload = function () {

    /* Se establece como tamaño del canvas, el mismo que el de la imagen original. */

    canvas.width = img.width;
    canvas.height = img.height;

    /* Situar la imgen original en el canvas. No se han hecho manipulaciones todavia. */

    ctx.drawImage(img, 0, 0);

    console.log("Imagen lista...");
};

/* Función de retrollamada del deslizador. */

R.oninput = () => {

    /* Mostrar el nuevo valor del deslizador */
    rRange.innerHTML = R.value;

    /* Situar la imagen original en el canvas. */
    /* No se han hecho manipulacione todavia. */

    ctx.drawImage(img, 0, 0);

    /* Obtener la imagen del canvas en pixeles. */
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* Obtener el array con todos los pixeles. */

    let data = imgData.data;

    /* Obtener el umbral de R del deslizador */

    rUmbral = R.value;

    /* Filtrar la imagen según el nuevo umbral. */

    for (let i = 0; i < data.length; i += 4){
        if (data[i] > umbral){
            data[i] = rUmbral;
        }
    }

    /* Poner la imagen modificada en el canvas. */
    ctx.putImageData(imgData, 0, 0);
}

/* Función de retrollamada del deslizador. */

G.oninput = () => {

    /* Mostrar el nuevo valor del deslizador */
    gRange.innerHTML = G.value;

    /* Situar la imagen original en el canvas. */
    /* No se han hecho manipulacione todavia. */

    ctx.drawImage(img, 0, 0);

    /* Obtener la imagen del canvas en pixeles. */
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* Obtener el array con todos los pixeles. */

    let data = imgData.data;

    /* Obtener el umbral de G del deslizador */

    gUmbral = G.value;

    /* Filtrar la imagen según el nuevo umbral. */

    for (let i = 0; i < data.length; i += 4){
        if (data[i+1] > gUmbral){
            data[i+1] = gUmbral;
        }
    }

    /* Poner la imagen modificada en el canvas. */
    ctx.putImageData(imgData, 0, 0);
}

/* Función de retrollamada del deslizador. */

B.oninput = () => {

    /* Mostrar el nuevo valor del deslizador */
    bRange.innerHTML = B.value;

    /* Situar la imagen original en el canvas. */
    /* No se han hecho manipulacione todavia. */

    ctx.drawImage(img, 0, 0);

    /* Obtener la imagen del canvas en pixeles. */
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    /* Obtener el array con todos los pixeles. */

    let data = imgData.data;

    /* Obtener el umbral de A del deslizador */

    bUmbral = B.value;

    /* Filtrar la imagen según el nuevo umbral. */

    for (let i = 0; i < data.length; i += 4){
        if (data[i+2] > bUmbral){
            data[i+2] = bUmbral;
        }
    }

    /* Poner la imagen modificada en el canvas. */
    ctx.putImageData(imgData, 0, 0);
}

console.log("Fin...");