import { loop } from './core/loop';
import { initGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

watchCanvasSize();

function init() {
  initGame();
  loop();

  playButton.addEventListener('click', initGame);
}

playButton.addEventListener('click', init, { once: true });
