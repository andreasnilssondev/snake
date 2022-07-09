import { game } from './game';

export function update() {
  Object.values(game.objects).forEach(({ update: updateObject }) => updateObject());
}
