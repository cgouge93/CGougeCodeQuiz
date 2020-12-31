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
        choices: ["numbers & strings", "other arrays", "booleans", "all of the above"],
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

// renders questions and options on index.html
function render(questionIndex) {
    //clears existing data
    questionsDiv.innerHTML = " ";
    ulCreate.innerHTML = " ";
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
        var answerFeedback = document.getElementById("answer-feedback");
        //condition if answer is correct
        if (element.textContent == questions[questionIndex].answer){
            score++;
            answerFeedback.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
            answerFeedback.setAttribute("class", "alert alert-success");
        } else {
            //deducting 10 seconds for incorrect answer penalty
            secondsLeft = secondsLeft - penalty;
            answerFeedback.textContent = "Incorrect! The answer is: " + questions[questionIndex].answer;
            answerFeedback.setAttribute("class", "alert alert-danger");
        }
    }
    //advancing to next question in array
    questionIndex++;
    if (questionIndex >= questions.length){
        //allDone will append last page with user stats
        allDone();
        answerFeedback.textContent = "End of quiz!" + " " + "You got " + score + "/" + questions.length + " correct!";
        answerFeedback.setAttribute("class", "");
    } else {
        render(questionIndex)
    }
    questionsDiv.appendChild(answerFeedback)
}
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("class", "card-title");
    createH1.textContent = "All done!";
    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("class", "card-text");
    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        createP2.setAttribute("class", "card-text")
        clearInterval(holdInterval);
        createP.innerHTML = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials:";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("class", "form-control w-25");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.setAttribute("class", "btn btn-info mt-2");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscores.html");
        }
    });
}
