const canvas = document.querySelector('canvas');
canvas.width = 600;
canvas.height = 600;
let animate = null;

const ctx = canvas.getContext('2d');

const player = {
  posX: 600 / 2 - 10,
  posY: 600 / 2 - 10,
  speedVal: 2,
  moveDir: [0, 0],
  draw: () => {
    animate = requestAnimationFrame(player.draw);

    player.checkPos();

    ctx.clearRect(0, 0, 600, 600);
    ctx.beginPath();
    fruit.check();
    if(fruit.spawned === true) {
      fruit.draw();
    } else {
      fruit.spawn();
    }
    ctx.strokeRect(player.posX, player.posY, 20, 20);
    if(player.moveDir[0] !== 0) {
      player.posX += player.moveDir[0];
    } else if(player.moveDir[1] !== 0) {
      player.posY += player.moveDir[1];
    }
    ctx.stroke();
  },
  movement: e => {
    console.log(e);
    if(e.key === 'a' || e.key === 'ArrowLeft') {
      player.moveDir[0] = -player.speedVal;
      player.moveDir[1] = 0;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
      player.moveDir[0] = player.speedVal;
      player.moveDir[1] = 0;
    } else if (e.key === 'w' || e.key === 'ArrowUp') {
      player.moveDir[0] = 0;
      player.moveDir[1] = -player.speedVal;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
      player.moveDir[0] = 0;
      player.moveDir[1] = player.speedVal;
    }
  },
  checkPos: () => {
    if(player.posX <= 0 || player.posX + 20 >= canvas.width || player.posY <= 0 || player.posY + 20 >= canvas.height) {
      player.gameOver();
    }
  },
  gameOver: () => {
    cancelAnimationFrame(animate);
    player.movement = () => {};
    console.log('GAME OVER!');
  }
};
const fruit = {
  posX: 0,
  posY: 0,
  spawned: false,
  spawn: () => {
    fruit.spawned = true;
    fruit.posX = Math.random() * ((canvas.width - 20) - 10) + 10;
    fruit.posY = Math.random() * ((canvas.height - 20) - 10) + 10;
  },
  draw: () => {
    ctx.arc(fruit.posX, fruit.posY, 5, 0, Math.PI * 2);
  },
  check: () => {
    if (fruit.posX + 10 >= player.posX && fruit.posX - 10 <= player.posX + 20 && fruit.posY + 10 >= player.posY && fruit.posY - 10 <= player.posY + 20) {
      fruit.spawn();
      console.log('Fruit eaten');
    }
  }
};

player.draw();
document.addEventListener('keydown', e => player.movement(e));