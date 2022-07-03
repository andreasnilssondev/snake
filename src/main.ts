import { loop } from './core/loop';
import { createGame, destroyGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

watchCanvasSize();

function init() {
  const game = createGame();

  playButton.addEventListener('click', () => destroyGame(game), { once: true });

  loop(game);
}

playButton.addEventListener('click', init);
