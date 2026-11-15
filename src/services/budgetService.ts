// Presupuesto del usuario: textos cortos para "Tu rango: 50 – 150 mil".
import { rangoDe } from '../design-kit/components';
import { pesos } from '../lib/format';
import type { Budget } from '../types';

export function textoRango(b: Budget): string {
  const r = rangoDe(b);
  if (r) return r;
  return `${pesos(b.min)} – ${b.max === null ? 'sin límite' : pesos(b.max)}`;
}
