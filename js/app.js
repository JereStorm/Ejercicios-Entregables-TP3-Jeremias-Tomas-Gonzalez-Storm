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


//Traslada la posición(0,0) al centro del reloj.
ctx.translate(centerClock.x, centerClock.y);

//Font size (15% del radio)
ctx.font = radius * 0.15 + "px arial";

//Alineación del texto en el centro y en el centro de la posición de impresión
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.lineWidth = 2;


/**
 * Cuando la pagina carga...
 */
function main() {
    ctx.clearRect(0 - centerClock.x, 0 - centerClock.y, canvasWidth, canvasHeight);



    if (counter_seg == 60) {
        counter_min++;
        counter_seg = 1;
    }
    if (counter_min == 60) {
        counter_min = 0;
        counter_seg = 1;
        counter_hour++;
    }
    if (counter_hour == 24) {
        counter_hour = 0;
        counter_min = 0;
        counter_seg = 1;
    }
    drawClock();
    console.log(counter_hour, counter_min, counter_seg);

    setTimeout(() => {
        main();
        counter_seg++;
    }, 1000)

}

/**
 * Funcion encargada de dibujar el ciruculo que respresentara el contorno del reloj
 * asi como implicitamente se encargara de dibujar los numeros y lineas correspondiente a las horas...
 */
function drawClock() {

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();

    //Circulo en el centro del reloj.
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();


    drawHourNumbers();
    drawMin();

    drawClockSecHand();
    drawClockMinHand();
    drawClockHourHand();

}



function drawClockSecHand() {
    let ang = counter_seg * Math.PI / 30;
    ctx.rotate(ang);
    ctx.translate(0, -radius);
    drawHand("red", radius)
    ctx.rotate(-ang);
    ctx.rotate(ang);
    ctx.translate(0, radius);
    ctx.rotate(-ang);
}
function drawClockMinHand() {
    let ang = counter_min * Math.PI / 30;
    ctx.rotate(ang);
    ctx.translate(0, -radius / 2);
    drawHand("black", radius * 0.5)
    ctx.rotate(-ang);
    ctx.rotate(ang);
    ctx.translate(0, radius / 2);
    ctx.rotate(-ang);
}
function drawClockHourHand() {
    let ang = counter_hour * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius / 4);
    drawHand("black", radius * 0.3);

    ctx.rotate(-ang);
    ctx.rotate(ang);
    ctx.translate(0, radius / 4);
    ctx.rotate(-ang);
}


function drawHand(color, length) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.strokeStyle = color;
    ctx.lineTo(0, length);
    ctx.stroke();
}

function drawLineHour() {

    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(0, -25);
    ctx.stroke();
}

function drawLineMin() {

    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(0, -18);
    ctx.stroke();
}

function drawHourNumbers() {
    let ang;
    let num;

    //Calcular la posición de impresion de los números.
    // 85% del radio,rotado pi/6 por cada número.
    const radius_hour = radius * 0.85;
    for (num = 1; num <= CANT_HOUR; num++) {
        ang = num * Math.PI / 6;

        ctx.rotate(ang);
        ctx.translate(0, -radius_hour);
        drawLineHour();
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius_hour);
        ctx.rotate(-ang);
    }
}

function drawMin() {
    let num;
    let ang;
    let radius_min = radius * 0.90;
    for (num = 1; num <= CANT_MIN; num++) {
        ang = num * Math.PI / 30;

        ctx.rotate(ang);
        ctx.translate(0, -radius_min);
        drawLineMin();
        ctx.rotate(-ang);
        ctx.rotate(ang);
        ctx.translate(0, radius_min);
        ctx.rotate(-ang);
    }
}



