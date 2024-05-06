// Array de objetos contendo as perguntas, opções e respostas
const quizData = [
  {
    prompt: `Em qual elemento HTML nós colocamos o JavaScript?`,
    options: ["<javascript>", "<js>", "<script>", "<scripting>"],
    answer: "<script>",
  },
  {
    prompt: `Como você chama uma função chamada myFunction?`,
    options: [
      "call myFunction()",
      "myFunction()",
      "call function myFunction",
      "Call.myFunction",
    ],
    answer: "myFunction()",
  },
  {
    prompt: `Como começa um loop for?`,
    options: [
      "for (i = 0; i <= 5; i++)",
      "for (i = 0; i <= 5)",
      "for i = 1 to 5",
      " for (i <= 5; i++)",
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    prompt: `Em JavaScript, qual dos seguintes é um operador lógico?`,
    options: ["|", "&&", "%", "/"],
    answer: "&&",
  },
  {
    prompt: `Um elemento nomeado em um programa JavaScript que é usado para armazenar e recuperar dados é um _____.`,
    options: ["método", "operador de atribuição", "variável", "string"],
    answer: "variável",
  },
  {
    prompt: `Qual é o resultado de 10 + 5 * 3?`,
    options: ["25", "45", "30", "40"],
    answer: "25",
  },
  {
    prompt: `Como você escreve "Olá Mundo" em um alerta em JavaScript?`,
    options: [
      `alertBox("Olá Mundo");`,
      `alert("Olá Mundo");`,
      `msgBox("Olá Mundo");`,
      `msg("Olá Mundo");`,
    ],
    answer: `alert("Olá Mundo");`,
  },
  {
    prompt: `Como você faz um comentário de linha em JavaScript?`,
    options: [
      `// Este é um comentário de linha`,
      `/* Este é um comentário de linha */`,
      `' Este é um comentário de linha'`,
      `<!-- Este é um comentário de linha -->`,
    ],
    answer: `// Este é um comentário de linha`,
  },
  {
    prompt: `Qual é a sintaxe correta para se referir a um arquivo de script externo chamado "script.js" em HTML?`,
    options: [
      `<script src="script.js"></script>`,
      `<script href="script.js"></script>`,
      `<script link="script.js"></script>`,
      `<link src="script.js"></link>`,
    ],
    answer: `<script src="script.js"></script>`,
  },
  {
    prompt: `Qual é o operador de igualdade estrita em JavaScript?`,
    options: [`==`, `===`, `=`, `!=`],
    answer: `===`,
  },
  {
    prompt: `Qual método é usado para remover o último elemento de um array em JavaScript?`,
    options: [`pop()`, `removeLast()`, `splice()`, `deleteLast()`],
    answer: `pop()`,
  },
  {
    prompt: `Qual é o resultado da expressão typeof [] em JavaScript?`,
    options: [`array`, `object`, `array[]`, `undefined`],
    answer: `object`,
  },
  {
    prompt: `Qual é a função do método concat() em JavaScript?`,
    options: [
      `Para concatenar duas strings`,
      `Para dividir uma string em um array`,
      `Para remover elementos duplicados de um array`,
      `Para unir dois arrays em um novo array`,
    ],
    answer: `Para unir dois arrays em um novo array`,
  },
  // Adicione mais perguntas aqui conforme necessário
];

// Elementos do DOM
const questionEl = document.getElementById("question-words");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit-score");
const startBtn = document.getElementById("start");
const nameEl = document.getElementById("name");
const questionsContainer = document.getElementById("questions");
const quizEndScreen = document.getElementById("quiz-end");

// Estado inicial do quiz
const initialState = {
  currentQuestionIndex: 0,
  time: quizData.length * 15,
  timerId: null,
};

// Inicializar o quiz
function initializeQuiz() {
  startBtn.addEventListener("click", startQuiz);
  submitBtn.addEventListener("click", saveHighscore);
  nameEl.addEventListener("keyup", checkForEnter);
}

// Iniciar o quiz
function startQuiz() {
  initialState.timerId = setInterval(clockTick, 1000);
  timerEl.textContent = initialState.time;
  startBtn.removeEventListener("click", startQuiz);
  hideElement("start-screen");
  showElement("questions");
  showQuestion();
}

// Mostrar a próxima pergunta
function showQuestion() {
  const currentQuestion = quizData[initialState.currentQuestionIndex];
  questionEl.textContent = currentQuestion.prompt;
  optionsEl.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = createOptionButton(option, index);
    optionsEl.appendChild(optionBtn);
  });
}

