import { Direction, Position, Controls } from '../types';
import { game } from '../core/game';

export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_RIGHT = 39;
export const KEY_DOWN = 40;

const VALID_KEYS = new Set([KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN]);

export const DIRECTIONS = {
  [KEY_LEFT]: [-1, 0],
  [KEY_UP]: [0, -1],
  [KEY_RIGHT]: [1, 0],
  [KEY_DOWN]: [0, 1],
};

const oppositeKey = {
  [KEY_LEFT]: KEY_RIGHT,
  [KEY_UP]: KEY_DOWN,
  [KEY_RIGHT]: KEY_LEFT,
  [KEY_DOWN]: KEY_UP,
};

function isDirection(number: number): number is Direction {
  return VALID_KEYS.has(number);
}

function getDirectionFromPositions(prevLocation: Position, newLocation: Position) {
  // Not large enough to be interpreted as an intended direction change
  if (
    Math.abs(prevLocation.x - newLocation.x) < 20 &&
    Math.abs(prevLocation.y - newLocation.y) < 20
  ) {
    return null;
  }

  const isXDiffLargerThanY =
    Math.abs(prevLocation.x - newLocation.x) > Math.abs(prevLocation.y - newLocation.y);

  if (isXDiffLargerThanY) {
    if (prevLocation.x < newLocation.x) {
      return KEY_RIGHT;
    }

    return KEY_LEFT;
  }

  if (prevLocation.y < newLocation.y) {
    return KEY_DOWN;
  }

  return KEY_UP;
}

export function update() {
  // nothing to do here
}

export function init() {
  Object.assign(game.objects.controls, {
    currentKey: KEY_RIGHT as Direction,
    lastKey: KEY_RIGHT as Direction,
    touchStartPosition: null,
    touchDirection: null,
    watching: false,
  });

  const { canvas, objects } = game;
  const { controls } = objects;

  function handleKeydown(event: KeyboardEvent) {
    if (isDirection(event.keyCode) && oppositeKey[event.keyCode] !== controls.lastKey) {
      controls.currentKey = event.keyCode;
    }
  }

  function handleTouchStart(event: TouchEvent) {
    const { clientX: x, clientY: y } = event.touches[0];
    controls.touchStartPosition = { x, y };
  }

  function handleTouchEnd() {
    controls.touchStartPosition = null;
    controls.touchDirection = null;
  }

  function handleTouchMove(event: TouchEvent) {
    if (controls.touchStartPosition !== null) {
      event.preventDefault();

      const { clientX: x, clientY: y } = event.touches[0];
      const currentPosition = { x, y };
      const direction = getDirectionFromPositions(controls.touchStartPosition, currentPosition);

      // This just shows what direction you're trying to go, it doesn't necessarily move the snake in that direction
      controls.touchDirection = direction;

      if (direction !== null && oppositeKey[direction] !== controls.lastKey) {
        controls.currentKey = direction;
      }
    }
  }

  function watch() {
    document.addEventListener('keydown', handleKeydown);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);
  }

  function cleanup() {
    document.removeEventListener('keydown', handleKeydown);
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchend', handleTouchEnd);
    canvas.removeEventListener('touchmove', handleTouchMove);
  }

  watch();
  game.objects.controls.cleanup = cleanup;
}

export function render() {
  const { context, canvas, objects } = game;
  const { controls } = objects;

  if (controls.touchStartPosition !== null) {
    const circleX = controls.touchStartPosition.x - canvas.clientLeft;
    const circleY = controls.touchStartPosition.y - canvas.clientTop;
    context.beginPath();
    context.fillStyle = 'rgba(50, 50, 150, 0.4)';
    context.arc(circleX, circleY, 50, 0, 2 * Math.PI);
    context.fill();

    let x = circleX;
    let y = circleY;

    if (controls.touchDirection === KEY_RIGHT) {
      x += 20;
    } else if (controls.touchDirection === KEY_LEFT) {
      x -= 20;
    } else if (controls.touchDirection === KEY_DOWN) {
      y += 20;
    } else if (controls.touchDirection === KEY_UP) {
      y -= 20;
    }

    context.beginPath();
    context.fillStyle = 'rgba(50, 50, 150, 0.4)';
    context.arc(x, y, 25, 0, 2 * Math.PI);
    context.fill();
  }
}

export const controls = { init, update, render } as Controls;
