// Hoja inferior modal y diálogo centrado (compartir, aviso de salida, recordatorio, confirmaciones).
import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import styles from './Dialog.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variante?: 'hoja' | 'centro';
  label: string;
  className?: string;
};

export function Dialog({ open, onClose, children, variante = 'hoja', label, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>('button, a, input, [tabindex]');
    first?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={styles.capa} onClick={onClose}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cx(styles.panel, variante === 'hoja' ? styles.hoja : styles.centro, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {variante === 'hoja' && <span className={styles.tirador} aria-hidden="true" />}
        {children}
      </div>
    </div>
  );
}
