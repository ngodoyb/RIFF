// Figma: Badge 2008:194 (Tipo=Género 2008:165 · Venue 2008:167 · +18 2008:169 · En revisión 2008:171 · Publicado 2008:176 · Rechazado 2008:180 · Dentro de presupuesto 2008:184 · Fuera de presupuesto 2008:189)
import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './Badge.module.css';

export type BadgeTipo = 'Género' | 'Venue' | '+18' | 'En revisión' | 'Publicado' | 'Rechazado' | 'Dentro de presupuesto' | 'Fuera de presupuesto';

const defaults: Record<BadgeTipo, { text: string; icon?: IconName; cls: string }> = {
  'Género': { text: 'Electrónica', cls: styles.genero },
  'Venue': { text: 'Bar', cls: styles.venue },
  '+18': { text: '+18', cls: styles.danger },
  'En revisión': { text: 'En revisión', icon: 'clock', cls: styles.revision },
  'Publicado': { text: 'Publicado', icon: 'check', cls: styles.publicado },
  'Rechazado': { text: 'Rechazado', icon: 'x', cls: styles.danger },
  'Dentro de presupuesto': { text: 'Dentro de tu presupuesto', icon: 'wallet', cls: styles.dentro },
  'Fuera de presupuesto': { text: 'Fuera de tu presupuesto', icon: 'wallet', cls: styles.fuera },
};

export function Badge({ tipo = 'Género', children, className }: { tipo?: BadgeTipo; children?: ReactNode; className?: string }) {
  const d = defaults[tipo];
  return (
    <span className={cx(styles.badge, d.cls, className)}>
      {d.icon && <Icon name={d.icon} size={12} />}
      {children ?? d.text}
    </span>
  );
}
