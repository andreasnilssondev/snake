import { clearCanvas } from './canvas';
import { game } from './game';

export function render() {
  clearCanvas();
  Object.values(game.objects).forEach(({ render: renderObject }) => renderObject());
}
