export const playButton = document.getElementById('play-button') as HTMLButtonElement;

export function showPlayButton() {
  playButton.style.display = 'block';
}

export function hidePlayButton() {
  playButton.style.display = 'none';
}
