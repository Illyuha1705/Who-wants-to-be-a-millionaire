"use strict";

const loader = document.querySelector('.loader');
const preplay = document.querySelector('.preplay');
const input = document.querySelector('.preplay-input');
const btn = document.querySelector('.preplay__start');
const questionWrapper = document.querySelector('.game__questions_wrapper');
loader.style.opacity = 0;

setTimeout(() => {
    preplay.style.display = 'block';
    loader.style.display = 'none';
}, 2500)

const interval = setInterval(() => {
    loader.style.opacity = parseFloat(loader.style.opacity) + 0.25;
    
    if(loader.style.opacity >= 1) {
        clearInterval(interval);
    }
}, 500);

btn.addEventListener('click', getUser);

function getUser() {
    let check = input.value;

    if(check) {
        localStorage.setItem(`user`, JSON.stringify(check));
        check = '';
        toggleDisplay('.preplay', '.game');
    }
}

function checkInput() {
    return Boolean(input.value);
}

function toggleDisplay(hide, show) {
    const hidden = document.querySelector(hide);
    const shown = document.querySelector(show);

    let checked = checkInput();
    console.log(checked);

    if(checked) {
        hidden.style.display = 'none';
        shown.style.display = 'block';
    }
}



const questions = [
    {
        id: 1,
        question: 'Как называется минимальная единица измерения информации?',
        answers: {
            a: {
                answer: 'бит',
                value: true
            },

            b: {
                answer: 'бита',
                value: false
            },

            c: {
                answer: 'битва',
                value: false
            },

            d: {
                answer: 'битник',
                value: false
            },
        }
    },

    {
        id: 2,
        question: 'Как называют новый проект, требующий вложений для развития?',
        answers: {
            a: {
                answer: 'старлей',
                value: false
            },

            b: {
                answer: 'стартер',
                value: false
            },

            c: {
                answer: 'старпом',
                value: false
            },

            d: {
                answer: 'стартам',
                value: true
            },
        }
    },

    {
        id: 3,
        question: 'По какому критерию Байкал – мировой рекордсмен среди озер?',
        answers: {
            a: {
                answer: 'глубина',
                value: true
            },

            b: {
                answer: 'площадь',
                value: false
            },

            c: {
                answer: 'ширина',
                value: false
            },

            d: {
                answer: 'температура',
                value: false
            },
        }
    },
]

function setQuestion() {
    questions.map(item => {
        questionWrapper.insertAdjacentHTML('beforeend', `
            <div class="game__question_box" style='display: none'>
                <div class="game__question">${item.question}</div>
            
                <div class="game__answers">
                    <button class="game__answer">${item.answers.a.answer}</button>
                    <button class="game__answer">${item.answers.b.answer}</button>
                    <button class="game__answer">${item.answers.c.answer}</button>
                    <button class="game__answer">${item.answers.d.answer}</button>
                </div>
            </div>
        `)
    })
}

setQuestion();
