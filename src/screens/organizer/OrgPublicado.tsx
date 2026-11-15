// Figma: 08 · Confirmación de publicación 2026:40614 — el evento ya está en el feed, el mapa y los filtros del consumidor.
import { Navigate, useLocation } from 'react-router-dom';
import { Button, EventCard, Icon, Screen, type IconName } from '../../design-kit/components';
import { eventosIniciales } from '../../services/organizerService';
import { useApp } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import styles from './OrgPublicado.module.css';

export function OrgPublicado() {
  const location = useLocation();
  const app = useApp();
  const lista = eventosIniciales(app.orgEventos);
  const id = (location.state as { id?: string } | null)?.id;
  const o = lista.find((e) => e.evento.id === id) ?? lista.find((e) => e.estado === 'Publicado');
  if (!o) return <Navigate to="/org/panel" replace />;
  const lugares: { label: string; icon: IconName }[] = [{ label: 'Feed', icon: 'home' }, { label: 'Mapa', icon: 'map' }, { label: 'Filtros', icon: 'sliders' }];
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <div className={styles.cuerpo}>
        <span className={styles.check}><Icon name="check" size={34} /></span>
        <h1 className={styles.titulo}>¡evento publicado!</h1>
        <p className={styles.texto}>Ya es visible en el feed, el mapa y los filtros de los usuarios.</p>
        <ul className={styles.lugares}>{lugares.map((l) => <li key={l.label}><Icon name={l.icon} size={16} />{l.label}</li>)}</ul>
        <EventCard evento={o.evento} guardado={false} onToggleSave={() => {}} className={styles.card} />
        <Button to="/org/panel" className={styles.volver}>Volver al panel</Button>
      </div>
    </Screen>
  );
}
