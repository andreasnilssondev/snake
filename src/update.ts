import { checkFood } from './utils/checkFood';
import { moveSnake } from './snake';
import { showPlayButton } from './menu'
import { Game } from './types';

export function update(game: Game) {
  const { snake, controls, canvas } = game;

  const setGameOver = () => {
    game.gameOver = true;
    showPlayButton();
  }

  game.snake = moveSnake({ snake, controls, canvas, setGameOver });

  checkFood(game);
}
