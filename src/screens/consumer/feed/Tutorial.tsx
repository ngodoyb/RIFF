// Figma: 04 · Feed — tutorial 1/3 2014:759 · 2/3 2014:813 · 3/3 2014:863 (solo la primera vez)
import { useEffect, useRef } from 'react';
import { cx } from '../../../lib/cx';
import styles from './Tutorial.module.css';

const PASOS = [
  { titulo: 'busca y filtra', texto: 'Encuentra eventos por género, formato de acto o tipo de venue.', top: 330 },
  { titulo: 'guarda sin entrar', texto: 'Toca el marcador de una card para guardarla y recibir un recordatorio.', top: 350 },
  { titulo: 'explora el mapa', texto: 'Mira qué suena cerca de ti y en tu calendario, desde el menú inferior.', top: 520 },
];

type Props = { paso: number; onPaso: (n: number) => void; onFin: () => void };

export function Tutorial({ paso, onPaso, onFin }: Props) {
  const p = PASOS[paso - 1];
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, [paso]);
  const ultimo = paso === PASOS.length;
  return (
    <>
      <div className={styles.capa} aria-hidden="true" />
      {paso === 3 && <span className={styles.resaltarMapa} aria-hidden="true" />}
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="tuto-titulo" className={styles.card} style={{ top: p.top }}>
        <p className={styles.paso}>{paso} de 3</p>
        <h2 id="tuto-titulo" className={styles.titulo}>{p.titulo}</h2>
        <p className={styles.texto}>{p.texto}</p>
        <div className={styles.acciones}>
          <button type="button" className={styles.saltar} onClick={onFin}>Saltar</button>
          <span className={styles.puntos} aria-hidden="true">
            {PASOS.map((_, i) => <i key={i} className={cx(i + 1 === paso && styles.on)} />)}
          </span>
          <button type="button" className={styles.siguiente} onClick={() => (ultimo ? onFin() : onPaso(paso + 1))}>
            {ultimo ? '¡Listo!' : 'Siguiente'}
          </button>
        </div>
      </div>
    </>
  );
}
