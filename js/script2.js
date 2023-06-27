document.addEventListener("DOMContentLoaded", () => {
  let scorePlayer = 0;
  let scoreEnemy = 0;
  const colors = [
    "#FD0000",
    "#0018FD",
    "#00FD0B",
    "#CF00FD",
    "#FD008A",
    "#000000",
  ];
  const canvas = document.querySelector("#pong-canvas");
  const context = canvas.getContext("2d");

  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4,
  };

  const paddle = {
    width: 10,
    height: 80,
    x: 0,
    y: canvas.height / 2 - 40,
    dy: 8,
    upPressed: false,
    downPressed: false,
  };

  const enemyPaddle = {
    width: 10,
    height: 80,
    x: canvas.width - 10,
    y: canvas.height / 2 - 40,
    dy: 8,
    upPressed: false,
    downPressed: false,
  };

  function createBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
  }

  function createPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
  }

  function createEnemyPaddle() {
    context.beginPath();
    context.rect(
      enemyPaddle.x,
      enemyPaddle.y,
      enemyPaddle.width,
      enemyPaddle.height
    );
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
  }

  function colorize() {
    const randomColor = Math.floor(Math.random() * colors.length);
    document.body.style.background = colors[randomColor];
  }

  function update() {
    if (paddle.upPressed && paddle.y > 0) {
      paddle.y -= paddle.dy;
    } else if (paddle.downPressed && paddle.y + paddle.height < canvas.height) {
      paddle.y += paddle.dy;
    }

    if (enemyPaddle.upPressed && enemyPaddle.y > 0) {
      enemyPaddle.y -= enemyPaddle.dy;
    } else if (
      enemyPaddle.downPressed &&
      enemyPaddle.y + enemyPaddle.height < canvas.height
    ) {
      enemyPaddle.y += enemyPaddle.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy *= -1;
    }

    if (
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height
    ) {
      ball.dx *= -1;
    }

    if (
      ball.x + ball.radius > canvas.width - paddle.width &&
      ball.y + ball.radius >= paddle.y &&
      ball.y - ball.radius <= paddle.y + paddle.height
    ) {
      ball.dx *= -1;
    }

    if (
      ball.x + ball.radius > canvas.width - enemyPaddle.width &&
      ball.y + ball.radius >= enemyPaddle.y &&
      ball.y - ball.radius <= enemyPaddle.y + enemyPaddle.height
    ) {
      ball.dx *= -1;
    }

    if (ball.x + ball.radius < 0) {
      scoreEnemy++;
      document.getElementById("score-enemy").textContent = scoreEnemy;
      //colorize();
      resetBall();
    } else if (ball.x - ball.radius > canvas.width) {
      scorePlayer++;
      document.getElementById("score-player").textContent = scorePlayer;
      //colorize();
      resetBall();
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    createBall();
    createPaddle();
    createEnemyPaddle();
    requestAnimationFrame(update);
  }

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
    ball.dy *= -1;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "Up") {
      enemyPaddle.upPressed = true;
    } else if (event.key === "ArrowDown" || event.key === "Down") {
      enemyPaddle.downPressed = true;
    } else if (event.key === "w" || event.key === "W") {
      paddle.upPressed = true;
    } else if (event.key === "s" || event.key === "S") {
      paddle.downPressed = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === "Up") {
      enemyPaddle.upPressed = false;
    } else if (event.key === "ArrowDown" || event.key === "Down") {
      enemyPaddle.downPressed = false;
    } else if (event.key === "w" || event.key === "W") {
      paddle.upPressed = false;
    } else if (event.key === "s" || event.key === "S") {
      paddle.downPressed = false;
    }
  });

  update();
});
