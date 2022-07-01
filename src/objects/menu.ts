import { Game } from '../types';

export const playButton = document.getElementById('play-button') as HTMLButtonElement;

export function createMenu() {
  return {
    playButton,
  };
}

function showPlayButton(game: Game) {
  game.objects.menu.playButton.style.display = 'block';
}

function hidePlayButton(game: Game) {
  game.objects.menu.playButton.style.display = 'none';
}

export function drawGameOver(game: Game) {
  const { context, canvas } = game;
  context.font = '40px Arial';
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
  if (game.gameOver) {
    showPlayButton(game);
  } else {
    hidePlayButton(game);
  }
}
