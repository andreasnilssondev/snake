import { game } from '../core/game';

export const playButton = document.getElementById('play-button') as HTMLButtonElement;

export function createMenu() {
  return {
    playButton,
  };
}

function isPlayButtonVisible() {
  return game.objects.menu.playButton.style.display === 'block';
}

function showPlayButton() {
  game.objects.menu.playButton.style.display = 'block';
}

function hidePlayButton() {
  game.objects.menu.playButton.style.display = 'none';
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
