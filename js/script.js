document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#pong-canvas");
  const context = canvas.getContext("2d")


  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
  }



  const paddle = {
    width: 10,
    height: 80,
    x: 0,
    y: canvas.height / 2 - 40,
    dy: 8,
    upPressed: false,
    downPressed: false,
  };

  const clonePaddle = {
    width: 10,
    height: 500,
    x: 0,
    y: canvas.height / 2 - 40,
    dy: 8,
    upPressed: false,
    downPressed: false,
  };


  //DESENHA BOLA

  function createBall(){
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      context.fillStyle = "#fff"
      context.fill();
      context.closePath()
  }


  function createPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#fff"
    context.fill();
    context.closePath()
  }

  function createOpponentPaddle() {
    const opponentPaddleX = canvas.width - clonePaddle.width - clonePaddle.x; // Posição X do clone da raquete
    const opponentPaddley = clonePaddle.y = 0
    context.beginPath();
    context.rect(opponentPaddleX, clonePaddle.y, clonePaddle.width, clonePaddle.height);
    context.fillStyle = "#fff";
    context.fill();
    context.closePath();
  }
  


  function update() {
  if (paddle.upPressed && paddle.y > 0) {
    paddle.y -= paddle.dy;
  } else if (paddle.downPressed && paddle.y + paddle.height < canvas.height) {
    paddle.y += paddle.dy;
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
    ball.x + ball.radius > canvas.width - paddle.width && // Verificar colisão horizontal
    ball.y + ball.radius >= paddle.y && // Verificar colisão superior
    ball.y - ball.radius <= paddle.y + paddle.height // Verificar colisão inferior
  ) {
    ball.dx *= -1; // Inverter direção horizontal da bola
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  createBall();
  createPaddle();

  //clone 
  createOpponentPaddle()
  
  requestAnimationFrame(update);
}

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key === "Up") {
      paddle.upPressed = true;
    } else if (event.key === "ArrowDown" || event.key === "Down") {
      paddle.downPressed = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key === "Up") {
      paddle.upPressed = false;
    } else if (event.key === "ArrowDown" || event.key === "Down") {
      paddle.downPressed = false;
    }
  });


  update()
});

