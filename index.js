let currentPlayer = 'X'; 
let boardSize = 3;        
let board = [];           
let gameMode = '2 Players';  
let moves = [];           
let gameHistory = [];     
let gameOver = false;     

function startGame() {
  boardSize = parseInt(document.getElementById('boardSize').value);
  if(boardSize<3 || boardSize > 10){
    alert("Please enter a value between 3 and 10.");
    return;
  }
  gameMode = document.getElementById('mode').value;
  currentPlayer = 'X';
  gameOver = false;
  moves = [];
  document.getElementById('turnIndicator').innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById('replayButton').disabled = true;
  createBoard();
}

function createBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, 50px)`;

  board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(''));

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = board[row][col];
      cell.addEventListener('click', () => cellClick(cell, row, col));
      boardElement.appendChild(cell);
    }
  }
}

function cellClick(cell, row, col) {
  if (gameOver || cell.innerText) return;

  board[row][col] = currentPlayer;
  cell.innerText = currentPlayer;
  moves.push({ player: currentPlayer, row, col });

  if (checkWinner(row, col)) {
    document.getElementById('gameResult').innerText = `${currentPlayer} wins!`;
    gameOver = true;
    document.getElementById('replayButton').disabled = false;
    saveGameHistory(currentPlayer);
  } else if (moves.length === boardSize * boardSize) {
    document.getElementById('gameResult').innerText = `It's a draw!`;
    gameOver = true;
    document.getElementById('replayButton').disabled = false;
    saveGameHistory('Draw');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turnIndicator').innerText = `Player ${currentPlayer}'s turn`;

    if (gameMode === 'AI' && currentPlayer === 'O') {
      makeAIMove();
    }
  }
}

function checkWinner(row, col) {
  if (board[row].every(cell => cell === currentPlayer)) return true;

  if (board.every(rowArray => rowArray[col] === currentPlayer)) return true;

  if (row === col && board.every((rowArray, idx) => rowArray[idx] === currentPlayer)) return true;

  if (row + col === boardSize - 1 && board.every((rowArray, idx) => rowArray[boardSize - 1 - idx] === currentPlayer)) return true;

  return false;
}

function makeAIMove() {
  let availableMoves = [];
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (!board[row][col]) availableMoves.push({ row, col });
    }
  }

  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  cellClick(document.querySelector(`#board > :nth-child(${move.row * boardSize + move.col + 1})`), move.row, move.col);
}

function saveGameHistory(result) {
  gameHistory.push({ result, moves: moves.slice(), boardSize, gameMode });
  updateHistoryDropdown();
}

function updateHistoryDropdown() {
  const historyDropdown = document.getElementById('history');
  historyDropdown.innerHTML = gameHistory.map((game, index) => `<option value="${index}">Game ${index + 1}: ${game.result}</option>`).join('');
}

function loadGameHistory(index) {
  const game = gameHistory[index];
  if (!game) return;
  boardSize = game.boardSize;
  gameMode = game.gameMode;
  moves = game.moves;
  currentPlayer = 'X';
  gameOver = false;
  createBoard();
}

function replayMatch() {
  if (moves.length === 0) return;

  createBoard();
  let i = 0;
  const interval = setInterval(() => {
    if (i >= moves.length) {
      clearInterval(interval);
      return;
    }
    const { row, col, player } = moves[i];
    document.querySelector(`#board > :nth-child(${row * boardSize + col + 1})`).innerText = player;
    i++;
  }, 500);
}
