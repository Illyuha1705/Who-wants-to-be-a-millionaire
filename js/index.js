"use strict";

const questions = {
    1: 'Как называют манекенщицу супер-класса?',
    2: 'Кто вырос в джунглях среди диких зверей?',
    3: 'Как называлась детская развлекательная программа, популярная в прошлые годы?',
};

const answer1 = {
    a: 'Топ-модель',
    b: 'Тяп-модель',
    c: 'Поп-модель',
    d: 'Ляп-модель',
}

const answer2 = {
    a: 'Колобок',
    b: 'Маугли',
    c: 'Бэтмен',
    d: 'Бэтмен',
}

const answer3 = {
    a: 'АБВГДейка',
    b: 'ЁКЛМНейка',
    c: 'ЁПРСТейка',
    d: 'ЁЖЗИКейка',
}

function Welcome(name) {
    alert(`Приветствую Вас, ${name}, в игре "Кто хочет стать миллионером?"` );
}

function CheckInput(answer) {
    answer = answer.toLowerCase();
    
    if(answer == 'a') {
        alert('Вверно! Поздравляем с правильным ответом!');
    } else {
        alert('Жаль! Но Вы проиграли(');
    }   
}

function ShowRules() {}

function StartGame() {
    alert(questions[1], '');

    let answer;
    do {
        answer = prompt(`A: ${answer1.a}, B: ${answer1.b}, C: ${answer1.c}, D: ${answer1.d}`, 0);
    } while (answer);
    
    CheckInput(answer);
}


Welcome('Kostya');
StartGame();