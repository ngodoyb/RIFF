// Figma: Skeleton card 2010:262 (feed y resultados)
import { cx } from '../../../lib/cx';
import styles from './SkeletonCard.module.css';

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cx(styles.card, className)} aria-hidden="true">
      <div className={cx(styles.s, styles.img)} />
      <div className={styles.l}><div className={styles.s} style={{ width: 220, height: 18 }} /></div>
      <div className={styles.l}><div className={styles.s} style={{ width: 160, height: 14 }} /></div>
      <div className={styles.l}><div className={styles.s} style={{ width: 260, height: 14 }} /></div>
    </div>
  );
}

/** Variante fila (Resultados — cargando). */
export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cx(styles.row, className)} aria-hidden="true">
      <div className={styles.s} style={{ width: 72, height: 72, borderRadius: 12 }} />
      <div className={styles.rowInfo}>
        <div className={styles.s} style={{ width: 170, height: 14 }} />
        <div className={styles.s} style={{ width: 120, height: 12 }} />
        <div className={styles.s} style={{ width: 200, height: 12 }} />
      </div>
    </div>
  );
}

