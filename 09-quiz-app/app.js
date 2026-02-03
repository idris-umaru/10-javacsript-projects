//Quiz App javascript Code 
document.addEventListener('DOMContentLoaded',()=>{
    console.log('Quiz App loaded successfully');
})

//An Array of Quiz Questions and Answers 
const quizData = [
    {
        question: 'what does WWW stand for in a website browser?',
        options: [
            'World wide web',
            'Wild wide web',
            'Wide world web',
            'World wide war'
        ], correct: 0
        
        
    },
    {
        question: 'which programming language is named after a coffee?',
        options: [
            'Java',
            'JavaScript',
            'C++',
            'Python'
        ], correct: 1
    },
    {
        question: 'which company developed the react Library?',
        options: [
            'Google',
            'Microsoft',
            'Facebook',
            'Apple'
        ], correct: 2
    },
    {
        question: 'How many colors are there in a rainbow?',
        options: [
            '5',
            '6',
            '7',    
            '8'
        ], correct: 2
    },
    {
        question: 'what is the capital of france?',
        options: [
            'Berlin',   
            'Madrid',
            'Paris',
            'Lisbon'
        ], correct: 2
        
    },
 {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "JavaScript", "Java", "C++"],
        correct: 1
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marion", "Liechtenstein"],
        correct: 1
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "Which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correct: 0
    }
];

//Getting the DOM Elements ;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn')
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const finalScoreElement = document.getElementById('final-score');
const finalTotalElement = document.getElementById('final-total');
const percentageElement = document.getElementById('percentage');
const resultMessageElement = document.getElementById('result-message');

//Quiz state variables
let currentQuestion= 0;
let score = 0; 
let selectedAnswer = null;


//Function to start the quiz 
function initQuiz (){
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    currentQuestionElement.textContent = currentQuestion + 1;
    totalQuestionsElement.textContent = quizData.length;
    scoreElement.textContent = score;
}

//Function show screen

function showScreen(screen){
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    screen.classList.remove('hidden');

}

//function to load question
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];

    // Update question text
    questionElement.textContent = currentQuizData.question;

    // Reset options and selection
    optionsElement.innerHTML = '';
    selectedAnswer = null;
    nextBtn.classList.add('hidden');

    // Update progress bar & counter
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressElement.style.width = `${progress}%`;
    currentQuestionElement.textContent = currentQuestion + 1;

    // ←←← THIS PART MUST BE INSIDE loadQuestion()
    currentQuizData.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(optionBtn);
    });
}

// Select answer
function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    selectedAnswer = answerIndex;
    const question = quizData[currentQuestion];
    const options = optionsElement.querySelectorAll('.option');

    // Disable all options
    options.forEach(option => option.classList.add('disabled'));

    // Mark correct and incorrect answers
    options[question.correct].classList.add('correct');
    if (answerIndex !== question.correct) {
        options[answerIndex].classList.add('incorrect');
    } else {
        score++;
        scoreElement.textContent = score;
    }

    // Show next button
    nextBtn.classList.remove('hidden');
}

// Next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    finalScoreElement.textContent = score;
    finalTotalElement.textContent = quizData.length;
    const percentage = Math.round((score / quizData.length) * 100);
    percentageElement.textContent = percentage + '%';

    // Display message based on score
    let message = '';
    if (percentage >= 80) {
        message = '🌟 Excellent! You really know your stuff!';
    } else if (percentage >= 60) {
        message = '👍 Great job! Keep up the good work!';
    } else if (percentage >= 40) {
        message = '😊 Not bad! Practice makes perfect!';
    } else {
        message = '💪 Keep learning! You\'ll do better next time!';
    }
    resultMessageElement.textContent = message;

    showScreen(resultScreen);
}

// Restart quiz
function restartQuiz() {
    initQuiz();
    showScreen(startScreen);
}

// Event listeners
startBtn.addEventListener('click', () => {
    initQuiz();
    showScreen(quizScreen);
    loadQuestion();
});

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize on page load
initQuiz();

    
