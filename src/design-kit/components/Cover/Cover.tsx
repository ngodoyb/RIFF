// Figma: Portada (placeholder) 2009:50 — Estilo 1–6 y portadas reales de eventos.
import type { CoverKey } from '../../../types';
import { cx } from '../../../lib/cx';
import styles from './Cover.module.css';

const files = import.meta.glob('../../../assets/portadas/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export const coverUrls: Record<string, string> = {};
for (const [p, url] of Object.entries(files)) coverUrls[p.split('/').pop()!.replace('.jpg', '')] = url;

type CoverProps = { estilo: CoverKey | string; alt: string; className?: string; eager?: boolean };

export function Cover({ estilo, alt, className, eager }: CoverProps) {
  const src = coverUrls[estilo] ?? estilo; // admite también una URL (portada subida por el organizador)
  return (
    <img src={src} alt={alt} width={343} height={180} loading={eager ? 'eager' : 'lazy'} className={cx(styles.cover, className)} />
  );
}
