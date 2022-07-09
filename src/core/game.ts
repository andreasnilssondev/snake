import { canvas } from './canvas';
import { apple } from '../objects/apple';
import { snake } from '../objects/snake';
import { menu } from '../objects/menu';
import { controls } from '../objects/controls';
import { Game } from '../types';

// You must run "initGame" before running any other code
// This is exported as empty object to avoid circular import issues
export const game: Game = {
  isRunning: false,
  fps: 100 / 30,
  canvas,
  context: canvas.getContext('2d')!,
  gameOver: false,
  destroy: null,
  objects: {
    apple,
    snake,
    menu,
    controls,
  },
};

export function initGame() {
  game.isRunning = true;
  // TODO: add cleanup functions if necessary
  Object.values(game.objects).forEach(({ init }) => init());
}

export function setGameOver() {
  game.gameOver = true;
}
