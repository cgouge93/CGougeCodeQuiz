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
    //clears the high score button from the card footer when quiz begins
    document.querySelector(".card-footer").innerHTML = "";
});

// renders questions and options on index.html
function render(questionIndex) {
    //clears existing data
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    //for loop to loop through question array
    for (var i = 0; i < questions.length; i++) {
        // appends title from array
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // for each to append question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        listItem.setAttribute("class", "btn btn-info btn-sm");
        listItem.setAttribute("id", "choices")
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        //event listener for selected item runs compare function to check answer
        listItem.addEventListener("click", (compare));
    })
}
// compare function to check user-selected answer
function compare(event){
    var element = event.target;

    if (element.matches("button")) {
        var answerFeedback = document.querySelector(".card-footer");
        //condition if answer is correct
        if (element.textContent == questions[questionIndex].answer){
            score++;
            answerFeedback.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            //deducting 10 seconds for incorrect answer penalty
            secondsLeft = secondsLeft - penalty
        }
    }
}