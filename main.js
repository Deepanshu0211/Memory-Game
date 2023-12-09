const gameContainer = document.getElementById('gameContainer');
const squares = [];

let sequence = [];
let playerSequence = [];
let round = 1;
let difficulty = 'medium';
let numSquares; // Default to medium difficulty
let speed;

function startGame() {
  const instructionPanel = document.getElementById('instructionPanel');
  instructionPanel.style.display = 'none';

  // Clear any existing sequence and player input
  sequence = [];
  playerSequence = [];
  round = 1;

  // Generate and show the initial sequence
  generateSequence();
  showSequence();
}


function createSquare(index) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.setAttribute('data-index', index);
  square.addEventListener('click', () => handleSquareClick(index));
  gameContainer.appendChild(square);
  squares.push(square);
}

function setDifficulty(level) {
  difficulty = level;

  // Adjust the number of squares and speed based on the difficulty
  switch (level) {
    case 'easy':
      numSquares = 4; // Adjusted for a more balanced look
      speed = 1000; // Adjust as needed
      break;
    case 'medium':
      numSquares = 5;
      speed = 800; // Adjust as needed
      break;
    case 'hard':
      numSquares = 6; // Increased to 6 squares for hard level
      speed = 500; // Adjusted for a faster sequence
      break;
    default:
      numSquares = 5; // Default to medium difficulty
      speed = 800;
  }

  resetGame();
}


// ... (previous code)

function handleSquareClick(index) {
  playerSequence.push(index);

  // Add 'active' class for the neon effect temporarily
  squares[index].classList.add('active');

  setTimeout(() => {
    squares[index].classList.remove('active');
    
    // Check if it's the correct sequence after removing the 'active' class
    if (playerSequence.length === sequence.length) {
      if (JSON.stringify(playerSequence) === JSON.stringify(sequence)) {
        // Correct sequence
        round++;
        playerSequence = [];
        setTimeout(() => startRound(), 1000);
      } else {
        // Incorrect sequence
        alert('Game Over! Try again.');
        resetGame();
      }
    }
  }, 500);
}

// ... (remaining code)


function startRound() {
  generateSequence();
  showSequence();
}

function generateSequence() {
  sequence = [];

  for (let i = 0; i < numSquares; i++) {
    const randomIndex = Math.floor(Math.random() * squares.length);
    sequence.push(randomIndex);
  }
}



function playSound() {
  const audio = new Audio('click.wav'); // Replace with the actual path to your sound file
  audio.play();
}
function showSequence() {
  sequence.forEach((index, i) => {
    setTimeout(() => {
      highlightSquare(index);

      if (i === sequence.length - 1) {
        playSpecialSound();
      }
    }, i * (speed + 500)); // Add a little delay between sequences
  });
}

function highlightSquare(index) {
  

  setTimeout(() => {
    squares[index].classList.remove('active');
    squares[index].style.backgroundColor = '#7FFF00';
    squares[index].style.boxShadow = '0 0 10px red';
    squares[index].style.transform = 'scale(1.1)';
    squares[index].style.border = '2px solid blue';
    playSound();

    setTimeout(() => {
      squares[index].style.backgroundColor = '';
      squares[index].style.boxShadow = '';
      squares[index].style.transform = '';
      squares[index].style.border = '';
    }, speed / 2);
  }, speed / 2);
}

function playSpecialSound() {
  const specialAudio = new Audio('path/to/specialSound.mp3'); // Replace with the actual path to your special sound file
  specialAudio.play();

  // You can also add any other actions or logic here for completing a sequence
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  round = 1;
  startRound();
}

// Create squares
for (let i = 0; i < 4; i++) {
  createSquare(i);
}

// Start the game
startRound();
