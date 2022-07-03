import { loop } from './core/loop';
import { createGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

watchCanvasSize();

function init() {
  const game = createGame();
  loop(game);
}

playButton.addEventListener('click', init);
