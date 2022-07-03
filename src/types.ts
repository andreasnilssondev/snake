import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from './core/controls';

export type Direction = typeof KEY_LEFT | typeof KEY_UP | typeof KEY_RIGHT | typeof KEY_DOWN;

export interface Position {
  x: number;
  y: number;
}

export interface Controls {
  currentKey: Direction;
  lastKey: Direction;
  touchStartPosition: Position | null;
  watching: boolean;
}

interface Apple extends Position {
  size: number;
}

interface Snake extends Position {
  size: number;
  tail: Position[];
  shouldGrow: boolean;
  speed: number;
  timeSinceLastUpdate: null | number;
}

interface Menu {
  playButton: HTMLButtonElement;
}

export interface Game {
  fps: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  destroyed: boolean;
  gameOver: boolean;
  controls: Controls;
  objects: {
    snake: Snake;
    apple: Apple;
    menu: Menu;
  };
}
