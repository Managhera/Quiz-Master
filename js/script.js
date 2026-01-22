// ================= ELEMENTS =================
var configContainer = document.querySelector(".config-container");
var quizContainer = document.querySelector(".quiz-container");
var resultContainer = document.querySelector(".result-container");
var nextBtn = quizContainer.querySelector(".next-question-btn");

var questionText = quizContainer.querySelector(".question-text");
var answerOptions = quizContainer.querySelector(".answer-options");
var questionStatus = quizContainer.querySelector(".question-status");
var timerDisplay = quizContainer.querySelector(".timer-duration");

// ================= VARIABLES =================
var QUIZ_TIME = 15;
var timer;
var timeLeft;

var currentQuestion;
var currentCategory = "HTML";
var totalQuestions = 10;

var questionIndexes = [];
var userAnswers = []; // store user selected answer index

// ================= TIMER =================
function startTimer() {
  timeLeft = QUIZ_TIME;
  timerDisplay.innerText = timeLeft + "s";

  timer = setInterval(function () {
    timeLeft--;
    timerDisplay.innerText = timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);
      userAnswers.push(null); // skipped
      showNextOrResult();
    }
  }, 1000);
}

// ================= GET RANDOM QUESTION =================
function getQuestion() {
  var list = [];
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].category === currentCategory) {
      list = questions[i].questions;
    }
  }

  if (
    questionIndexes.length >= totalQuestions ||
    questionIndexes.length >= list.length
  ) {
    showResult();
    return null;
  }

  var index;
  do {
    index = Math.floor(Math.random() * list.length);
  } while (questionIndexes.indexOf(index) != -1);

  questionIndexes.push(index);
  return list[index];
}

// ================= SHOW QUESTION =================
function showQuestion() {
  clearInterval(timer);
  answerOptions.innerHTML = "";
  nextBtn.style.visibility = "hidden";

  currentQuestion = getQuestion();
  if (!currentQuestion) return;

  questionText.innerText = currentQuestion.question;
  questionStatus.innerText =
    questionIndexes.length + " of " + totalQuestions + " Questions";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    let li = document.createElement("li");
    li.innerText = currentQuestion.options[i];
    li.className = "answer-option";

    li.onclick = function () {
      selectAnswer(i); // store selected answer
    };

    answerOptions.appendChild(li);
  }

  startTimer();
}

// ================= SELECT ANSWER =================
function selectAnswer(index) {
  // Remove previous selection
  var options = answerOptions.children;
  for (var i = 0; i < options.length; i++) {
    options[i].classList.remove("selected");
  }

  options[index].classList.add("selected");

  userAnswers[questionIndexes.length - 1] = index;
  nextBtn.style.visibility = "visible";
}

// ================= NEXT QUESTION =================
nextBtn.onclick = function () {
  showNextOrResult();
};

function showNextOrResult() {
  clearInterval(timer);

  // Fill skipped if user didn't select
  if (userAnswers[questionIndexes.length - 1] === undefined) {
    userAnswers[questionIndexes.length - 1] = null;
  }

  showQuestion();
}

// ================= SHOW RESULT =================
function showResult() {
  clearInterval(timer);

  var correct = 0;
  var wrong = 0;
  var skipped = 0;

  for (var i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === null) skipped++;
    else if (
      userAnswers[i] ===
      questions.find((q) => q.category === currentCategory).questions[
        questionIndexes[i]
      ].correctAnswer
    )
      correct++;
    else wrong++;
  }

  quizContainer.parentNode.classList.remove("active");
  resultContainer.parentNode.classList.add("active");

  resultContainer.querySelector(".result-message").innerHTML =
    "<b>Total Questions:</b> " +
    totalQuestions +
    "<br>" +
    "<b>Right Answers:</b> " +
    correct +
    "<br>" +
    "<b>Wrong Answers:</b> " +
    wrong +
    "<br>" +
    "<b>Skipped Questions:</b> " +
    skipped +
    "<br>" +
    "<b>Score:</b> " +
    correct;
}

// ================= START QUIZ =================
document.querySelector(".start-quiz-btn").onclick = function () {
  currentCategory = configContainer.querySelector(
    ".category-option.active"
  ).innerText;
  totalQuestions = parseInt(
    configContainer.querySelector(".question-option.active").innerText
  );

  questionIndexes = [];
  userAnswers = [];

  configContainer.parentNode.classList.remove("active");
  quizContainer.parentNode.classList.add("active");

  showQuestion();
};

// ================= CONFIG BUTTONS =================
var configButtons = configContainer.querySelectorAll(
  ".category-option, .question-option"
);
for (var i = 0; i < configButtons.length; i++) {
  configButtons[i].onclick = function () {
    var siblings = this.parentNode.children;
    for (var j = 0; j < siblings.length; j++)
      siblings[j].classList.remove("active");
    this.classList.add("active");
  };
}

// ================= RESET QUIZ =================
resultContainer.querySelector(".try-again-btn").onclick = function () {
  questionIndexes = [];
  userAnswers = [];

  resultContainer.parentNode.classList.remove("active");
  configContainer.parentNode.classList.add("active");
};
