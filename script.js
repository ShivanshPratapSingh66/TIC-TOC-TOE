const blocks = document.querySelectorAll(".block");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Add click event to each block
blocks.forEach((block, index) => {
  block.addEventListener("click", () => handleBlockClick(block, index));
});

function handleBlockClick(block, index) {

  // Prevent overwriting
  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  // Update board
  gameState[index] = currentPlayer;
  block.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {

  let roundWon = false;

  for (let condition of winningConditions) {

    const [a, b, c] = condition;

    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  // Winner
  if (roundWon) {
    statusText.textContent = `Player ' ${currentPlayer} ' Wins The Game!🎉`;
   
    gameActive = false;
    return;
  }

  // Draw
  if (!gameState.includes("")) {
    statusText.textContent = "Game Draw!";
    gameActive = false;
    return;
  }

  // Change player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Restart game
restartBtn.addEventListener("click", restartGame);

function restartGame() {

  currentPlayer = "X";
  gameActive = true;

  gameState = ["", "", "", "", "", "", "", "", ""];

  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  blocks.forEach(block => {
    block.textContent = "";
  });
}