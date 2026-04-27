// Snake Game Logic
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snake-canvas');
  if (!canvas) return; // Prevent errors if not on the snake page
  
  const ctx = canvas.getContext('2d');
  const scoreElement = document.getElementById('score');
  const highScoreElement = document.getElementById('high-score');
  const startScreen = document.getElementById('start-screen');
  const gameOverScreen = document.getElementById('game-over-screen');
  const finalScoreElement = document.getElementById('final-score');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;
  
  let snake = [];
  let food = { x: 15, y: 15, char: '0' };
  let dx = 0;
  let dy = -1;
  let score = 0;
  let highScore = localStorage.getItem('snakeHighScore') || 0;
  let gameLoop;
  let gameSpeed = 120;
  let isPlaying = false;

  highScoreElement.textContent = highScore;

  function initGame() {
    snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
    ];
    dx = 0;
    dy = -1;
    score = 0;
    gameSpeed = 120;
    scoreElement.textContent = score;
    spawnFood();
    isPlaying = true;
    
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    if(gameLoop) clearTimeout(gameLoop);
    tick();
  }

  function tick() {
    if (!isPlaying) return;
    
    if (checkCollision()) {
      gameOver();
      return;
    }

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();

    gameLoop = setTimeout(tick, gameSpeed);
  }

  function clearCanvas() {
    ctx.fillStyle = '#050a05';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawSnake() {
    ctx.fillStyle = '#00ff41';
    ctx.strokeStyle = '#050a05';
    
    snake.forEach((part, index) => {
      // Head has a brighter color
      if (index === 0) {
        ctx.fillStyle = '#39ff14';
      } else {
        ctx.fillStyle = '#00cc33';
      }
      
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
      ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
      
      // Draw faint matrix characters in the body sometimes for effect
      if (index > 0 && index % 3 === 0) {
        ctx.fillStyle = 'rgba(5, 10, 5, 0.5)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.random() > 0.5 ? '0' : '1', part.x * gridSize + gridSize/2, part.y * gridSize + gridSize/2);
      }
    });
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreElement.textContent = score;
      gameSpeed = Math.max(50, gameSpeed - 2); // increase speed
      spawnFood();
    } else {
      snake.pop();
    }
  }

  function drawFood() {
    ctx.fillStyle = '#00ff41';
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add a glow effect
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 10;
    ctx.fillText(food.char, food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2);
    ctx.shadowBlur = 0; // reset
  }

  function spawnFood() {
    let newX, newY, onSnake;
    do {
      newX = Math.floor(Math.random() * tileCount);
      newY = Math.floor(Math.random() * tileCount);
      onSnake = snake.some(part => part.x === newX && part.y === newY);
    } while (onSnake);

    food = {
      x: newX,
      y: newY,
      char: Math.random() > 0.5 ? '0' : '1'
    };
  }

  function checkCollision() {
    const head = snake[0];
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function gameOver() {
    isPlaying = false;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snakeHighScore', highScore);
      highScoreElement.textContent = highScore;
    }
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
  }

  document.addEventListener('keydown', (e) => {
    // Prevent scrolling with arrows when playing
    if (isPlaying && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault();
    }

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (e.key === 'ArrowLeft' && !goingRight) { dx = -1; dy = 0; }
    if (e.key === 'ArrowUp' && !goingDown) { dx = 0; dy = -1; }
    if (e.key === 'ArrowRight' && !goingLeft) { dx = 1; dy = 0; }
    if (e.key === 'ArrowDown' && !goingUp) { dx = 0; dy = 1; }
  });

  startBtn.addEventListener('click', initGame);
  restartBtn.addEventListener('click', initGame);
});