// Criar botão de opção
function createOptionButton(option, index) {
  const optionBtn = document.createElement("button");
  optionBtn.textContent = `${index + 1}. ${option}`;
  optionBtn.value = option;
  optionBtn.addEventListener("click", checkAnswer);
  return optionBtn;
}

// Verificar a resposta selecionada
function checkAnswer(event) {
  const selectedAnswer = event.target.value;
  const correctAnswer = quizData[initialState.currentQuestionIndex].answer;
  const isCorrect = selectedAnswer === correctAnswer;
  displayFeedback(isCorrect);
  if (isCorrect) {
    respostaCorretaSelecionada(); // Adiciona confetes para respostas corretas
  } else {
    decreaseTime();
  }
  setTimeout(() => {
    // Limpar feedback após 1 segundo
    feedbackEl.textContent = "";
    feedbackEl.classList.add("hide");
    initialState.currentQuestionIndex++;
    if (initialState.currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 2000);
}

// Função para exibir o feedback com animação
function displayFeedback(isCorrect) {
  const feedbackMessage = isCorrect ? "Correto!" : `Errado! A resposta correta era ${quizData[initialState.currentQuestionIndex].answer}.`;
  const feedbackColor = isCorrect ? "green" : "red";
  const feedbackIconSrc = isCorrect
    ? "https://cdn.lordicon.com/cqofjexf.json"
    : "https://cdn.lordicon.com/ysheqztl.json";

  // Exibir mensagem de feedback
  feedbackEl.textContent = feedbackMessage;
  feedbackEl.style.color = feedbackColor;
  feedbackEl.classList.remove("hide");

  // Adicionar ícone animado
  const animationContainer = document.createElement("div");
  animationContainer.classList.add("animation-container");
  const animation = document.createElement("lord-icon");
  animation.setAttribute("src", feedbackIconSrc);
  animation.setAttribute("trigger", "loop");
  animation.style.width = "70px";
  animation.style.height = "70px";
  animationContainer.appendChild(animation);
  feedbackEl.appendChild(animationContainer);

  // Lógica adicional aqui, se necessário
}
// Função para adicionar animação de feedback
function adicionarAnimacaoFeedback(animationClass, duration) {
  const animation = document.createElement("div");
  animation.classList.add(animationClass);
  animation.style.left = `${Math.random() * 100}%`;
  document.body.appendChild(animation);
  setTimeout(() => {
    animation.remove();
  }, duration);
}

// Uso:
function respostaCorretaSelecionada() {
  adicionarAnimacaoFeedback("confetti", 1000); // Adiciona a animação de confete
}


// Diminuir o tempo
function decreaseTime() {
  initialState.time -= 10;
  if (initialState.time < 0) {
    initialState.time = 0;
  }
  timerEl.textContent = initialState.time;
}

// Encerrar o quiz
function endQuiz() {
  clearInterval(initialState.timerId);
  hideElement("questions");
  showElement("quiz-end");
  document.getElementById("score-final").textContent = initialState.time;
}

// Salvar pontuação no armazenamento local
function saveHighscore() {
  const name = nameEl.value.trim();
  if (name) {
    const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ name, score: initialState.time });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    alert("Sua pontuação foi enviada!");
  }
}

// Verificar a tecla Enter para salvar a pontuação
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
    alert("Sua pontuação foi enviada!");
  }
}

// Ocultar elemento
function hideElement(id) {
  document.getElementById(id).classList.add("hide");
}

// Exibir elemento
function showElement(id) {
  document.getElementById(id).classList.remove("hide");
}

// Atualizar o timer
function clockTick() {
  initialState.time--;
  if (initialState.time <= 0) {
    endQuiz();
  }
  timerEl.textContent = initialState.time;
}

// Inicializar o quiz ao carregar a página
initializeQuiz();

// Suponha que 'tempoRestante' seja o tempo restante em segundos
const tempoRestante = 10; // Exemplo de tempo restante

const timerElement = document.querySelector(".timer");

// Adiciona ou remove a classe 'warning' dependendo do tempo restante
if (tempoRestante <= 10) {
  timerElement.classList.add("warning");
} else {
  timerElement.classList.remove("warning");
}
