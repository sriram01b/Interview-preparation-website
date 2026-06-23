const questions = [
    {
        question: "What is the purpose of an abstract class in OOP?",
        options: [
            "To provide a common interface for its subclasses",
            "To prevent instantiation of the class",
            "To define a class with no methods",
            "None of the above"
        ],
        correctAnswer: "To provide a common interface for its subclasses"
    },
    {
        question: "What is a static method in a class?",
        options: [
            "A method that can be called on the class itself, rather than on an instance of the class.",
            "A method that cannot be called at all.",
            "A method that is defined with the static keyword.",
            "None of the above"
        ],
        correctAnswer: "A method that can be called on the class itself, rather than on an instance of the class."
    },
    {
        question: "What is the purpose of the super keyword in Java?",
        options: [
            "It is used to refer to the superclass of a subclass.",
            "It is used to create a new object of a class.",
            "It is used to call a static method.",
            "None of the above"
        ],
        correctAnswer: "It is used to refer to the superclass of a subclass."
    },
    {
        question: "What is a foreign key in a database?",
        options: [
            "A field that uniquely identifies a record in a table",
            "A field that establishes a relationship between two tables",
            "A field that contains only numeric values",
            "None of the above"
        ],
        correctAnswer: "A field that establishes a relationship between two tables"
    },
    {
        question: "What is the purpose of an index in a database?",
        options: [
            "To speed up the retrieval of rows from a table.",
            "To organize data into multiple tables.",
            "To perform complex calculations on data.",
            "None of the above"
        ],
        correctAnswer: "To speed up the retrieval of rows from a table."
    },
    {
        question: "What is a process in an operating system?",
        options: [
            "A program in execution, including its current values of program counter and registers.",
            "A program that is stored on disk.",
            "A file that contains executable code.",
            "None of the above"
        ],
        correctAnswer: "A program in execution, including its current values of program counter and registers."
    },
    {
        question: "Differentiate between a LAN and a WAN.",
        options: [
            "A LAN (Local Area Network) covers a small geographic area, while a WAN (Wide Area Network) covers a large geographic area.",
            "A WAN is faster than a LAN.",
            "A LAN is a type of WAN.",
            "None of the above"
        ],
        correctAnswer: "A LAN (Local Area Network) covers a small geographic area, while a WAN (Wide Area Network) covers a large geographic area."
    },
    {
        question: "What is a stored procedure in DBMS?",
        options: [
            "A set of SQL statements that can be stored and reused in a database.",
            "A table that stores records temporarily.",
            "A special type of index in a database.",
            "None of the above"
        ],
        correctAnswer: "A set of SQL statements that can be stored and reused in a database."
    },
    {
        question: "Explain the concept of composition in OOP.",
        options: [
            "It is a way to combine objects to create more complex objects.",
            "It is a way to break down a class into smaller components.",
            "It is a way to define interfaces in a class.",
            "None of the above"
        ],
        correctAnswer: "It is a way to combine objects to create more complex objects."
    },
    {
        question: "What is the purpose of an operating system?",
        options: [
            "To manage hardware resources and provide services for computer programs.",
            "To create new software applications.",
            "To design computer hardware.",
            "None of the above"
        ],
        correctAnswer: "To manage hardware resources and provide services for computer programs."
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