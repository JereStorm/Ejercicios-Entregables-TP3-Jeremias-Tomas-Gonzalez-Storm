"use strict";

let items = document.getElementsByClassName("lista").lista.children;

let counter = 0;

let itemActivo = items[counter];

window.addEventListener('keydown', (e) => {

    if (e.key == 'ArrowUp') {

    }
    else if (e.key == 'ArrowDown') {
    }
    else if (e.key == 'ArrowLeft') {
        counter--;
        itemActivo.classList.remove("active")
        if (counter < 0) {
            counter = items.length - 1;
            itemActivo = items[counter];

        } else {
            itemActivo = items[counter];
        }

        console.log(itemActivo)
        itemActivo.classList.add("active")

    }
    else if (e.key == 'ArrowRight') {
        counter++;
        itemActivo.classList.remove("active")
        if (counter > items.length - 1) {
            counter = 0;
            itemActivo = items[counter];

        } else {
            itemActivo = items[counter];
        }

        console.log(itemActivo)
        itemActivo.classList.add("active")

    }
})

