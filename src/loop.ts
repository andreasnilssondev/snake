import { update } from './update';
import { draw } from './draw';
import { Game } from './types';

interface Options {
  fps: number;
  speed: number;
}

export function loop(game: Game, options?: Options) {
  const { fps = 1000 / 30, speed = 2 } = options || {};
  let startTime = 0;
  let time = 0;
  let lastInterval = 0;

  function callback(timestamp: number) {
    timestamp = Math.floor(timestamp);

    if (!startTime) {
      startTime = timestamp;
      lastInterval = timestamp - startTime;
    }

    time = timestamp - startTime;

    if (time >= lastInterval + fps * (10 / speed)) {
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
