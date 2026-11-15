// Diálogo de confirmación centrado (07 · Aviso de salida 2018:2025, 11 · cerrar sesión 2022:35965, 05 · cancelar evento 2024:36374).
import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './Alert.module.css';

type Props = {
  open: boolean;
  icono?: IconName;
  peligro?: boolean;
  titulo: string;
  children: ReactNode;
  cancelar?: string;
  confirmar: string;
  onCancelar: () => void;
  onConfirmar: () => void;
};

export function Alert({ open, icono, peligro, titulo, children, cancelar = 'Cancelar', confirmar, onCancelar, onConfirmar }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onCancelar();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onCancelar]);
  if (!open) return null;
  return (
    <div className={styles.capa} onClick={onCancelar}>
      <div ref={ref} tabIndex={-1} role="alertdialog" aria-modal="true" aria-labelledby="alert-titulo" className={styles.alerta} onClick={(e) => e.stopPropagation()}>
        {icono && <span className={cx(styles.icono, peligro && styles.peligroIcono)}><Icon name={icono} size={20} /></span>}
        <h2 id="alert-titulo" className={styles.titulo}>{titulo}</h2>
        <div className={styles.texto}>{children}</div>
        <div className={styles.botones}>
          <button type="button" onClick={onCancelar}>{cancelar}</button>
          <button type="button" className={cx(styles.confirmar, peligro && styles.peligro)} onClick={onConfirmar}>{confirmar}</button>
        </div>
      </div>
    </div>
  );
}
