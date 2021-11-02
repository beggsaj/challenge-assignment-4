var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var timerText = 59;
var timeEl = document.querySelector('#time');
var lostTime = 10;


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [{
        question: 'What is 2 + 3?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 4,
    },
    {
        question: 'What is 3 + 5?',
        choice1: '2',
        choice2: '8',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 4 + 3?',
        choice1: '2',
        choice2: '3',
        choice3: '7',
        choice4: '5',
        answer: 3,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

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
            decrementTime(lostTime);
            //timerText = timerText - 10;
            //timeEl.setAttribute("value", );
            //console.log('timerText is' + timerText)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

decrementScore = num => {
    score -= num
    scoreText.innerText = score
}

decrementTime = num => {
    timeEl -= num
    timerText.innerText = timeEl
}

startGame()

function startTimer(duration, display) {
    var timer = duration,
        seconds;
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

window.onload = function () {
    display = timeEl;
    startTimer(timerText, display);
};





