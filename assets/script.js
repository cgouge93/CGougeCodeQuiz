//variable containing array/objets for quiz questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within:",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store:",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables:",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for use during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

//variables for score and question index
var score = 0;
var questionIndex = 0;

//start working code
//dom variables
var currentTime = document.querySelector("#timer");
var startQuiz = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questions");
var wrapper = document.querySelector("#contentWrap");

// 15 seconds per questions
var secondsLeft = 76;
// interval time variable
var holdInterval = 0;
//incorrect question penalty 10 seconds
var penalty = 10;
// creates new ul element on index.html
var ulCreate = document.createElement("ul");

// event listener for start quiz button to begin other functions
startQuiz.addEventListener("click", function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time left: " + secondsLeft + " seconds";

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        },  1000);
    }
    render(questionIndex);
});