import { game } from '../core/game';
import { Menu } from '../types';

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

export function init() {
  hidePlayButton();

  Object.assign(game.objects.menu, { playButton });
}

export function renderGameOver() {
  const { context, canvasSize } = game;
  const fontsize = canvasSize / 12;
  context.font = `${fontsize}px Arial`;
  context.textAlign = 'center';
  context.fillStyle = '#888';
  context.fillText('Game over', canvasSize / 2, canvasSize / 3);
}

export function update() {
  if (game.gameOver && !isPlayButtonVisible()) {
    showPlayButton();
  } else if (!game.gameOver && isPlayButtonVisible()) {
    hidePlayButton();
  }
}

export function render() {
  if (game.gameOver) {
    renderGameOver();
  }
}

export const menu = { init, update, render } as Menu;
