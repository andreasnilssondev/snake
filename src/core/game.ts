import { canvas } from './canvas';
import { createSnake } from '../objects/snake';
import { createApple } from '../objects/apple';
import { createControls } from './controls';
import { createMenu } from '../objects/menu';
import { Game } from '../types';

// You must run "initGame" before running any other code
// This is exported as empty object to avoid circular import issues
export const game = {} as Game;

export function initGame() {
  game.fps = 1000 / 30;
  game.canvas = canvas;
  game.context = canvas.getContext('2d')!;
  game.gameOver = false;
  game.destroy = null;
  game.controls = createControls();
  game.objects = {
    snake: createSnake(),
    apple: createApple(),
    menu: createMenu(),
  };
  return game;
}

export function setGameOver() {
  game.gameOver = true;
}
