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
const timer = document.querySelector('.timer');
const prize = document.querySelector('.game-over__prize');
const step = document.querySelector('.game-over__sum');
const finalMes = document.querySelector('.game-over__finalMes');
const winnersList = document.querySelector('.preplay__winners_list');
const friendCall = document.querySelector('.header__call');
const pluralClickMode = document.querySelector('.header__fifty');
const deleteTwoAnswers = document.querySelector('.header__cross');
const listArr = [...levels];
let pluralClick = false;
let users = [];
let time;
let localResults = {};

loader.style.opacity = 0;

setTimeout(() => {
    preplay.style.display = 'block';
    loader.style.display = 'none';
}, 200)

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
        setQuestions();
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

function setQuestions(index = 0) {
    setTimer();
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



document.addEventListener('click', e => {
    if (e.target.classList.contains('game__answer')) {
        const index = document.querySelector('.game__question_box');
        const dataIndex = +index.dataset.index;

        if (e.target.dataset.value === 'false') {
            e.target.classList.add('incorrect');
            if(pluralClick) {
                pluralClick = false;
                pluralClickMode.style.pointerEvents = 'none';
                return
            }
            clearInterval(time);

            const showTrue = findTrue(dataIndex);
            const btns = document.querySelectorAll('.game__answer');

            setTimeout(() => {
                btns[showTrue].classList.add('correct');
            }, 2000);
            setTimeout(theEnd, 4000);


        } else {
            e.target.classList.add('correct');
            clearInterval(time);

            if (dataIndex === DATA.length - 1) theEnd();

            if (dataIndex < DATA.length - 1) {
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

    const index = document.querySelector('.game__question_box');
    const dataIndex = +index.dataset.index;
    const user = localStorage.getItem(`user`);
    let level = +listArr[dataIndex].dataset.level;
    let sum = 0;
    let speach = 'Ну вы пытались... Попробуйте ещё раз)';

    if (dataIndex > 4 && dataIndex <= 9) sum = 1000;
    if (dataIndex >= 10 && dataIndex <= 13) sum = 32000;
    if (dataIndex === 14) {
        sum = 1000000;
        speach = 'Поздравляем с победой. Забирайте Ваши деньги!))'
    }

    prize.textContent = `${user}, Ваш выигрыш - ${sum}`;
    step.textContent = `Вы остановились на сумме в ${level}`;
    finalMes.textContent = speach;

    clearInterval(time);

    let checkIfExists = users.find(foundUser => foundUser.name === user);
    
    if(!checkIfExists) {
        users.push({
            name: user,
            score: level
        });
    }

    console.log(users);
    
    winnersList.innerHTML = '';
    users.forEach(user => {
        winnersList.insertAdjacentHTML('beforeend', `
            <div class="preplay__about_winner" data-userName="${JSON.parse(user.name)}">
                <div class="user-name">${JSON.parse(user.name)}</div>
                <div class="user-score">${user.score}</div>
            </div>
        `)
    })
}

exit.addEventListener('click', () => {
    theEnd();
})

exitBtn.addEventListener('click', () => {
    gameOver.style.display = 'none';
    toggleDisplay('.game', '.preplay');
    listArr.forEach(item => {
        item.classList.remove('current');
        item.classList.remove('past');
    })
})

function setTimer() {
    timer.style.color = '#11bbe7';
    timer.textContent = 30;
    let i = 30;
    time = setInterval(() => {
        i--;

        if (i < 0) {
            clearInterval(time);
            theEnd();

        } else if (i < 11) {
            timer.style.color = 'red';
            timer.textContent = i;

        } else {
            timer.textContent = i;
        }
    }, 1000)
}

preplay.addEventListener('click', e => {
    if(e.target.classList.contains('preplay__about_winner')) {        
        input.value = e.target.dataset.username; 
    }
});

friendCall.addEventListener('click', () => {
    const btns = document.querySelectorAll('.game__answer');
    btns[Math.floor(Math.random()*btns.length)].classList.add('friendSaid');  
    friendCall.style.pointerEvents = 'none';
}); 

pluralClickMode.onclick = function() {
    pluralClick = true;
}

deleteTwoAnswers.onclick = function() {
    const index = document.querySelector('.game__question_box');
    const dataIndex = +index.dataset.index;


    for(let i = 0; i < DATA[dataIndex].answers.length; i++) {
        if(!DATA[dataIndex].answers[i].value && DATA[dataIndex].answers.length > 1) {
            DATA[dataIndex].answers.splice(i, 1);
        }
    }
    const renderAnswers = () => {
        return DATA[dataIndex].answers.map(answer => {
            return `
                <button class="game__answer" data-value="${answer.value}">${answer.answer}</button>
            `
        }).join('');
    }

    questionWrapper.innerHTML = `  
        <div class="game__question_box" data-index="${dataIndex}">
            <div class="game__question">${DATA[dataIndex].question}</div>
        
            <div class="game__answers">
                ${renderAnswers()}
            </div>
        </div>
    `
    deleteTwoAnswers.style.pointerEvents = 'none';

}