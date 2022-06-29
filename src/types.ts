import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from './controls';

export type Direction = typeof KEY_LEFT | typeof KEY_UP | typeof KEY_RIGHT | typeof KEY_DOWN;

export interface Controls {
  currentKey: Direction;
  lastKey: Direction;
}

export interface Position {
  x: number;
  y: number;
}

export interface Apple extends Position {
  size: number;
}

export interface Snake extends Position {
  size: number;
  tail: Position[];
  shouldGrow: boolean;
}

export interface Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameOver: boolean;
  snake: Snake;
  controls: Controls;
  apple: Apple;
}
