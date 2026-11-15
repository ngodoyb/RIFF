// Figma: Logo/riff (placeholder) 2008:103 — cuando exista el logo final, cámbialo solo aquí.
import { cx } from '../../../lib/cx';
import styles from './Logo.module.css';

export function Logo({ size = 96, className }: { size?: number; className?: string }) {
  return (
    <span className={cx(styles.logo, className)} style={{ fontSize: size }} role="img" aria-label="riff">riff</span>
  );
}
