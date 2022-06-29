import { Direction, Game, Controls } from './types';

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
  return { currentKey: KEY_RIGHT, lastKey: KEY_RIGHT } as Controls;
}

export function watchControls(game: Game) {
  function handleKeydown(event: KeyboardEvent) {
    if (isDirection(event.keyCode) && oppositeKey[event.keyCode] !== game.controls.lastKey) {
      game.controls.lastKey = game.controls.currentKey;
      game.controls.currentKey = event.keyCode;
    }
  }

  document.addEventListener('keydown', handleKeydown);
}
