"use strict";

const loader = document.querySelector('.loader');
loader.style.opacity = 0;

/* setTimeout(() => {
    const game = document.querySelector('.game');
    
    game.style.display = 'block';
    loader.style.display = 'none';
}, 2500) */

setTimeout(() => {
    const preplay = document.querySelector('.preplay');
    
    preplay.style.display = 'block';
    loader.style.display = 'none';
}, 2500)

const interval = setInterval(() => {
    loader.style.opacity = parseFloat(loader.style.opacity) + 0.25;
    
    if(loader.style.opacity <= 0) {
        clearInterval(interval);
    }
}, 500);

function getUser() {
    const input = document.querySelector('.preplay-input');
    const btn = document.querySelector('.preplay__start');

    btn.addEventListener('click', () => {
        localStorage.setItem(`user`, JSON.stringify(input.value));
        input.value = '';
    })

}

getUser();


