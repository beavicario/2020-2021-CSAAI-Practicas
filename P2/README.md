
La P2 se trata de una calculadora básica.

Puedes visualizar la práctica desde la siguiente URL: https://beavicario.github.io/2020-2021-CSAAI-Practicas/P2/CALC/

La estructura de nuestro desarrollo consta de tres ficheros: un HTML que da estructura, un JS que implementa acciones y un CSS que da estilo.

HTML.
El fichero 'index.html' está formado por una sección principal de tipo bloque 'div', de la clase 'container' y varias secciones secundarias de tipo bloque 'div', de la clase 'line'. Cada uno de estos 'div' secundarios corresponden a una línea en la calculadora. 
Los botones que implementamos son los dígitos del 0 al 9 y los símbolos de sumar, restar, multiplicar, dividir, elevar y porcentaje.
Además se añaden los botones de igual, decimal '.', reinicio 'AC' y borrar dígito 'DEL'.

JS.
En el fichero 'main.js' se declaran todas las teclas del HTML para poder realizar las operaciones.

Añadimos una máquina de estados, para saber que teclas se pueden pulsar en cada momento. En este estado inicial, las entradas de operadores se ignoran, sólo se pasa de un estado a otro cuando se reciben entradas. Se introduce el valor del 'op1', el operando y el valor del 'op2'. El valor resultante de 'op1' y 'op2' al pulsar la tecla '=' te lleva al estado final.
En cualquier momento, si se pulsa la tecla 'AC', se vuelve al estado inicial. 
Además hemos creado un estado 'old' por si es necesario volver al estado anterior, este caso se puede dar pulsando la tecla 'DEL'.
Por último el decimal '.' se desarrolla de manera que SÓLO puede utilizarse en 'op1' y 'op2'.

Por último se implementan los valores de los números y de los operando.

Todos los valores que contienen la tecla pulsada se visualizan en el display.

CSS.
En el 'master.css' le damos estilo a la calculadora, al display y a las teclas dentro de un fondo de color blanco.

En esta carpeta P2 también puedes encontrar los ejercicios de las sesiones de teoría y Laboratorios de la asignatura.