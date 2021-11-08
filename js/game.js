//establishing global variables 

var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timerText = 59;
var timeEl = document.querySelector('#time');
var lostTime = 10;
var timer = 0;


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//quiz questions defined

let questions = [{
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<scripting>',
        choice2: '<js>',
        choice3: '<javascript>',
        choice4: '<script>',
        answer: 4,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function:myFunction()',
        choice2: 'function myFunction()',
        choice3: 'function = myFunction()',
        choice4: 'function = myFunction(:)',
        answer: 2,
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice1: 'if i == 3 then',
        choice2: 'if i = 3',
        choice3: 'if (i == 3)',
        choice4: 'if i = 3 then',
        answer: 3,
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        choice1: 'This is a comment',
        choice2: '<!--This is a comment-->',
        choice3: '//This is a comment',
        choice4: '*comment*',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

//function to start game

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

//function to load new questions to keep the game going

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign("./end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//calculate whether or not the correct answer is selected and how to handle (i.e increase score, decrease time, etc.)

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if (classToApply === 'incorrect') {
            decrementScore(SCORE_POINTS);
            timer -= 10;
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

//score calculations

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

decrementScore = num => {
    score -= num
    scoreText.innerText = score
}


startGame()

//timer function setup and defintion 

function startTimer(duration, display) {
    timer = duration;
    var seconds;
    setInterval(function () {
        //minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        display.textContent = ":" + seconds;

        if (--timer < 0) {
            return window.location.assign("./end.html"),
            localStorage.setItem('mostRecentScore', score)
        }

    }, 1000);
}


//start the timer when the page loads

window.onload = function () {
    display = timeEl;
    startTimer(timerText, display);
};





