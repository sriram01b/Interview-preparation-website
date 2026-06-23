const questions = [
    {
        question: "Identify the correct sentence:",
        options: [
            "Their going to the park.",
            "They're going to the park.",
            "Theirs going to the park.",
            "Theres going to the park."
        ],
        correctAnswer: "b) They're going to the park"
    },
    {
        question: "Which of the following sentences is in passive voice?",
        options: [
            "The chef prepared a delicious meal.",
            "The book was read by the student.",
            "She is writing an interesting story.",
            "They have built a new house."
        ],
        correctAnswer: "b) The book was read by the student."
    },
    {
        question: "Choose the correctly spelled word:",
        options: [
            "Aggresive",
            "Agressive",
            "Aggressive",
            "Agresssive"
        ],
        correctAnswer: "c) Aggressive"
    },
    {
        question: "Which tense is used to describe an action that will be completed before a specific point in the future?",
        options: [
            "Present Continuous",
            "Future Perfect",
            "Past Simple",
            "Present Perfect"
        ],
        correctAnswer: "Future Perfect"
    },
    {
        question: "Which of the following sentences is grammatically incorrect?",
        options: [
            "I have been to Paris last summer.",
            "She will have completed her project by tomorrow.",
            "They were singing a song in the park.",
            "He had never seen such a beautiful sunset."
        ],
        correctAnswer: "I have been to Paris last summer."
    }
];
let currentQuestion = 0;
let score = 0;
let userResponses = [];

 // Start from 0

// ...

function displayQuestion() {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const questionNumberElement = document.getElementById('question-number');
    const totalQuestionsElement = document.getElementById('total-questions');

    // Update question number and total questions
    questionNumberElement.textContent = currentQuestion + 1;
    totalQuestionsElement.textContent = questions.length;

    // Display question
    questionElement.textContent = questions[currentQuestion].question;

    // Display options
    optionsElement.innerHTML = '';
    const options = questions[currentQuestion].options;

    // Create an array of letters for options
    const optionLetters = ['A', 'B', 'C', 'D'];

    // Loop through options and create buttons with formatted text
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        const optionText = `${optionLetters[index]}&nbsp;&nbsp;&nbsp;${option}`; // Add multiple non-breaking spaces
        button.innerHTML = optionText;
        button.addEventListener('click', () => handleOptionClick(option));
        optionsElement.appendChild(button);
    });
}




// ...


function handleOptionClick(selectedOption) {
    userResponses.push(selectedOption);

    const selectedButton = event.target;

    if (selectedOption === questions[currentQuestion].correctAnswer) {
        score += 10;
        selectedButton.style.backgroundColor = '#28a745'; // Green for correct answer
    } else {
        selectedButton.style.backgroundColor = '#dc3545'; // Red for incorrect answer
    }

    // Disable all buttons after user selects an option
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button !== selectedButton) {
         button.style.backgroundColor = '#f8f9fa'; // Reset color for unselected options
        }
        
    });

    // Add this part to enable the next button
    const nextButton = document.getElementById('next-button');
    nextButton.disabled = false;

    const progressElement = document.getElementById('progress');
    const progressWidth = ((currentQuestion + 1) / questions.length) * 100; // Add 1 to currentQuestion since it will be updated after this function
    progressElement.style.width = `${progressWidth}%`;


    // Update the current score display
    const currentScoreElement = document.getElementById('current-score');
    currentScoreElement.innerHTML = `Current Score: <span id="score">${score}</span>`;
}
function endQuiz() {
    const quizBox = document.querySelector('.quiz-box');
    quizBox.innerHTML = `
        <div class="quiz-summary">
            <h2>Congratulations!</h2>
            <div class="score">
                Your score: <span id="score">${score}</span>
            </div>
            <button id="retry-button">Retry Quiz</button>
        </div>
    `;
    
    // Create an image element for fullscreen display
    const fullscreenImage = document.createElement('img');
    fullscreenImage.src = '../../images/quizcompleted2.png'; // Updated image source
    fullscreenImage.alt = 'Quiz Completed';
    fullscreenImage.style.width = '100vw'; // Make the width match the viewport width
    fullscreenImage.style.height = '100vh'; // Make the height match the viewport height
    fullscreenImage.style.objectFit = 'cover';
    fullscreenImage.style.position = 'fixed';
    fullscreenImage.style.top = '0';
    fullscreenImage.style.left = '0';
    fullscreenImage.style.opacity = '0';
    fullscreenImage.style.transition = 'opacity 1.5s';

    // Add the image to the body
    document.body.appendChild(fullscreenImage);

    // Trigger the fullscreen image after a delay
    setTimeout(() => {
        fullscreenImage.style.opacity = '1';
    }, 100);

    // Remove the image and display the score after 1.5 seconds
    setTimeout(() => {
        fullscreenImage.remove();
    }, 1500);
    
    const retryButton = document.getElementById('retry-button');
    retryButton.addEventListener('click', function() {
        location.reload(); // This will reload the page
    })
}




const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }

    // Update the current score display
    const currentScoreElement = document.getElementById('current-score');
    currentScoreElement.innerHTML = `Current Score: <span id="score">${score}</span>`;

    userResponses = [];
});

// Call displayQuestion to show the first question
displayQuestion();