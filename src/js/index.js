"use strict";

const loader = document.querySelector('.loader')
loader.style.opacity = 1;

setTimeout(() => {
    const game = document.querySelector('.game');
    
    game.style.display = 'block';
    loader.style.display = 'none';
}, 2000)



const interval = setInterval(() => {
    loader.style.opacity -= 0.25;
    console.log(loader.style.opacity);
    if(loader.style.opacity <= 0) {
        clearInterval(interval);
    }
}, 500);
