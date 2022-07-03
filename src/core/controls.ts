import { Direction, Game, Position } from '../types';

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

export function createControls() {
  return {
    currentKey: KEY_RIGHT as Direction,
    lastKey: KEY_RIGHT as Direction,
    touchStartPosition: null,
    watching: false,
  };
}

function getDirectionFromPositions(prevLocation: Position, newLocation: Position) {
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

export function updateControls(game: Game) {
  const { canvas, controls } = game;

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
  }

  function handleTouchMove(event: TouchEvent) {
    if (controls.touchStartPosition !== null) {
      event.preventDefault();

      const { clientX: x, clientY: y } = event.touches[0];
      const currentPosition = { x, y };
      const direction = getDirectionFromPositions(controls.touchStartPosition, currentPosition);

      if (oppositeKey[direction] !== controls.lastKey) {
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

  if (!game.gameOver && !game.controls.watching) {
    watch();
  }

  if (game.gameOver && game.controls.watching) {
    cleanup();
  }
}

export function drawControls(game: Game) {
  const { controls, context } = game;
  if (controls.touchStartPosition !== null) {
    context.beginPath();
    context.fillStyle = 'rgba(50, 50, 150, 0.4)';
    context.arc(controls.touchStartPosition.x, controls.touchStartPosition.y, 50, 0, 2 * Math.PI);
    context.fill();

    let { x } = controls.touchStartPosition;
    let { y } = controls.touchStartPosition;

    if (controls.currentKey === KEY_RIGHT) {
      x += 20;
    } else if (controls.currentKey === KEY_LEFT) {
      x -= 20;
    } else if (controls.currentKey === KEY_DOWN) {
      y += 20;
    } else if (controls.currentKey === KEY_UP) {
      y -= 20;
    }

    context.beginPath();
    context.fillStyle = 'rgba(50, 50, 150, 0.4)';
    context.arc(x, y, 25, 0, 2 * Math.PI);
    context.fill();
  }
}
