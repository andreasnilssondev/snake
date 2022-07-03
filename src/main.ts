import { loop } from './core/loop';
import { createGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

watchCanvasSize();

function init() {
  const game = createGame();

  function destroyGame() {
    game.destroyed = true;
  }

  playButton.addEventListener('click', destroyGame, { once: true });

  loop(game);
}

playButton.addEventListener('click', init);
