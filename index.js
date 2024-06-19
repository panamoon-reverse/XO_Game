let currentPlayer = 'X';  // ผู้เล่นคนแรกเป็น X
let boardSize = 3;        // ขนาดตารางเริ่มต้น
let board = [];           // ตารางเกม
let gameMode = '2 Players';  // โหมดเกมเริ่มต้น
let moves = [];           // การเคลื่อนไหวของเกม
let gameHistory = [];     // ประวัติการเล่น
let gameOver = false;     // สถานะของเกม

function startGame() {
  boardSize = parseInt(document.getElementById('boardSize').value);
  gameMode = document.getElementById('mode').value;
  currentPlayer = 'X';
  gameOver = false;
  moves = [];
  document.getElementById('turnIndicator').innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById('gameResult').innerText = `Board Size: ${boardSize}x${boardSize} | Mode: ${gameMode}`;
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
      cell.addEventListener('click', () => handleCellClick(cell, row, col));
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(cell, row, col) {
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
  // ตรวจสอบแถว
  if (board[row].every(cell => cell === currentPlayer)) return true;

  // ตรวจสอบคอลัมน์
  if (board.every(rowArray => rowArray[col] === currentPlayer)) return true;

  // ตรวจสอบแนวทแยงหลัก
  if (row === col && board.every((rowArray, idx) => rowArray[idx] === currentPlayer)) return true;

  // ตรวจสอบแนวทแยงรอง
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
  handleCellClick(document.querySelector(`#board > :nth-child(${move.row * boardSize + move.col + 1})`), move.row, move.col);
}

function saveGameHistory(result) {
  gameHistory.push({ result, moves: [...moves], boardSize, gameMode });
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
  replayMatch();
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

function restartGame() {
  gameOver = false;
  currentPlayer = 'X';
  moves = [];
  document.getElementById('turnIndicator').innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById('gameResult').innerText = '';
  document.getElementById('replayButton').disabled = true;
  createBoard();
}

function newGame() {
  boardSize = parseInt(document.getElementById('boardSize').value);
  restartGame();
}
