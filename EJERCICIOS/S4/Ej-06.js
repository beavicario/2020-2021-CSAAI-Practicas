
//-- Manejador del evento click sobre el párrafo test
//-- Cada vez aue se hace click en el se invoca a esta funcion
function manejador_parrafo()
{
  console.log("Click sobre el párrafo...")
}

console.log("Ejecutando js...")

//-- Leer el párrafo identificado como test
const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón: que se ejecute la
//-- funcion manejador_parrafo()
test.onclick = manejador_parrafo;

// Función manejador_parrafo como un objeto,
// por eso NO usamos manejador_parrafo() con los paréntesis al final.
// Si se ponen los paréntesis lo que se hace es llamar a la función primero 
// y asignar a onclick el valor devuelto por ella.