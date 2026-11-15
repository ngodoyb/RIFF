// Figma: Event row 2009:144 (Guardado=No 2009:106 · Guardado=Sí 2009:125)
import { Link } from 'react-router-dom';
import type { EventItem } from '../../../types';
import { cx } from '../../../lib/cx';
import { fechaEvento, km, rangoPrecio, pesos } from '../../../lib/format';
import { Cover } from '../Cover';
import { SaveButton } from '../SaveButton';
import styles from './EventRow.module.css';

type Props = {
  evento: EventItem;
  guardado?: boolean;
  onToggleSave?: () => void;
  /** Segunda línea; por defecto "Venue · a 1,2 km". */
  subtitulo?: string;
  /** Texto de fecha; por defecto "sáb 17 oct · 8:00 p. m.". */
  fecha?: string;
  titulo?: string;
  precio?: string;
  onClick?: () => void;
  className?: string;
};

/** Precio de la fila: "desde $X" (o "$X" si es único), "Ver precios" si no hay precio publicado. */
export function precioCorto(e: EventItem): string {
  if (e.precioMin === null) return 'Ver precios';
  if (e.precioMin === 0) return 'Gratis';
  if (e.precioMax === e.precioMin) return pesos(e.precioMin);
  return `desde ${pesos(e.precioMin)}`;
}

export function EventRow({ evento, guardado = false, onToggleSave, subtitulo, fecha, titulo, precio, onClick, className }: Props) {
  return (
    <article className={cx(styles.row, className)}>
      <div className={styles.mini}>
        <Cover estilo={evento.portada} alt="" />
      </div>
      <Link to={`/evento/${evento.id}`} className={styles.info} onClick={onClick} title={rangoPrecio(evento.precioMin, evento.precioMax, evento.precioTexto)}>
        <h3 className={styles.titulo}>{titulo ?? evento.titulo}</h3>
        <p className={styles.sub}>{subtitulo ?? `${evento.venueCorto} · ${km(evento.distanciaKm)}`}</p>
        <p className={styles.meta}>
          <span className={styles.fecha}>{fecha ?? fechaEvento(evento.inicio, evento.fin)}</span>
          <strong className={styles.precio}>{precio ?? precioCorto(evento)}</strong>
        </p>
      </Link>
      {onToggleSave && <SaveButton guardado={guardado} onToggle={onToggleSave} titulo={evento.titulo} />}
    </article>
  );
}
