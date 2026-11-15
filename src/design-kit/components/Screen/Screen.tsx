// Marco de pantalla 375 × 812 (se estira hasta 430 px): fondo #100310 con "brillos" difusos
// (en Figma: elipses con desenfoque llamadas "brillo"), reserva --top-safe en lugar del status bar.
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import styles from './Screen.module.css';

export type Brillo = { x: number; y: number; size: number; color: 'morado' | 'rosa' | 'coral' | 'secundario'; opacity?: number; blur?: number };

const COLOR: Record<Brillo['color'], string> = {
  morado: 'var(--brand-secondary)',
  secundario: 'var(--surface-deep)',
  rosa: 'var(--brand-primary)',
  coral: 'var(--brand-accent)',
};

type Props = {
  children: ReactNode;
  brillos?: Brillo[];
  className?: string;
  /** Contenido desplazable; si es false la pantalla es fija (p. ej. mapa). */
  scroll?: boolean;
  /** Deja espacio para la tab bar. */
  conTabBar?: boolean;
  /** Elementos superpuestos fuera del scroll (tab bar, toasts, hojas). */
  overlay?: ReactNode;
  style?: CSSProperties;
  label?: string;
};

export function Screen({ children, brillos = [], className, scroll = true, conTabBar, overlay, style, label }: Props) {
  return (
    <div className={styles.screen} style={style} aria-label={label}>
      <div className={styles.fondo} aria-hidden="true">
        {brillos.map((b, i) => (
          <span
            key={i}
            className={styles.brillo}
            style={{
              left: b.x, top: b.y, width: b.size, height: b.size,
              background: COLOR[b.color], opacity: b.opacity ?? 0.55,
              filter: `blur(${b.blur ?? Math.round(b.size * 0.22)}px)`,
            }}
          />
        ))}
      </div>
      <main className={cx(styles.contenido, scroll && styles.scroll, conTabBar && styles.conTab, className)}>
        {children}
      </main>
      {overlay}
    </div>
  );
}
