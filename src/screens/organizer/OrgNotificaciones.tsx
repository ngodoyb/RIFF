// Figma: 10 · Notificaciones del organizador 2026:40788
import { useNavigate } from 'react-router-dom';
import { NavBar, NotificationCard, Screen } from '../../design-kit/components';
import { ORG_NOTIFICACIONES } from '../../data/organizer';
import { BRILLOS_ONBOARDING } from '../brillos';
import styles from '../consumer/perfil/Notificaciones.module.css';

export function OrgNotificaciones() {
  const navigate = useNavigate();
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar titulo="notificaciones" />
      <div className={styles.cuerpo}>
        <section aria-label="hoy">
          <h2 className={styles.grupo}>hoy</h2>
          <ul className={styles.lista}>
            {ORG_NOTIFICACIONES.map((n) => (
              <li key={n.id}>
                <NotificationCard {...n} onClick={() => navigate(n.tipo === 'Actualiza tu evento' ? '/org/panel' : `/org/metricas/${n.eventoId}`)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Screen>
  );
}
