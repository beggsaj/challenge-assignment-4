var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign ('/end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor
}