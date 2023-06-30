"use strict"

function setDate() {

    let seg_hand = document.querySelector(".seg_hand");
    let min_hand = document.querySelector(".min_hand");
    let hour_hand = document.querySelector(".hour_hand");

    let currentDate = new Date();

    let seg = currentDate.getSeconds();
    let min = currentDate.getMinutes();
    let hour = currentDate.getHours();

    let ang_seg = ((seg / 60) * 360) + 90;

    let ang_min = ((min / 60) * 360) + ((seg / 60) * 6) + 90;

    if (hour > 12) {
        hour = hour - 12;
    }

    let ang_hour = ((hour / 12) * 360) + ((min / 60) * 30) + 90;

    seg_hand.style.transform = `rotate(${ang_seg}deg)`;

    min_hand.style.transform = `rotate(${ang_min}deg)`;

    hour_hand.style.transform = `rotate(${ang_hour}deg)`;
}

setInterval(setDate, 1000);

setDate();