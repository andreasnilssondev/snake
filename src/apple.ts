import { getRandomPosition } from './canvas';
import { Apple } from './types';

export function createApple(canvas: HTMLCanvasElement) {
  const size = 25;
  const { x, y } = getRandomPosition({ canvas, size });
  return { x, y, size };
}

interface DrawApple {
  apple: Apple;
  context: CanvasRenderingContext2D;
}

export function drawApple({ apple, context }: DrawApple) {
  const { x, y, size } = apple;
  context.fillStyle = 'red';
  context.fillRect(x, y, size, size);
}
