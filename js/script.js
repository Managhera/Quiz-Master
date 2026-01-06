const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");
const nextQuestionBtn = quizContainer.querySelector(".next-question-btn");



let currentQuestion;
let correctAnswersCount = 0;
let disableSelection = false;
const questionsIndexHistory = [];

function getRandomQuestion(){

}

function renderQuestion() {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;

  disableSelection = false;


  currentQuestion.options.forEach((text, index) => {
    const li = document.createElement("li");
    li.className = "answer-option";
    li.textContent = text;
    li.onclick = () => handleAnswer(li, index);
    answerOptions.appendChild(li);
  });
}

/* ================= QUIZ FLOW ================= */

function startQuiz() {
  quizCategory = configContainer.querySelector(".category-option.active").textContent;
  numberOfQuestions = configContainer.querySelector(".question-option.active").textContent;

  document.querySelector(".config-popup").classList.remove("active");
  document.querySelector(".quiz-popup").classList.add("active");

  renderQuestion();
}

function resetQuiz() {
  resetTimer();
  correctAnswersCount = 0;
  questionsIndexHistory.length = 0;

  document.querySelector(".config-popup").classList.add("active");
  document.querySelector(".result-popup").classList.remove("active");
}


configContainer.querySelectorAll(".category-option, .question-option")
  .forEach(option => {
    option.onclick = () => {
      option.parentNode.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    };
  });

nextQuestionBtn.onclick = renderQuestion;
resultContainer.querySelector(".try-again-btn").onclick = resetQuiz;
configContainer.querySelector(".start-quiz-btn").onclick = startQuiz;
