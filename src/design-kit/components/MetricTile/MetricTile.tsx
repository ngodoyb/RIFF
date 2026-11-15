// Figma: Metric tile 2010:271 (cifra en Anton)
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './MetricTile.module.css';

export function MetricTile({ icon = 'eye', valor, label, className }: { icon?: IconName; valor: string | number; label: string; className?: string }) {
  return (
    <div className={cx(styles.tile, className)}>
      <Icon name={icon} size={18} className={styles.ic} />
      <p className={styles.valor}>{valor}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
