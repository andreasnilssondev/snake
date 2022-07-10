import { game } from '../core/game';
import { Apple } from '../types';
import appleImage from '../images/apple.png';

export function getRandomPosition() {
  const { canvasSize } = game;
  const size = canvasSize / 20;
  const x = Math.floor(Math.random() * (canvasSize / size)) * size;
  const y = Math.floor(Math.random() * (canvasSize / size)) * size;
  return { x, y };
}

function isBeingEatenBySnake() {
  const { snake, apple } = game.objects;
  return snake.x === apple.x && snake.y === apple.y;
}

export function init() {
  const { canvasSize } = game;
  const size = canvasSize / 20;
  const { x, y } = getRandomPosition();
  Object.assign(game.objects.apple, { x, y, size });

  if (!game.objects.apple.img) {
    const img = new Image();
    img.src = appleImage;

    img.addEventListener('load', () => {
      game.objects.apple.img = img;
    });
  }
}

export function render() {
  const { objects, context } = game;
  const { apple } = objects;
  const { x, y, size, img } = apple;

  if (!img) {
    return;
  }

  context.drawImage(img, x, y, size, size);
}

export function update() {
  if (game.gameOver) {
    return;
  }

  if (isBeingEatenBySnake()) {
    init();
  }
}

export const apple = { init, update, render } as Apple;
