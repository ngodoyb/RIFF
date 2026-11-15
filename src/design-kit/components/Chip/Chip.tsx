// Figma: Chip 2008:163 (Estado=Default 2008:153 · Seleccionado 2008:155 · Removible 2008:159)
import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './Chip.module.css';

export type ChipEstado = 'Default' | 'Seleccionado' | 'Removible';

type ChipProps = {
  estado?: ChipEstado;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Chip({ estado = 'Default', children, onClick, className }: ChipProps) {
  if (estado === 'Removible') {
    return (
      <button type="button" className={cx(styles.chip, styles.on, className)} onClick={onClick} aria-label={`Quitar filtro ${String(children)}`}>
        <span>{children}</span>
        <Icon name="x" size={16} />
      </button>
    );
  }
  const selected = estado === 'Seleccionado';
  return (
    <button type="button" aria-pressed={selected} className={cx(styles.chip, selected ? styles.on : styles.off, className)} onClick={onClick}>
      {selected && <Icon name="check" size={16} />}
      <span>{children}</span>
    </button>
  );
}
