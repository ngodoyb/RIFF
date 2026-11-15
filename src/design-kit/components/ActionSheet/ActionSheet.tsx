// Hoja de acciones del sistema (08 · Guardado — editar recordatorio 2018:2212).
import { useEffect, useRef } from 'react';
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './ActionSheet.module.css';

type Props<T extends string> = {
  open: boolean;
  titulo: string;
  opciones: T[];
  seleccionada?: T;
  onSelect: (o: T) => void;
  onClose: () => void;
};

export function ActionSheet<T extends string>({ open, titulo, opciones, seleccionada, onSelect, onClose }: Props<T>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    ref.current?.querySelector<HTMLElement>('[aria-checked="true"], button')?.focus();
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.capa} onClick={onClose}>
      <div ref={ref} className={styles.hoja} role="dialog" aria-modal="true" aria-label={titulo} onClick={(e) => e.stopPropagation()}>
        <div className={styles.grupo} role="radiogroup" aria-label={titulo}>
          <p className={styles.titulo}>{titulo}</p>
          {opciones.map((o) => (
            <button key={o} type="button" role="radio" aria-checked={o === seleccionada} className={cx(styles.op, o === seleccionada && styles.sel)} onClick={() => onSelect(o)}>
              {o}{o === seleccionada && <Icon name="check" size={18} />}
            </button>
          ))}
        </div>
        <button type="button" className={styles.cancelar} onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
