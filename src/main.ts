import { loop } from './core/loop';
import { destroyGame, initGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

initGame();
watchCanvasSize();

function init() {
  initGame();
  playButton.addEventListener('click', destroyGame, { once: true });
  loop();
}

playButton.addEventListener('click', init);
