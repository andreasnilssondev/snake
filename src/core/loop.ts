import { update } from './update';
import { draw } from './draw';
import { Game } from '../types';

const FPS = 1000 / 30;
const SPEED = 2;

export function loop(game: Game) {
  let startTime: number | null = null;
  let time = 0;
  let lastInterval = 0;

  function callback(timestamp: number) {
    timestamp = Math.floor(timestamp);

    if (startTime === null) {
      startTime = timestamp;
      lastInterval = timestamp - startTime;
    }

    time = timestamp - startTime;

    if (time >= lastInterval + FPS * (10 / SPEED)) {
      lastInterval = time;
      update(game);
      draw(game);
    }

    if (!game.gameOver) {
      requestAnimationFrame(callback);
    }
  }

  requestAnimationFrame(callback);
}
