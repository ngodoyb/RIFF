// Figma: Progress steps 2010:278
import { cx } from '../../../lib/cx';
import styles from './ProgressSteps.module.css';

export function ProgressSteps({ paso, total = 4, nombre, className }: { paso: number; total?: number; nombre: string; className?: string }) {
  const pct = Math.round((paso / total) * 100);
  return (
    <div className={cx(styles.wrap, className)}>
      <p className={styles.texto}>
        <strong>Paso {paso} de {total} · {nombre}</strong>
        <span>{pct} %</span>
      </p>
      <div className={styles.barra} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={paso} aria-label={`Paso ${paso} de ${total}`}>
        {Array.from({ length: total }, (_, i) => <span key={i} className={cx(styles.seg, i < paso && styles.on)} />)}
      </div>
    </div>
  );
}
