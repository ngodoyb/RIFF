// Figma: Notification card 2010:260 (Tipo=Según tus gustos 2010:195 · Sorpréndeme 2010:207 · Recordatorio 2010:218 · Evento aprobado 2010:229 · Hito alcanzado 2010:239 · Actualiza tu evento 2010:250)
import type { NotificationKind } from '../../../types';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './NotificationCard.module.css';

const CFG: Record<NotificationKind, { icon: IconName; fondo: string; tono: string }> = {
  'Según tus gustos': { icon: 'music', fondo: styles.secundario, tono: styles.tSec },
  'Sorpréndeme': { icon: 'shuffle', fondo: styles.acento, tono: styles.tAcento },
  'Recordatorio': { icon: 'bell', fondo: styles.primario, tono: styles.tPrim },
  'Evento aprobado': { icon: 'check', fondo: styles.primario, tono: styles.tPrim },
  'Hito alcanzado': { icon: 'trend', fondo: styles.acento, tono: styles.tPrim },
  'Actualiza tu evento': { icon: 'pencil', fondo: styles.secundario, tono: styles.tSec },
};

type Props = { tipo: NotificationKind; hace: string; titulo: string; texto: string; onClick?: () => void; className?: string };

export function NotificationCard({ tipo, hace, titulo, texto, onClick, className }: Props) {
  const c = CFG[tipo];
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag type={onClick ? 'button' : undefined} onClick={onClick} className={cx(styles.card, tipo === 'Sorpréndeme' && styles.sorpresa, className)}>
      <span className={cx(styles.icono, c.fondo)}><Icon name={c.icon} size={20} /></span>
      <span className={styles.contenido}>
        <span className={styles.encabezado}>
          <span className={cx(styles.tipo, c.tono)}>{tipo}</span>
          <span className={styles.hace}>{hace}</span>
        </span>
        <span className={styles.titulo}>{titulo}</span>
        <span className={styles.texto}>{texto}</span>
      </span>
    </Tag>
  );
}
