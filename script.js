const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20; // Size of each square
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Snake setup
let snake = [{ x: 5, y: 5 }];
let direction = 'right';
let food = spawnFood();
let score = 0;

// Key listeners for controlling snake direction
document.addEventListener('keydown', changeDirection);

// Game loop
function gameLoop() {
  if (isGameOver()) return alert('Game Over!');

  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawFood();
    drawSnake();
    updateScore();

    gameLoop();
  }, 100);
}

// Change snake direction based on keypress
function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== 'right') {
    direction = 'left';
  } else if (key === 38 && direction !== 'down') {
    direction = 'up';
  } else if (key === 39 && direction !== 'left') {
    direction = 'right';
  } else if (key === 40 && direction !== 'up') {
    direction = 'down';
  }
}

// Move the snake based on its direction
function moveSnake() {
  const head = Object.assign({}, snake[0]);

  if (direction === 'up') head.y -= 1;
  if (direction === 'down') head.y += 1;
  if (direction === 'left') head.x -= 1;
  if (direction === 'right') head.x += 1;

  snake.unshift(head); // Add new head to the front of the snake

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood(); // Spawn new food
  } else {
    snake.pop(); // Remove the last segment if no food is eaten
  }
}

// Draw the snake on the canvas
function drawSnake() {
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'green' : 'lightgreen'; // Head is darker
    ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
  });
}

// Draw food on the canvas
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

// Spawn food at random position
function spawnFood() {
  let foodX = Math.floor(Math.random() * columns);
  let foodY = Math.floor(Math.random() * rows);
  return { x: foodX, y: foodY };
}

// Update the score displayed on the screen
function updateScore() {
  document.getElementById('score').innerText = `Score: ${score}`;
}

// Check if the snake has collided with walls or itself
function isGameOver() {
  const head = snake[0];

  // Check if snake hits the wall
  if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
    return true;
  }

  // Check if snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Start the game
gameLoop();
