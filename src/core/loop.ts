import { update } from './update';
import { render } from './render';
import { game } from './game';

export function loop() {
  let lastUpdate: number | null = null;

  function callback(timestamp: number) {
    if (!game.destroyed) {
      // call requestAnimationFrame before running the update logic so the browser can plan ahead
      requestAnimationFrame(callback);
    }

    if (lastUpdate === null) {
      // Handle the first update
      lastUpdate = timestamp;
      return;
    }

    const timeSinceLastUpdate = timestamp - lastUpdate;
    let numberOfUpdates = Math.floor(timeSinceLastUpdate / game.fps);

    // Run all updates before render, as there may be catching up to do
    // for example if it's slow or the browser tab is inactive
    while (numberOfUpdates > 0) {
      update();
      numberOfUpdates -= 1;

      if (numberOfUpdates === 0) {
        lastUpdate = timestamp;
      }
    }

    render();
  }

  requestAnimationFrame(callback);
}
