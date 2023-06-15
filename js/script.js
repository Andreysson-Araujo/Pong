document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("#pong-canvas");
  const context = canvas.getContext("2d")

  
  const paddle = {
    paddleWidth: 10,
    paddleHeight: 80,
    x: 0,
    y: canvas.height / 2 - 40,
    dy: 8,
    upPressed: false,
    downPressed: false,
  };


  //DESENHA BOLA


  function createPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.paddleWidth, paddle.paddleHeight);
    context.fillStyle = "#fff"
    context.fill();
    context.closePath()
  }


  function update() {
    if (paddle.upPressed && paddle.y > 0) {
      paddle.y -= paddle.dy
    } else if (paddle.downPressed && paddle.y + paddle.heigth < canvas.heigth){
      paddle.y += paddle.dy
    }

    context.clearRect(0, 0 , canvas.padlleWidth , canvas.paddleHeight)

    createPaddle()
    requestAnimationFrame(update)
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
})

