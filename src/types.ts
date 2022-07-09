import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from './objects/controls';

export type Direction = typeof KEY_LEFT | typeof KEY_UP | typeof KEY_RIGHT | typeof KEY_DOWN;

export interface Position {
  x: number;
  y: number;
}

interface GameObject {
  init: () => void;
  render: () => void;
  update: () => void;
  cleanup?: () => void;
}

export interface Apple extends GameObject {
  x: number;
  y: number;
  size: number;
}

export interface Snake extends GameObject {
  x: number;
  y: number;
  size: number;
  tail: Position[];
  shouldGrow: boolean;
  speed: number;
  timeSinceLastUpdate: null | number;
}

export interface Menu extends GameObject {
  playButton: HTMLButtonElement;
}

export interface Controls extends GameObject {
  currentKey: Direction;
  lastKey: Direction;
  touchDirection: Direction | null;
  touchStartPosition: Position | null;
  watching: boolean;
}

export interface Game {
  isRunning: boolean;
  fps: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gameOver: boolean;
  objects: {
    snake: Snake;
    apple: Apple;
    menu: Menu;
    controls: Controls;
  };
}
