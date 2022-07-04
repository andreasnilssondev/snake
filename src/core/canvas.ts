import { game } from './game';

export const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;

const canvasContainer = document.getElementById('canvas-container')!;

export function clearCanvas() {
  const { context } = game;
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export function watchCanvasSize() {
  const originalSize = canvas.width;

  function resizeCanvas() {
    const maxWidth = window.innerWidth - 20;
    const maxHeight = window.innerHeight - 100;
    const size = Math.min(maxWidth, maxHeight);
    canvasContainer.style.width = `${size}px`;
    canvasContainer.style.height = `${size}px`;
    const scale = size / originalSize;
    canvas.style.transform = `scale(${scale})`;
    canvas.setAttribute('data-scale', scale.toString());
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
}
