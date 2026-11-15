import type { CSSProperties } from 'react';
import { cx } from '../../../lib/cx';
import styles from './Icon.module.css';

/**
 * Íconos del design kit. Cada archivo de src/design-kit/icons/<nombre>.svg se
 * usa como máscara, así que el color sale de `color` (currentColor) y basta con
 * reemplazar el SVG por el exportado de Figma con el mismo nombre.
 */
const files = import.meta.glob('../../icons/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const urls: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  urls[path.split('/').pop()!.replace('.svg', '')] = url;
}

export type IconName =
  | 'alert' | 'check' | 'x' | 'clock' | 'wallet' | 'bm' | 'bm-filled' | 'cal' | 'pin' | 'search'
  | 'back' | 'chev' | 'chev-down' | 'home' | 'map' | 'user' | 'trash' | 'layers' | 'nav' | 'store'
  | 'mic' | 'users' | 'music' | 'shuffle' | 'bell' | 'trend' | 'pencil' | 'eye' | 'sliders' | 'share'
  | 'external' | 'ticket' | 'upload' | 'file' | 'plus' | 'copy' | 'link' | 'info' | 'lock' | 'wifi-off'
  | 'logout' | 'help' | 'sparkles' | 'duplicate' | 'chart' | 'car' | 'walk' | 'location-off' | 'camera'
  | 'instagram' | 'globe' | 'filter' | 'spotify' | 'apple' | 'compass' | 'chat' | 'mail';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export function Icon({ name, size = 20, color, className }: IconProps) {
  const url = urls[name];
  const style: CSSProperties = {
    width: size,
    height: size,
    color,
    WebkitMaskImage: url ? `url(${url})` : undefined,
    maskImage: url ? `url(${url})` : undefined,
  };
  return <span aria-hidden="true" className={cx(styles.icon, className)} style={style} />;
}
