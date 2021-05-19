
La práctica 1 consta de el CV de Jane Goodall, una etóloga famosa por ser pionera en el estudio de los chimpancés salvajes.

Puedes visualizar la práctica desde la siguiente URL: https://beavicario.github.io/2020-2021-CSAAI-Practicas/P1/CV/

El desarrollo de esta página está compuesto por un HTML y una hoja de estilo CSS.

La estructura del HTML se forma por una cabecera con el título de la página, y el enlace que relaciona el HTML con el CSS, y un cuerpo.
En el cuerpo, tenemos un una sección genérica de tipo bloque 'div' principal, con el identificador 'contenido'. Y dentro de ella otras dos secciones de tipo bloque secundarias 'div' con los identificadores 'sección' y 'datos'.

Cada apartado de nuestro CV se divide en cajas o bloques 'fieldset'. 
Dentro de 'sección' tenemos un bloque con una introducción sobre estudios de Jane Goodall, otro bloque sobre su vida personal y un último bloque con su condecoraciones. Todos los encabezado de título van acompañados de una imagen.

Los bloques de 'Vida Personal' y 'Condecoraciones' están formados por listas no ordenadas. Mientras que el bloque de 'Jane Goodall' se estructura en un encabezado con el titulo de la caja, otro encabezado de mayor profundidad de sus estudios y una sección tipo bloque que pertenece a la clase 'comentario' con un texto marcado con un estilo en cursiva 'i' que contiene una cita de la propia Jane Goodall. 

Cada apartado de la lista no ordenada del bloque 'Vida Personal' contiene dos encabezados de distinta profundidad con el lugar y el cargo que desempeñó, y una sección tipo bloque que pertenece a la clase 'comentario' con un texto sobre el proyecto que desarrolló. 

En la sección de 'datos' tenemos una caja con una imagen de Jane Goodall seguido de un audio y algunos de sus datos personales (lugar y fecha de nacimiento y correo) y dos enlaces, uno que te direcciona al Github y otro para descargar en PDF el CV.

En cuestiones de estilo, tenemos un fondo con una imagen de la selva y cada caja 'fielset' con un color de fondo blanco. A continuación tenemos los tres identificadores (contenido, datos y sección), con el identificador 'contenido' establecemos el ancho en píxeles, que luego se dividirá entre 'sección' y 'datos' mediante porcentaje, y el margen. Además en los identificadores 'sección' y 'datos' hemos declarado la opacidad para poder visualizar la imagen de fondo de la selva a través de las cajas. 

Por último tenemos la clase 'comentario' con un margen del 10%, y la clase 'perfil' con un margen izquierdo, un relleno, un ancho y un borde negro.

En esta carpeta P1 también puedes encontrar los ejercicios de las sesiones de teoría y Laboratorios de la asignatura.