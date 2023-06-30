"use strict";

const cards = document.querySelectorAll(".card");

const height = cards[0].clientHeight;
const width = cards[0].clientWidth;

/**
 * Funcion por defecto que escucha los elementos del DOM pertinentes
 * y prepara los eventos de su comportamiento
 */
function main() {

    for (const element of cards) {
        element.addEventListener('mouseover', () => {
            element.addEventListener('mousemove', (e) => cardEfect(e));
            element.addEventListener('mouseout', (e) => {
                element.removeEventListener('mousemove', cardEfect);
                cardEfectOut(e)
            });
        });
    };
}

/**
 * Funcion encargada de resetear los estilos del elemento segun corresponda
 * 
 * Params recibidos: 
 * - e: Event
 */
function cardEfectOut(e) {

    let card = e.target;
    const style_defect = `
            perspective(300px)
            scale(1)
            rotateX(0)
            rotateY(0)
            `;
    card.style.transition = 'box-shadow .2s,transform .5s';
    card.style.transform = style_defect;
}

/**
 * Funcion encargada de aplicar los efectos necesarios para animar el elemento del DOM correspondiente
 * en funcion de la posicion actual del mouse
 * 
 * Paramentros recibidos:
 * - e: Event
 */
function cardEfect(e) {
    let card = e.target;
    const { layerX, layerY } = e;

    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - height / 2) / height) * 20;

    const card_style = `
    perspective(300px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)
    `;

    card.style.transition = 'box-shadow .2s, transform';
    card.style.transform = card_style;
}

