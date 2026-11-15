// Figma: 08 · Guardado y recordatorio 2018:2140 · editar recordatorio 2018:2212
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ActionSheet, Button, EventRow, Icon, NavBar, Screen } from '../../../design-kit/components';
import { rangoPrecio } from '../../../lib/format';
import { useEstado } from '../../../lib/useEstado';
import { getEvent } from '../../../services/eventsService';
import { RECORDATORIOS, fechaRecordatorio } from '../../../services/reminderService';
import { useApp } from '../../../state/AppState';
import { useToast } from '../../../state/ToastContext';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Guardado.module.css';

export function Guardado() {
  const { id = '' } = useParams();
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const toast = useToast();
  const evento = getEvent(id);
  const [hoja, setHoja] = useState(estado === 'recordatorio');
  const r = app.guardados[id] ?? '1 día antes';

  useEffect(() => {
    if (!evento || estado) return;
    toast({ tipo: 'Guardado', onAccion: () => { app.toggleGuardado(evento.id, evento.generos); navigate(-1); } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!evento) return <Navigate to="/feed" replace />;
  const cuando = fechaRecordatorio(evento, r);

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <div className={styles.cuerpo}>
        <span className={styles.medalla}><Icon name="bm-filled" size={34} /></span>
        <h1 className={styles.titulo}>¡evento guardado!</h1>
        <p className={styles.texto}>Lo añadimos a tu calendario. Te enviaremos un recordatorio antes de la fecha del evento.</p>
        <EventRow
          evento={evento}
          guardado={Boolean(app.guardados[id])}
          onToggleSave={() => app.toggleGuardado(evento.id, evento.generos)}
          subtitulo={evento.venueCorto}
          precio={rangoPrecio(evento.precioMin, evento.precioMax, evento.precioTexto)}
          className={styles.fila}
        />
        <button type="button" className={styles.recordatorio} onClick={() => setHoja(true)} aria-haspopup="dialog">
          <span className={styles.campana}><Icon name="bell" size={20} /></span>
          <span className={styles.recTexto}>
            <strong>Recordatorio: {r === 'Sin recordatorio' ? 'sin recordatorio' : r.replace(' antes', ' antes')}</strong>
            {cuando && <span>{cuando}</span>}
          </span>
          <span className={styles.cambiar}>Cambiar <Icon name="chev" size={16} /></span>
        </button>
        <Button to="/feed" className={styles.volver}>Volver al feed</Button>
      </div>
      <ActionSheet
        open={hoja}
        titulo="¿Cuándo te recordamos?"
        opciones={RECORDATORIOS}
        seleccionada={r}
        onSelect={(o) => { app.setRecordatorio(id, o); setHoja(false); }}
        onClose={() => setHoja(false)}
      />
    </Screen>
  );
}
