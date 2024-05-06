// highScore.js

// Seleciona o botão "view-high-scores" no HTML
let scoresBtn = document.querySelector("#view-high-scores");

// Classifica as pontuações anteriores em ordem, recuperando as pontuações do localStorage
function printHighscores() {
  // Obtém as pontuações salvas no localStorage e as converte para um array, ou cria um array vazio se não houver nada salvo
  let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  // Classifica o array de pontuações em ordem decrescente com base na pontuação
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  // Para cada pontuação, cria um elemento de lista (li) com o nome e a pontuação e o adiciona à lista ordenada (ol) na página
  highscores.forEach(function (score) {
    let liTag = document.createElement("li");
    liTag.textContent = score.name + " - " + score.score;
    let olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

// Limpa as pontuações anteriores quando os usuários clicam em limpar
function clearHighscores() {
  // Remove as pontuações salvas do localStorage
  window.localStorage.removeItem("highscores");
  // Recarrega a página para atualizar a lista de pontuações
  window.location.reload();
}
// Define a função clearHighscores como manipulador de eventos quando o botão "clear" é clicado
document.getElementById("clear").onclick = clearHighscores;

// Chama a função printHighscores para exibir as pontuações na página
printHighscores();
