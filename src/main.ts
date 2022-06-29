import { loop } from './loop';
import { createGame } from './game';
import { watchControls } from './controls';
import { hidePlayButton, playButton } from './menu';

function init() {
  hidePlayButton();
  const game = createGame();
  watchControls(game);
  loop(game);
}

playButton.addEventListener('click', init);
