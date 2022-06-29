import { getCanvas } from './canvas';
import { createSnake } from './snake';
import { createApple } from './apple';
import { createControls } from './controls';

export function createGame() {
  const canvas = getCanvas();

  return {
    canvas,
    context: canvas.getContext('2d')!,
    gameOver: false,
    snake: createSnake(),
    apple: createApple(canvas),
    controls: createControls(),
  };
}
