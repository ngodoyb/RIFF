// Figma: Map pin 2010:114 (Género × Estado Normal/Seleccionado), Map cluster 2010:116,
// Ubicación del usuario 2010:121 y Map controls 2010:126.
import type { CSSProperties } from 'react';
import type { CoverKey, Genre } from '../../../types';
import { cx } from '../../../lib/cx';
import { Cover } from '../Cover';
import { Icon } from '../Icon';
import styles from './MapPin.module.css';

/** Color del pin por género (Figma: Electrónica #765BA3 · Cumbia #CB6E74 · Indie #E199D1). */
export function colorGenero(g: Genre): string {
  switch (g) {
    case 'Cumbia': case 'Salsa': case 'Reggaetón': case 'Urbano': case 'Trap latino': case 'Pop latino':
      return 'var(--brand-accent)';
    case 'Indie': case 'Rock': case 'Jazz': case 'Clásica': case 'Metal':
      return 'var(--brand-primary)';
    default:
      return 'var(--brand-secondary)';
  }
}

type PinProps = {
  genero: Genre;
  estado?: 'Normal' | 'Seleccionado';
  portada: CoverKey;
  etiqueta: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

export function MapPin({ genero, estado = 'Normal', portada, etiqueta, onClick, className, style }: PinProps) {
  const sel = estado === 'Seleccionado';
  const color = colorGenero(genero);
  return (
    <button
      type="button"
      className={cx(styles.pin, sel && styles.sel, className)}
      style={{ ...style, ['--pin' as string]: color }}
      onClick={onClick}
      aria-label={etiqueta}
      aria-pressed={sel}
    >
      <span className={styles.burbuja}><span className={styles.foto}><Cover estilo={portada} alt="" /></span></span>
      <span className={styles.punta} aria-hidden="true" />
      {sel && <span className={styles.etiqueta}>{etiqueta}</span>}
    </button>
  );
}

export function MapCluster({ cantidad, onClick, style, className }: { cantidad: number; onClick?: () => void; style?: CSSProperties; className?: string }) {
  return (
    <button type="button" className={cx(styles.cluster, className)} style={style} onClick={onClick} aria-label={`${cantidad} eventos aquí. Acercar`}>
      <span className={styles.clusterIn}>{cantidad}</span>
    </button>
  );
}

export function UserLocation({ style, className }: { style?: CSSProperties; className?: string }) {
  return (
    <span className={cx(styles.user, className)} style={style} role="img" aria-label="Tu ubicación">
      <span className={styles.userMid} /><span className={styles.userDot} />
    </span>
  );
}

export function MapControls({ onLayers, onCenter, className }: { onLayers?: () => void; onCenter?: () => void; className?: string }) {
  return (
    <div className={cx(styles.controls, className)}>
      <button type="button" className={styles.ctrl} aria-label="Tipo de mapa" onClick={onLayers}><Icon name="layers" size={20} /></button>
      <span className={styles.sep} />
      <button type="button" className={styles.ctrl} aria-label="Centrar en mi ubicación" onClick={onCenter}><Icon name="nav" size={20} className={styles.nav} /></button>
    </div>
  );
}
