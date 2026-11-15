// Figma: Event card 2009:104 (Guardado=No 2009:52 · Guardado=Sí 2009:78)
import { Link } from 'react-router-dom';
import type { EventItem } from '../../../types';
import { cx } from '../../../lib/cx';
import { fechaEvento, rangoPrecio } from '../../../lib/format';
import { Cover } from '../Cover';
import { Icon } from '../Icon';
import { SaveButton } from '../SaveButton';
import styles from './EventCard.module.css';

type Props = { evento: EventItem; guardado: boolean; onToggleSave: () => void; className?: string };

export function EventCard({ evento, guardado, onToggleSave, className }: Props) {
  return (
    <article className={cx(styles.card, className)}>
      <div className={styles.portada}>
        <Cover estilo={evento.portada} alt={`Portada de ${evento.titulo}`} />
        <SaveButton guardado={guardado} onToggle={onToggleSave} titulo={evento.titulo} vidrio className={styles.save} />
      </div>
      <Link to={`/evento/${evento.id}`} className={styles.info}>
        <h3 className={styles.titulo}>{evento.titulo}</h3>
        <p className={styles.fila}>
          <Icon name="cal" size={16} className={styles.ic} />
          <span>{fechaEvento(evento.inicio, evento.fin)}</span>
        </p>
        <p className={cx(styles.fila, styles.venue)}>
          <Icon name="pin" size={16} className={styles.ic} />
          <span className={styles.lugar}>{evento.venueCorto}</span>
          <strong className={styles.precio}>{rangoPrecio(evento.precioMin, evento.precioMax, evento.precioTexto)}</strong>
        </p>
      </Link>
    </article>
  );
}
