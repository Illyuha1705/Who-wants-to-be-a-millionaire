"use strict";

const loader = document.querySelector('.loader');
const preplay = document.querySelector('.preplay');
const input = document.querySelector('.preplay-input');
const btn = document.querySelector('.preplay__start');
const questionWrapper = document.querySelector('.game__questions_wrapper');
const gameOver = document.querySelector('.game-over');
const levels = document.querySelectorAll('.game__level');
const exit = document.querySelector('.exit');
const goToLobby = document.querySelector('.game-over__btn');
const timer = document.querySelector('.timer');
const prize = document.querySelector('.game-over__prize');
const step = document.querySelector('.game-over__sum');
const finalMes = document.querySelector('.game-over__finalMes');
const winnersList = document.querySelector('.preplay__winners_list');
const friendCallMode = document.querySelector('.header__call');
const pluralClickMode = document.querySelector('.header__fifty');
const deleteTwoAnswersMode = document.querySelector('.header__cross');

const listArr = [...levels];
let pluralClick = false;
let users = [];
let time;
let localResults = {};

loader.style.opacity = 0;

setTimeout(() => { // loader
    preplay.style.display = 'block';
    loader.style.display = 'none';
}, 2500)

const interval = setInterval(() => {
    loader.style.opacity = parseFloat(loader.style.opacity) + 0.25;

    if (loader.style.opacity >= 1) {
        clearInterval(interval);
    }
}, 500);

function getUser() {
    if (input.value) {
        localStorage.setItem(`user`, JSON.stringify(input.value));
        setQuestions();
        toggleDisplay('.preplay', '.game');
        input.value = '';
    }
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
                answer: 'стартап',
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

    {
        question: 'Чем атакует врагов Саб-Зиро, герой игры «Mortal kombat»?',
        answers: [{
                answer: 'огнем',
                value: false
            },

            {
                answer: 'молниями',
                value: false
            },

            {
                answer: 'льдом',
                value: true
            },

            {
                answer: 'паутиной',
                value: false
            },
        ]
    },

    {
        question: 'Группа из какой страны в 2021 году выиграла?',
        answers: [{
                answer: 'Франция',
                value: false
            },

            {
                answer: 'Италия',
                value: true
            },

            {
                answer: 'Мальта',
                value: false
            },

            {
                answer: 'Исландия',
                value: false
            },
        ]
    },

    {
        question: 'В каком оскароносном фильме 2020 года сыграло много непрофессиональных актеров?',
        answers: [{
                answer: '"Минари"',
                value: false
            },

            {
                answer: '"Отец"',
                value: false
            },

            {
                answer: '"Земля кочевников"',
                value: true
            },

            {
                answer: '"Манк"',
                value: false
            },
        ]
    },

    {
        question: 'Бочонок лото с каким номером имеет прозвище «перчатки»?',
        answers: [{
                answer: '44',
                value: false
            },

            {
                answer: '55',
                value: true
            },

            {
                answer: '66',
                value: false
            },

            {
                answer: '99',
                value: false
            },
        ]
    },

    {
        question: 'Кто озвучивал черного кота в мультфильме «Котенок по имени Гав»?',
        answers: [{
                answer: 'Владимир Высоцкий',
                value: false
            },

            {
                answer: 'Геннадий Хазанов',
                value: false
            },

            {
                answer: 'Олег Табаков',
                value: false
            },

            {
                answer: 'Василий Ливанов',
                value: true
            },
        ]
    },

    {
        question: 'Обладателем чего случайно стал главный герой романа «Щегол»?',
        answers: [{
                answer: 'картины',
                value: true
            },

            {
                answer: 'скульптуры',
                value: false
            },

            {
                answer: 'рукописи',
                value: false
            },

            {
                answer: 'скрипки',
                value: false
            },
        ]
    },

    {
        question: 'Какой, по утверждению очевидцев, стала на сутки вода в Москве-реке весной 1908 года?',
        answers: [{
                answer: 'морской',
                value: false
            },

            {
                answer: 'сладкой',
                value: true
            },

            {
                answer: 'газированной',
                value: false
            },

            {
                answer: 'дистиллированной',
                value: false
            },
        ]
    },

    {
        question: 'В чьей лаборатории снят первый в истории звуковой киноролик?',
        answers: [{
                answer: 'Томаса Эдисона',
                value: true
            },

            {
                answer: 'Николы Теслы',
                value: false
            },

            {
                answer: 'Александра Белла',
                value: false
            },

            {
                answer: 'Вильгельма Рентгена',
                value: false
            },
        ]
    },

    {
        question: 'Какой из этих грибов семейства шампиньоновых ядовитый?',
        answers: [{
                answer: 'дождевик шиповатый',
                value: false
            },

            {
                answer: 'зонтик пестрый',
                value: false
            },

            {
                answer: 'зонтик каштановый',
                value: true
            },

            {
                answer: 'шампиньон перелесковый',
                value: false
            },
        ]
    },

    {
        question: 'Какой предмет стал причиной смерти французского композитора Жан-Батиста Люлли?',
        answers: [{
                answer: 'дирижёрская трость',
                value: true
            },

            {
                answer: 'струна рояля',
                value: false
            },

            {
                answer: 'гусиное перо',
                value: false
            },

            {
                answer: 'смычок скрипки',
                value: false
            },
        ]
    },

    {
        question: 'Что не умеют делать ящерицы гекконы?',
        answers: [{
                answer: 'ловить рыбу',
                value: true
            },

            {
                answer: 'ходить по потолку',
                value: false
            },

            {
                answer: 'менять цвет',
                value: false
            },

            {
                answer: 'менять цвет',
                value: false
            },
        ]
    },

    {
        question: 'Какой химический элемент назван в честь злого подземного гнома?',
        answers: [{
                answer: 'Гафний',
                value: true
            },

            {
                answer: 'Кобальт',
                value: false
            },

            {
                answer: 'Бериллий',
                value: false
            },

            {
                answer: 'Теллур',
                value: false
            },
        ]
    },
]

