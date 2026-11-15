// Figma: 07 · Evento en revisión 2026:40550 — "(Prototipo) Simular aprobación →" publica el evento de verdad.
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon, NavBar, Screen } from '../../design-kit/components';
import { HOY } from '../../data/demo';
import { cx } from '../../lib/cx';
import { diaCorto, hora } from '../../lib/format';
import { eventosIniciales } from '../../services/organizerService';
import { useApp } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import styles from './OrgRevision.module.css';

export function OrgRevision() {
  const navigate = useNavigate();
  const location = useLocation();
  const app = useApp();
  const lista = eventosIniciales(app.orgEventos);
  const id = (location.state as { id?: string } | null)?.id ?? lista.find((e) => e.estado === 'En revisión')?.evento.id;
  const ahora = HOY;
  const limite = new Date(ahora.getTime() + 48 * 3600_000);
  const pasos = [
    { titulo: 'Enviado', sub: `hoy · ${hora(new Date(2026, 9, 10, 16, 12))}`, estado: 'hecho' },
    { titulo: 'En revisión', sub: `Respuesta antes del ${diaCorto(limite)} · ${hora(new Date(2026, 9, 10, 16, 12))}`, estado: 'actual' },
    { titulo: 'Publicado', sub: 'Visible en el feed, el mapa y los filtros', estado: 'pendiente' },
  ];
  const aprobar = () => {
    app.set('orgEventos', (l) => eventosIniciales(l).map((o) => (o.evento.id === id ? { ...o, estado: 'Publicado' } : o)));
    navigate('/org/publicado', { replace: true, state: { id } });
  };
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar onBack={() => navigate('/org/panel', { replace: true })} />
      <div className={styles.cuerpo}>
        <span className={styles.reloj}><Icon name="clock" size={34} /></span>
        <h1 className={styles.titulo}>tu evento está en revisión</h1>
        <p className={styles.texto}>Te avisaremos cuando sea aprobado. Esto puede tardar hasta 48 horas.</p>
        <ol className={styles.linea}>
          {pasos.map((p) => (
            <li key={p.titulo} className={cx(styles.paso, styles[p.estado])}>
              <span className={styles.punto}>{p.estado === 'hecho' && <Icon name="check" size={14} />}</span>
              <span className={styles.pasoTexto}><strong>{p.titulo}</strong><span>{p.sub}</span></span>
            </li>
          ))}
        </ol>
        <p className={styles.alerta}><Icon name="alert" size={16} />Si es rechazado, verás el motivo en tu panel y podrás editar el evento y reenviarlo.</p>
        <Button to="/org/panel" className={styles.volver}>Volver al panel</Button>
        <button type="button" className={styles.simular} onClick={aprobar} disabled={!id}>(Prototipo) Simular aprobación →</button>
      </div>
    </Screen>
  );
}
