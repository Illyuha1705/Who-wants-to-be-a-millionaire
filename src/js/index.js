"use strict";

const loader = document.querySelector('.loader');
const preplay = document.querySelector('.preplay');
const input = document.querySelector('.preplay-input');
const btn = document.querySelector('.preplay__start');
const questionWrapper = document.querySelector('.game__questions_wrapper');
const gameOver = document.querySelector('.game-over');
const levels = document.querySelectorAll('.game__level');
const exit = document.querySelector('.exit');
const exitBtn = document.querySelector('.game-over__btn');
const listArr = [...levels];
let localResults = {};

loader.style.opacity = 0;

setTimeout(() => {
    preplay.style.display = 'block';
    loader.style.display = 'none';
}, 2500)

const interval = setInterval(() => {
    loader.style.opacity = parseFloat(loader.style.opacity) + 0.25;

    if (loader.style.opacity >= 1) {
        clearInterval(interval);
    }
}, 500);

btn.addEventListener('click', getUser);

function getUser() {
    if (input.value) {
        localStorage.setItem(`user`, JSON.stringify(input.value));
        toggleDisplay('.preplay', '.game');
        input.value = '';
    }
}

function checkInput() {
    return Boolean(input.value);
}

function toggleDisplay(hide, show) {
    const hidden = document.querySelector(hide);
    const shown = document.querySelector(show);

    hidden.style.display = 'none';
    shown.style.display = 'block';
}

const DATA = [{
        question: 'Как называется минимальная единица измерения информации?',
        answers: [{
                answer: 'бит',
                value: true
            },

            {
                answer: 'бита',
                value: false
            },

            {
                answer: 'битва',
                value: false
            },

            {
                answer: 'битник',
                value: false
            },
        ]
    },

    {
        question: 'Как называют новый проект, требующий вложений для развития?',
        answers: [{
                answer: 'старлей',
                value: false
            },

            {
                answer: 'стартер',
                value: false
            },

            {
                answer: 'старпом',
                value: false
            },

            {
                answer: 'стартам',
                value: true
            },
        ]
    },

    {
        question: 'По какому критерию Байкал – мировой рекордсмен среди озер?',
        answers: [{
                answer: 'глубина',
                value: true
            },

            {
                answer: 'площадь',
                value: false
            },

            {
                answer: 'ширина',
                value: false
            },

            {
                answer: 'температура',
                value: false
            },
        ]
    },
]

function setQuestions(index = 0) {
    listArr[index].classList.add('current');

    const renderAnswers = () => {
        return DATA[index].answers.map(answer => {
            return `
                <button class="game__answer" data-value="${answer.value}">${answer.answer}</button>
            `
        }).join('');
    }

    questionWrapper.innerHTML = `  
        <div class="game__question_box" data-index="${index}">
            <div class="game__question">${DATA[index].question}</div>
        
            <div class="game__answers">
                ${renderAnswers()}
            </div>
        </div>
    `
}

setQuestions();

document.addEventListener('click', e => {
    if (e.target.classList.contains('game__answer')) {
        const index = document.querySelector('.game__question_box');
        const dataIndex = +index.dataset.index;

        if (e.target.dataset.value === 'false') {
            e.target.classList.add('incorrect');

            const showTrue = findTrue(dataIndex);
            const btns = document.querySelectorAll('.game__answer');

            setTimeout(() => {
                btns[showTrue].classList.add('correct');
            }, 2000);
            setTimeout(theEnd, 4000);
            
            
        } else {
            e.target.classList.add('correct');

            if(dataIndex < DATA.length) {
                listArr[dataIndex].classList.remove('current');
                listArr[dataIndex].classList.add('past');
                
                setTimeout(setQuestions, 2000, dataIndex + 1);
            }
        }
    }
})

function findTrue(index) {
    return DATA[index].answers.findIndex(item => item.value);
}

function theEnd() {
    gameOver.style.display = 'block';
}

exit.addEventListener('click', () => {
    theEnd();
})

exitBtn.addEventListener('click', () => {
    gameOver.style.display = 'none';
    toggleDisplay('.game', '.preplay');
    setQuestions();
    listArr.forEach(item => {
        item.classList.remove('current');
        item.classList.remove('past');
    })
})