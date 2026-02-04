const questions = [
    { q: "HTML is mainly used for?", o: ["Styling", "Structure", "Logic", "Database"], a: 1 },
    { q: "CSS stands for?", o: ["Creative Style Sheets", "Cascading Style Sheets", "Color Style Sheet", "Computer Style Sheet"], a: 1 },
    { q: "JavaScript is used to?", o: ["Design pages", "Create structure", "Add interactivity", "Store data"], a: 2 },
    { q: "Which tag is used to display an image?", o: ["<image>", "<img>", "<src>", "<pic>"], a: 1 },
    { q: "Which is NOT a CSS unit?", o: ["px", "em", "kg", "%"], a: 2 }
];

questions.sort(() => Math.random() - 0.5);

let index = 0;
let score = 0;
let user = "";
let answers = [];
let timer;
let timeLeft = 30;

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const errorMsg = document.getElementById("loginError");

function startQuiz() {
    const name = username.value.trim();
    const email = document.getElementById("email").value.trim();

    if (name.length < 3) {
        errorMsg.innerText = "Please enter a valid name";
        return;
    }
    if (!email.includes("@")) {
        errorMsg.innerText = "Please enter a valid email";
        return;
    }

    errorMsg.innerText = "";
    user = name;

    loginBox.style.display = "none";
    quizBox.style.display = "block";
    document.getElementById("user").innerText = user;

    loadQuestion();
}

function loadQuestion() {
    question.innerText = questions[index].q;
    progressText.innerText = `🚀 Question ${index + 1} of ${questions.length}`;
    scoreEl.innerText = score;
    updateScoreColor();

    document.querySelectorAll(".options button").forEach((btn, i) => {
        btn.innerText = questions[index].o[i];
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.style.color = "green";
    timerEl.innerText = `🚀 Countdown: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 10) timerEl.style.color = "orange";
        if (timeLeft <= 5) {
            timerEl.style.color = "red";
            document.getElementById("beepSound").play();
        }

        timerEl.innerText = `🚀 Countdown: ${timeLeft}s`;

        if (timeLeft === 0) {
            saveAnswer(false);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timer);

    let isCorrect = false;
    if (selected === questions[index].a) {
        score++;
        scoreEl.innerText = score;
        isCorrect = true;
    }

    updateScoreColor();
    saveAnswer(isCorrect);
    nextQuestion();
}

function saveAnswer(isCorrect) {
    answers.push({
        q: questions[index].q,
        correct: questions[index].o[questions[index].a],
        status: isCorrect
    });
}

function nextQuestion() {
    index++;
    if (index < questions.length) loadQuestion();
    else showResult();
}

function updateScoreColor() {
    const percent = (score / questions.length) * 100;
    scoreEl.className = "";

    if (percent < 40) scoreEl.classList.add("score-low");
    else if (percent < 70) scoreEl.classList.add("score-medium");
    else scoreEl.classList.add("score-high");
}

function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    let percent = Math.round((score / questions.length) * 100);

    finalScore.innerHTML = `
    <h3 class="${percent < 40 ? 'score-low' : percent < 70 ? 'score-medium' : 'score-high'}">
        🎯 ${user}, Mission Success: ${percent}% 🚀
    </h3>
    <p>
        ${percent >= 70 ? "🏆 Excellent! You reached your goal!" :
          percent >= 40 ? "🚀 Good job! Keep improving!" :
          "🎯 Keep practicing, success is near!"}
    </p>`;

    let html = "<h4>✔ Correct Answers</h4>";
    answers.forEach((a, i) => {
        html += `
        <p>
            <b>Q${i + 1}:</b> ${a.q}<br>
            <span style="color:green">✔ Correct Answer: ${a.correct}</span><br>
            <span style="color:${a.status ? 'green' : 'red'}">
                ${a.status ? '✔ You answered correctly' : '❌ You answered incorrectly'}
            </span>
        </p>`;
    });

    answerList.innerHTML = html;
}
