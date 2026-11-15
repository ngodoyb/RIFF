// Figma: 12 · Notificaciones 2022:36088 — al tocar una, abre el evento.
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, NotificationCard, Screen } from '../../../design-kit/components';
import { getNotificaciones } from '../../../services/notificationsService';
import { useApp } from '../../../state/AppState';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Notificaciones.module.css';

export function Notificaciones() {
  const navigate = useNavigate();
  const { gustos, set } = useApp();
  const lista = useMemo(() => getNotificaciones(gustos), [gustos]);
  useEffect(() => { set('notisVistas', true); }, [set]);
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar titulo="notificaciones" />
      <div className={styles.cuerpo}>
        {(['hoy', 'esta semana'] as const).map((g) => (
          <section key={g} aria-label={g}>
            <h2 className={styles.grupo}>{g}</h2>
            <ul className={styles.lista}>
              {lista.filter((n) => n.grupo === g).map((n) => (
                <li key={n.id}>
                  <NotificationCard {...n} onClick={n.eventoId ? () => navigate(`/evento/${n.eventoId}`) : undefined} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Screen>
  );
}
