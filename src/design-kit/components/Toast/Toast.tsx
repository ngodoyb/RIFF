// Figma: Toast 2009:283 (Tipo=Guardado 2009:261 · Quitado 2009:268 · Error 2009:275)
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './Toast.module.css';

export type ToastTipo = 'Guardado' | 'Quitado' | 'Error';
const ICON: Record<ToastTipo, IconName> = { Guardado: 'check', Quitado: 'trash', Error: 'alert' };
const TEXT: Record<ToastTipo, string> = {
  Guardado: 'Guardado en tu calendario',
  Quitado: 'Quitaste el evento',
  Error: 'No pudimos guardar. Revisa tu conexión',
};
const ACCION: Record<ToastTipo, string> = { Guardado: 'Deshacer', Quitado: 'Deshacer', Error: 'Reintentar' };

type Props = { tipo?: ToastTipo; texto?: string; accion?: string; onAccion?: () => void; className?: string };

export function Toast({ tipo = 'Guardado', texto, accion, onAccion, className }: Props) {
  return (
    <div role="status" className={cx(styles.toast, className)}>
      <span className={cx(styles.icono, styles[tipo])}><Icon name={ICON[tipo]} size={16} /></span>
      <p className={styles.texto}>{texto ?? TEXT[tipo]}</p>
      {onAccion && (
        <button type="button" className={styles.accion} onClick={onAccion}>{accion ?? ACCION[tipo]}</button>
      )}
    </div>
  );
}
