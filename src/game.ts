import { getCanvas } from './canvas';
import { createSnake } from './snake';
import { createApple } from './apple';
import { createControls } from './controls';
import { hidePlayButton } from './menu';
import { Game } from './types';

export function createGame() {
  const canvas = getCanvas();

  const game = {
    canvas,
    context: canvas.getContext('2d')!,
    gameOver: false,
    snake: createSnake(),
    apple: createApple(canvas),
    controls: createControls(),
  };

  return game;
}

export function setGameOver(game: Game) {
  game.gameOver = true;
  hidePlayButton();
}
