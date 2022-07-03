import { getCanvas } from './canvas';
import { createSnake } from '../objects/snake';
import { createApple } from '../objects/apple';
import { createControls } from './controls';
import { Game } from '../types';
import { createMenu } from '../objects/menu';

export function createGame() {
  const canvas = getCanvas();

  const game = {
    fps: 1000 / 30,
    canvas,
    context: canvas.getContext('2d')!,
    gameOver: false,
    destroyed: false,
    controls: createControls(),
    objects: {
      snake: createSnake(canvas),
      apple: createApple(canvas),
      menu: createMenu(),
    },
  };

  return game;
}

export function setGameOver(game: Game) {
  game.gameOver = true;
}

export function destroyGame(game: Game) {
  game.destroyed = true;
}
