// Botón guardar de Event card (2009:62 / 2009:88) y Event row (2009:122 / 2009:141).
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './SaveButton.module.css';

type Props = { guardado: boolean; onToggle: () => void; titulo: string; vidrio?: boolean; className?: string };

export function SaveButton({ guardado, onToggle, titulo, vidrio, className }: Props) {
  return (
    <button
      type="button"
      className={cx(styles.save, vidrio && styles.glass, className)}
      aria-pressed={guardado}
      aria-label={guardado ? `Quitar ${titulo} de guardados` : `Guardar ${titulo}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
    >
      <Icon name={guardado ? 'bm-filled' : 'bm'} size={20} className={guardado ? styles.on : styles.off} />
    </button>
  );
}