function displayQuestion(questions, index) {
    const renderAnswers = () => {
        return questions.map(answer => {
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

function setQuestions(index = 0) {
    setTimer();
    listArr[index].classList.add('current'); // shows current step

    displayQuestion(DATA[index].answers, index);
}

btn.onclick = getUser; // start game

function findTrue(index) {
    return DATA[index].answers.findIndex(item => item.value);
}

function enableModes(...modes) {
    modes.forEach(mode => mode.style.pointerEvents = 'auto');
    modes.forEach(mode => mode.childNodes[1].style.boxShadow = '2px 2px 10px #8b00ff, -2px -2px 10px #8b00ff');
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('game__answer')) {
        const question = document.querySelector('.game__question_box');
        const index = +question.dataset.index;

        if (e.target.dataset.value === 'false') {
            e.target.classList.add('incorrect');
            if(pluralClick) { // if we use plural mode
                pluralClick = false;
                pluralClickMode.style.pointerEvents = 'none';
                return
            }

            clearInterval(time);

            const trueAnswerIndex = findTrue(index);
            const btns = document.querySelectorAll('.game__answer');

            setTimeout(() => {
                btns[trueAnswerIndex].classList.add('correct');
            }, 2000);
            setTimeout(theEnd, 4000);

        } else {
            e.target.classList.add('correct');
            clearInterval(time);

            if (index + 1 === DATA.length) theEnd();

            if (index + 1 < DATA.length) {
                listArr[index].classList.remove('current');
                listArr[index].classList.add('past');

                setTimeout(setQuestions, 2000, index + 1);
            }
        }
    }
})

function theEnd() {
    gameOver.style.display = 'block';

    const question = document.querySelector('.game__question_box');
    const index = +question.dataset.index;
    const user = localStorage.getItem(`user`);
    let level = +listArr[index].dataset.level;
    let sum = 0;
    let speach = 'Ну вы пытались... Попробуйте ещё раз)';

    if (index > 4 && index <= 9) sum = 1000;
    if (index >= 10 && index <= 13) sum = 32000;
    if (index === 14) {
        sum = 1000000;
        speach = 'Поздравляем с победой. Забирайте Ваши деньги!))'
    }

    prize.textContent = `${user}, Ваш выигрыш - ${sum}`;
    step.textContent = `Вы остановились на сумме в ${level}`;
    finalMes.textContent = speach;

    clearInterval(time);

    let indexOfExistsUser = users.findIndex(foundUser => foundUser.name === user);
    
    if(indexOfExistsUser === -1) {
        users.unshift({
            name: user,
            score: level
        });
    } else {
        users[indexOfExistsUser].score = level;
    }
    
    winnersList.innerHTML = '';
    users.forEach(user => {
        winnersList.insertAdjacentHTML('beforeend', `
            <div class="preplay__about_winner" data-userName="${JSON.parse(user.name)}">
                <div class="user-name">${JSON.parse(user.name)}</div>
                <div class="user-score">${user.score}</div>
            </div>
        `)
    })

    enableModes(friendCallMode, pluralClickMode, deleteTwoAnswersMode);
}

exit.onclick = theEnd;

goToLobby.onclick = function() {
    gameOver.style.display = 'none';
    toggleDisplay('.game', '.preplay');

    listArr.forEach(item => {
        item.classList.remove('current');
        item.classList.remove('past');
    })
}

function setTimer() {
    timer.style.color = '#11bbe7';
    timer.textContent = 30;
    let seconds = 30;
    time = setInterval(() => {
        seconds--;

        if (seconds < 0) {
            clearInterval(time);
            theEnd();

        } else if (seconds < 11) {
            timer.style.color = 'red';
            timer.textContent = seconds;

        } else {
            timer.textContent = seconds;
        }
    }, 1000)
}

preplay.onclick = e => { // sets input value from winners list
    if(e.target.classList.contains('preplay__about_winner')) {        
        input.value = e.target.dataset.username; 
    }
};

friendCallMode.onclick = () => {
    const btns = document.querySelectorAll('.game__answer');
    const randomIndex = Math.floor(Math.random()*btns.length);

    btns[randomIndex].classList.add('friendSaid');  
    friendCallMode.childNodes[1].style.boxShadow = 'none';
    friendCallMode.style.pointerEvents = 'none';

    setTimeout(() => {
        btns[randomIndex].classList.remove('friendSaid');
    }, 1500);
}; 

pluralClickMode.onclick = function() {
    pluralClickMode.childNodes[1].style.boxShadow = 'none';
    pluralClick = true;
}

deleteTwoAnswersMode.onclick = function() {
    const question = document.querySelector('.game__question_box');
    const index = +question.dataset.index;
    const correctAnswer = DATA[index].answers.find(answer => answer.value);
    const filteredAnswers = [correctAnswer];
    const incorrectAnswers = DATA[index].answers.filter(answer => !answer.value);

    filteredAnswers.push(incorrectAnswers[Math.floor(Math.random()*incorrectAnswers.length)]);

    displayQuestion(filteredAnswers, index);
    deleteTwoAnswersMode.childNodes[1].style.boxShadow = 'none';
    deleteTwoAnswersMode.style.pointerEvents = 'none';
}