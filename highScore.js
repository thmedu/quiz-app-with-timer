// highScore.js

// Seleciona o botão "view-high-scores" no HTML
const scoresBtn = document.querySelector("#view-high-scores");

// Função para imprimir a melhor pontuação
function printHighscore() {
  const highscore = JSON.parse(window.localStorage.getItem("highscore")) || { name: "", score: 0 };
  const olEl = document.getElementById("highscores");
  olEl.innerHTML = "";
  const liTag = document.createElement("li");
  liTag.textContent = `${highscore.name} - ${highscore.score}`;
  olEl.appendChild(liTag);
}

// Função para salvar a melhor pontuação
function saveHighscore(name, score) {
  const highscore = JSON.parse(window.localStorage.getItem("highscore")) || { name: "", score: 0 };
  if (score > highscore.score) {
    highscore.name = name;
    highscore.score = score;
    window.localStorage.setItem("highscore", JSON.stringify(highscore));
  }
}

// Função para limpar a melhor pontuação
function clearHighscore() {
  window.localStorage.removeItem("highscore");
  window.location.reload();
}

// Adiciona o evento de clique para limpar a melhor pontuação
document.getElementById("clear").addEventListener("click", clearHighscore);

// Imprime a melhor pontuação ao carregar a página
printHighscore();

// Exporta a função saveHighscore para ser utilizada em outros arquivos
export { saveHighscore };
