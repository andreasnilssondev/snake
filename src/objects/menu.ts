import { game } from '../core/game';

export const playButton = document.getElementById('play-button') as HTMLButtonElement;

function isPlayButtonVisible() {
  return playButton.style.display === 'block';
}

function showPlayButton() {
  playButton.style.display = 'block';
}

function hidePlayButton() {
  playButton.style.display = 'none';
}

export function createMenu() {
  showPlayButton();

  return {
    playButton,
  };
}

export function renderGameOver() {
  const { context, canvas } = game;
  const fontsize = canvas.width / 12;
  context.font = `${fontsize}px Arial`;
  context.textAlign = 'center';
  context.fillStyle = '#888';
  context.fillText('Game over', canvas.width / 2, canvas.height / 3);
}

export function renderMenu() {
  if (game.gameOver) {
    renderGameOver();
  }
}

export function updateMenu() {
  if (game.gameOver && !isPlayButtonVisible()) {
    showPlayButton();
  } else if (!game.gameOver && isPlayButtonVisible()) {
    hidePlayButton();
  }
}
