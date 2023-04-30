"use strict";

const CANT_HOUR = 12;
const CANT_MIN = 60;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const centerClock = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
}

let radius = 250;

let currentDate = new Date();

let counter_seg = currentDate.getSeconds();
let counter_hour = currentDate.getHours();
let counter_min = currentDate.getMinutes();

if (counter_hour > 12) {
    counter_hour = counter_hour - 12;
}

// ---------------------------------------------
// CONTEXT SETTINGS
// ---------------------------------------------

ctx.translate(centerClock.x, centerClock.y);
ctx.font = radius * 0.15 + "px arial";
//Alineación del texto en el centro y en el centro de la posición de impresión
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.lineWidth = 2;


// ---------------------------------------------
// INTERVAL DEFAULT
// ---------------------------------------------

setInterval(() => {
    main();
    counter_seg++;
}, 1000)

/**
 * Funcion encargada de limpiar el canvas, controlar el "paso del tiempo", y hacer uso implicito
 * de la funcion drawClock()
 */
function main() {
    ctx.clearRect(0 - centerClock.x, 0 - centerClock.y, canvasWidth, canvasHeight);

    if (counter_seg == 60) {
        counter_min++;
        counter_seg = 0;
    }
    if (counter_min == 60) {
        counter_min = 0;
        counter_seg = 0;
        counter_hour++;
    }
    if (counter_hour == 24) {
        counter_hour = 0;
        counter_min = 0;
        counter_seg = 0;
    }
    drawClock();
}

/**
 * Funcion encargada de dibujar el ciruculo que respresentara el contorno del reloj
 * asi como implicitamente se encargara de dibujar los numeros y lineas correspondiente a las horas...
 */
function drawClock() {

    //Dibujo el controno del reloj
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    //Dibujo el centro del reloj.
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    //Dibujo las horas
    drawHourNumbers();

    //Dibujo los minutos
    drawMin();

    //Calculo los angulos en base a las variables horarias
    let ang_seg = counter_seg * Math.PI / 30;
    let ang_min = counter_min * Math.PI / 30;
    let ang_hour = counter_hour * Math.PI / 6;

    //Dibujo las agujas del reloj
    drawClockHand("red", ang_seg, radius);
    drawClockHand("black", ang_min, radius * 0.5, 2);
    drawClockHand("black", ang_hour, radius * 0.3, 4);
}
/**
 * Funcion encargada de calcular la posicon donde se dibujara la aguja
 * del reloj a partir de los siguientes parametros: 
 * 
 * @param string color 
 * @param number ang 
 * @param number length 
 * @param number posHand 
 * 
 * Donde implicitamente llamaremos a drawHand() pasandole
 * los siguientes parametros:
 * color: string
 * length: number
 */
function drawClockHand(color, ang, length, posHand = 1) {
    ctx.rotate(ang);
    ctx.translate(0, -radius / posHand);
    drawHand(color, length);
    ctx.rotate(-ang);
    ctx.rotate(ang);
    ctx.translate(0, radius / posHand);
    ctx.rotate(-ang);
}


/**
 * Funcion encargada de dibujar una aguja dando uso de los siguientes parametro recibidos:
 * @param string color 
 * @param number length 
 */
function drawHand(color, length) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.strokeStyle = color;
    ctx.lineTo(0, length);
    ctx.stroke();
    ctx.closePath();
}
/**
 * Metodo encargado de dibujar las lineas del reloj con un largo correspondientes a
 * los parametros esperados startY, endY 
 */
function drawLine(startY, endY) {
    ctx.beginPath();
    ctx.moveTo(0, startY);
    ctx.lineTo(0, endY);
    ctx.stroke();
    ctx.closePath();
}
/**
 * Metodo encargado de calcular la posición de impresion de los números.
 * A un 85% del radio,rotado pi/6 por cada número de la hora.
 * 
 * Impicitamentente dibujamos a su ves las lineas correspondientes a la hora
 * con la funcion drawLine().
 */
function drawHourNumbers() {
    let num, ang;
    const radius_hour = radius * 0.85;

    for (num = 1; num <= CANT_HOUR; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius_hour);
        drawLine(-35, -25);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius_hour);
        ctx.rotate(-ang);
    }
}

/**
 * Metodo encargado de calcular la posición de impresion
 * de las lineas correspondientes a los minutos.
 * rotado pi / 30 por cada minuto.
 * Impicitamentente dibujamos a su ves las lineas correspondientes a la hora
 * con la funcion drawLine().
 */
function drawMin() {
    let num, ang;
    let radius_min = radius;
    for (num = 1; num <= CANT_MIN; num++) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius_min);
        drawLine(0, 6);
        ctx.rotate(-ang);
        ctx.rotate(ang);
        ctx.translate(0, radius_min);
        ctx.rotate(-ang);
    }
}



