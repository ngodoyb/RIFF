// Figma: Bottom sheet 2010:143 (Altura=Mínima 2010:137 · Media 2010:139 · Completa 2010:141)
// Se arrastra con el tirador (pointer events) y responde a teclado (flechas, Inicio, Fin).
import { useRef, useState, type ReactNode, type KeyboardEvent, type PointerEvent } from 'react';
import { cx } from '../../../lib/cx';
import styles from './BottomSheet.module.css';

export type SheetAltura = 'Mínima' | 'Media' | 'Completa';
export const ALTURAS: Record<SheetAltura, number> = { 'Mínima': 148, 'Media': 420, 'Completa': 720 };
const ORDEN: SheetAltura[] = ['Mínima', 'Media', 'Completa'];

type Props = {
  altura: SheetAltura;
  onAltura?: (a: SheetAltura) => void;
  children?: ReactNode;
  className?: string;
  label?: string;
  /** Distancia del borde inferior (p. ej. altura de la tab bar). */
  bottom?: number;
  fija?: boolean;
};

export function BottomSheet({ altura, onAltura, children, className, label = 'Lista de eventos', bottom = 0, fija }: Props) {
  const [drag, setDrag] = useState<number | null>(null);
  const start = useRef<{ y: number; h: number } | null>(null);
  const h = drag ?? ALTURAS[altura];

  const snap = (px: number) => {
    let best: SheetAltura = 'Mínima';
    for (const a of ORDEN) if (Math.abs(ALTURAS[a] - px) < Math.abs(ALTURAS[best] - px)) best = a;
    onAltura?.(best);
  };
  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (fija) return;
    start.current = { y: e.clientY, h: ALTURAS[altura] };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!start.current) return;
    const next = Math.min(ALTURAS.Completa, Math.max(ALTURAS['Mínima'] - 40, start.current.h + (start.current.y - e.clientY)));
    setDrag(next);
  };
  const onUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (!start.current) return;
    const moved = Math.abs(start.current.y - e.clientY) > 6;
    const final = drag ?? ALTURAS[altura];
    start.current = null;
    setDrag(null);
    if (moved) snap(final);
    else onAltura?.(ORDEN[(ORDEN.indexOf(altura) + 1) % ORDEN.length]);
  };
  const onKey = (e: KeyboardEvent) => {
    const i = ORDEN.indexOf(altura);
    if (e.key === 'ArrowUp') { e.preventDefault(); onAltura?.(ORDEN[Math.min(2, i + 1)]); }
    if (e.key === 'ArrowDown') { e.preventDefault(); onAltura?.(ORDEN[Math.max(0, i - 1)]); }
    if (e.key === 'Home') onAltura?.('Completa');
    if (e.key === 'End') onAltura?.('Mínima');
  };

  return (
    <section
      className={cx(styles.sheet, drag !== null && styles.dragging, className)}
      style={{ height: h, bottom }}
      aria-label={label}
    >
      <button
        type="button"
        className={styles.tirador}
        aria-label={`Ajustar altura de la hoja (actual: ${altura.toLowerCase()})`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onKeyDown={onKey}
      >
        <span className={styles.barra} />
      </button>
      <div className={styles.contenido}>{children}</div>
    </section>
  );
}
