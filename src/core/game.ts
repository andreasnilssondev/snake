import { getCanvas } from './canvas';
import { createSnake } from '../objects/snake';
import { createApple } from '../objects/apple';
import { createControls, watchControls } from './controls';
import { Game } from '../types';
import { createMenu } from '../objects/menu';

export function createGame() {
  const canvas = getCanvas();

  const game = {
    canvas,
    context: canvas.getContext('2d')!,
    gameOver: false,
    controls: createControls(),
    objects: {
      snake: createSnake(canvas),
      apple: createApple(canvas),
      menu: createMenu(),
    },
  };

  watchControls(game);

  return game;
}

export function setGameOver(game: Game) {
  game.gameOver = true;
}
