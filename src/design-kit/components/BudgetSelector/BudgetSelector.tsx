// Figma: Range slider COP 2010:288 y Selector de presupuesto 2141:40399
// (Rango=Gratis 2172:2 · Hasta 50 mil 2141:40271 · 50 – 150 mil 2141:40303 · 150 – 300 mil 2141:40335 · Sin límite 2141:40367)
import type { Budget } from '../../../types';
import { cx } from '../../../lib/cx';
import { pesos } from '../../../lib/format';
import { Chip } from '../Chip';
import styles from './BudgetSelector.module.css';

export const TOPE = 300_000;
const PASO = 10_000;

export type Rango = 'Gratis' | 'Hasta 50 mil' | '50 – 150 mil' | '150 – 300 mil' | 'Sin límite';
export const RANGOS: Record<Rango, Budget> = {
  'Gratis': { min: 0, max: 0 },
  'Hasta 50 mil': { min: 0, max: 50_000 },
  '50 – 150 mil': { min: 50_000, max: 150_000 },
  '150 – 300 mil': { min: 150_000, max: null },
  'Sin límite': { min: 0, max: null },
};

export function rangoDe(b: Budget): Rango | null {
  for (const [k, v] of Object.entries(RANGOS)) if (v.min === b.min && v.max === b.max) return k as Rango;
  return null;
}

export function textoPresupuesto(b: Budget): string {
  if (b.max === 0) return 'Solo eventos gratis';
  if (b.min === 0 && b.max === null) return 'Sin límite de precio';
  if (b.min === 0) return `Hasta ${pesos(b.max!)}`;
  return `${pesos(b.min)} – ${b.max === null ? pesos(TOPE) : pesos(b.max)}`;
}

type Props = { value: Budget; onChange: (b: Budget) => void; className?: string };

export function RangeSlider({ value, onChange, className }: Props) {
  const max = value.max === null ? TOPE : value.max;
  const pct = (n: number) => `${(n / TOPE) * 100}%`;
  const single = value.max === 0;
  return (
    <div className={cx(styles.slider, className)}>
      <p className={styles.valor} aria-live="polite">{textoPresupuesto(value)}</p>
      <div className={styles.pista}>
        {!single && <span className={styles.activo} style={{ left: pct(value.min), width: `calc(${pct(max)} - ${pct(value.min)})` }} />}
        <input
          type="range" min={0} max={TOPE} step={PASO} value={value.min}
          aria-label="Precio mínimo" aria-valuetext={pesos(value.min)}
          className={styles.range}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), max);
            onChange({ min: v, max: single && v > 0 ? v : value.max });
          }}
        />
        {!single && (
          <input
            type="range" min={0} max={TOPE} step={PASO} value={max}
            aria-label="Precio máximo" aria-valuetext={max >= TOPE ? `${pesos(TOPE)} o más` : pesos(max)}
            className={styles.range}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), value.min);
              onChange({ min: value.min, max: v >= TOPE ? null : v });
            }}
          />
        )}
      </div>
      <p className={styles.extremos}><span>$0</span><span>$300.000+</span></p>
    </div>
  );
}

export function BudgetSelector({ value, onChange, className }: Props) {
  const actual = rangoDe(value);
  return (
    <div className={cx(styles.selector, className)}>
      <RangeSlider value={value} onChange={onChange} />
      <div className={styles.opciones} role="group" aria-label="Atajos de presupuesto">
        {(Object.keys(RANGOS) as Rango[]).map((r) => (
          <Chip key={r} estado={actual === r ? 'Seleccionado' : 'Default'} onClick={() => onChange(RANGOS[r])}>{r}</Chip>
        ))}
      </div>
    </div>
  );
}
