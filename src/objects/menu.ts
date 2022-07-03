import { Game } from '../types';

export const playButton = document.getElementById('play-button') as HTMLButtonElement;

export function createMenu() {
  return {
    playButton,
  };
}

function isPlayButtonVisible(game: Game) {
  return game.objects.menu.playButton.style.display === 'block';
}

function showPlayButton(game: Game) {
  game.objects.menu.playButton.style.display = 'block';
}

function hidePlayButton(game: Game) {
  game.objects.menu.playButton.style.display = 'none';
}

export function drawGameOver(game: Game) {
  const { context, canvas } = game;
  const fontsize = canvas.width / 12;
  context.font = `${fontsize}px Arial`;
  context.textAlign = 'center';
  context.fillStyle = '#888';
  context.fillText('Game over', canvas.width / 2, canvas.height / 3);
}

export function drawMenu(game: Game) {
  if (game.gameOver) {
    drawGameOver(game);
  }
}

export function updateMenu(game: Game) {
  if (game.gameOver && !isPlayButtonVisible(game)) {
    showPlayButton(game);
  } else if (!game.gameOver && isPlayButtonVisible(game)) {
    hidePlayButton(game);
  }
}
