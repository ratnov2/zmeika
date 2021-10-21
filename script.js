var canvas = document.getElementById('game');

var context = canvas.getContext('2d');

var grid = 16;

var count = 0;

var snake = {
  x: 160,
  y: 160,

  dx: grid,
  dy: 0,

  cells: [],
  maxCells: 4
}
var apple = {
  x: 320,
  y: 320
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {

  requestAnimationFrame(loop);

  if (++count < 4) {
    return
  }
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;

  snake.cells.unshift({ x: snake.x, y: snake.y });
  console.log('x', snake.cells);

  if (snake.x < 0 || snake.y < 0 || snake.x > canvas.width || snake.y > canvas.height) {
    restart()
  }

  // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно особождает клетки после себя
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }


  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  context.fillStyle = 'green';

  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x == apple.x && cell.y == apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      // Если такие клетки есть — начинаем игру заново
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // Задаём стартовые параметры основным переменным
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        // Ставим яблочко в случайное место
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }

  })
}
document.addEventListener('keydown', (e) => {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
})
function restart() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  // Ставим яблочко в случайное место
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
}
requestAnimationFrame(loop);