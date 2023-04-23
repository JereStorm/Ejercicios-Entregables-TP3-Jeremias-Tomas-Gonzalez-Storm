"use strict";

const poster = document.getElementById("poster");

const height = poster.clientHeight;
const width = poster.clientWidth;

poster.addEventListener('mouseover', () => {

    poster.addEventListener('mousemove', (e) => cardEfect(e))

});

function cardEfect(e) {
    const { layerX, layerY } = e;

    const yRotation = ((layerX - width / 2) / width) * 40;
    const xRotation = ((layerY - height / 2) / height) * 40;

    const string = `
    perspective(500px)
    scale(1.2)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)
    `;

    poster.style.transform = string;
}

poster.addEventListener('mouseout', () => {
    poster.removeEventListener('mousemove', cardEfect)
    poster.style.transform = `
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)
    `;
})