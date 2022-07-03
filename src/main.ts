import { loop } from './core/loop';
import { initGame } from './core/game';
import { playButton } from './objects/menu';
import { watchCanvasSize } from './core/canvas';

const game = initGame();
watchCanvasSize();

function resetGame() {
  game.destroy = () => {
    initGame();
    loop();
  };
}

function init() {
  initGame();
  loop();

  playButton.addEventListener('click', resetGame);
}

playButton.addEventListener('click', init, { once: true });
