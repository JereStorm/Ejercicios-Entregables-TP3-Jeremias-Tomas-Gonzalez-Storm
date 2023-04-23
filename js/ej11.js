"use strict";

const cards = document.getElementsByClassName("card");

const height = cards[0].clientHeight;
const width = cards[0].clientWidth;


function main() {

    for (const element of cards) {
        element.addEventListener('mouseover', () => {
            console.log('estoy arriba de la card');
            element.addEventListener('mousemove', (e) => cardEfect(e, element));
            element.addEventListener('mouseout', (e) => {
                element.removeEventListener('mousemove', cardEfect);
                cardEfectOut(e)
            });
        });
    };
}
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

