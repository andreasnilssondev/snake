import { loop } from './core/loop';
import { createGame } from './core/game';
import { playButton } from './objects/menu';

function init() {
  const game = createGame();
  loop(game);
}

playButton.addEventListener('click', init);
