var data;
var index = 0;
var playerScore = 0;
var scoreBoard = document.querySelector("#scoreBoard");
var lastAnswerWasCorrect;
var quizLength;
var questionNumber = 0;

function runFetch() {
  fetch("https://opentdb.com/api.php?amount=10&category=17&type=boolean")
    .then(function (response) {
      return response.json();
    })
    .then(function (quizData) {
      console.log(quizData);
      data = quizData;
      quizLength = data.results.length;
    });
}
runFetch();

function getQuestion() {
  questionNumber += 1;
  document.querySelector("#questionNumber").style.display = "initial";
  document.querySelector("#questionNumber").innerHTML =
    "Question " + questionNumber;
  document.querySelector("#questionNumber").style.backgroundColor = "#d95858";

  document.querySelector("#question").innerHTML =
    '"' + data.results[index].question + '"';
}

document.querySelector("#playerTrue").addEventListener("click", function () {
  this.style.backgroundColor = "#f4c964";
  document.querySelector("#playerFalse").style.backgroundColor = "#b9e2b6";
});
document.querySelector("#playerFalse").addEventListener("click", function () {
  this.style.backgroundColor = "#f4c964";
  document.querySelector("#playerTrue").style.backgroundColor = "#b9e2b6";
});

function getAnswer() {
  document.querySelector("#answer").innerHTML =
    data.results[index].correct_answer + "!";
  index += 1;
}

function checkAnswer(playerChoice) {
  var answer = data.results[index].correct_answer;
  if (playerChoice == answer) {
    lastAnswerWasCorrect = true;
  } else {
    lastAnswerWasCorrect = false;
  }
}

function updateScoreBoard() {
  scoreBoard.innerHTML = playerScore + "/" + quizLength;
}

function changeContainerColor() {
  if (lastAnswerWasCorrect) {
    playerScore += 1;
    document.querySelector("#answerContainer").style.backgroundColor =
      "#9adbf5";
    document.querySelector("#correctOrWrong").innerHTML =
      "Correct! The answer is:";
  } else {
    document.querySelector("#answerContainer").style.backgroundColor =
      "#f59a9a";
    document.querySelector("#correctOrWrong").innerHTML =
      "Wrong! The answer is:";
  }
}

function nextQuestion() {
  if (index <= quizLength - 1) {
    document.querySelector("#answer").innerHTML = "?";
    document.querySelector("#playerTrue").style.backgroundColor = "#b9e2b6";
    document.querySelector("#playerFalse").style.backgroundColor = "#b9e2b6";
    document.querySelector("#answerContainer").style.backgroundColor =
      "rgba(255, 255, 255, 0.9)";
    document.querySelector("#correctOrWrong").innerHTML = "";
    getQuestion();
  } else {
    displayBox();
  }
}

function displayBox() {
  document.querySelector("#popUpBox").style.display = "flex";
  document.querySelector(".main-container").classList.add("background-opacity");
  displayFinalScore();
}

function displayFinalScore() {
  document.querySelector("#finalScore").innerHTML =
    "You scored " + playerScore + "/" + quizLength + "!";
}

function prepareNewGame() {
  document.querySelector("#popUpBox").style.display = "none";
  document
    .querySelector(".main-container")
    .classList.remove("background-opacity");
  document.querySelector("#startButton").style.display = "initial";
  document.querySelector("#answerButton").style.display = "none";
  document.querySelector("#nextButton").style.display = "none";
  document.querySelector("#playerTrue").style.display = "none";
  document.querySelector("#playerFalse").style.display = "none";
  document.querySelector("#answerContainer").style.backgroundColor =
    "rgba(255, 255, 255, 0.9)";
  document.querySelector("#correctOrWrong").innerHTML = "";
  document.querySelector("#answer").innerHTML = "?";
  document.querySelector("#question").innerHTML = "";
  document.querySelector("#questionNumber").innerHTML = "";
  document.querySelector("#questionNumber").style.display = "none";
  document.querySelector("#playerTrue").style.backgroundColor = "#b9e2b6";
  document.querySelector("#playerFalse").style.backgroundColor = "#b9e2b6";
  playerScore = 0;
  index = 0;
  questionNumber = 0;
  updateScoreBoard();
  runFetch();
}

document.querySelector("#startButton").addEventListener("click", function () {
  this.style.display = "none";
  document.querySelector("#answerButton").style.display = "initial";
  document.querySelector("#playerTrue").style.display = "initial";
  document.querySelector("#playerFalse").style.display = "initial";
});

document.querySelector("#answerButton").addEventListener("click", function () {
  this.style.display = "none";
  document.querySelector("#nextButton").style.display = "initial";
});

document.querySelector("#nextButton").addEventListener("click", function () {
  this.style.display = "none";
  document.querySelector("#answerButton").style.display = "initial";
});
