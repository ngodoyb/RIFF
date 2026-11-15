// Figma: 09 · Calendario personal 2019:1920 · sin eventos 2019:2115
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Screen, TabBar } from '../../../design-kit/components';
import { HOY } from '../../../data/demo';
import { cx } from '../../../lib/cx';
import { MESES_LARGOS, hora, parseLocal } from '../../../lib/format';
import { useEstado } from '../../../lib/useEstado';
import { getEvents } from '../../../services/eventsService';
import { useApp } from '../../../state/AppState';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Calendario.module.css';

const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const DIA_CORTO = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const mismoDia = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function Calendario() {
  const estado = useEstado();
  const app = useApp();
  const [mes, setMes] = useState(new Date(HOY.getFullYear(), HOY.getMonth(), 1));
  const guardados = useMemo(() => {
    if (estado === 'vacio') return [];
    return getEvents()
      .filter((e) => app.guardados[e.id])
      .sort((a, b) => parseLocal(a.inicio).getTime() - parseLocal(b.inicio).getTime());
  }, [app.guardados, estado]);

  const celdas = useMemo(() => {
    const primero = (mes.getDay() + 6) % 7; // lunes = 0
    const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
    return [...Array(primero).fill(null), ...Array.from({ length: total }, (_, i) => new Date(mes.getFullYear(), mes.getMonth(), i + 1))];
  }, [mes]);

  const tieneEvento = (d: Date) => guardados.some((e) => mismoDia(parseLocal(e.inicio), d));
  const delMes = guardados.filter((e) => { const d = parseLocal(e.inicio); return d.getMonth() === mes.getMonth() && d.getFullYear() === mes.getFullYear(); });

  return (
    <Screen brillos={BRILLOS_ONBOARDING} conTabBar overlay={<TabBar activa="Calendario" />}>
      <h1 className={styles.titulo}>mi calendario</h1>
      <section className={styles.mes} aria-label="Mes">
        <div className={styles.encabezado}>
          <button type="button" aria-label="Mes anterior" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}><Icon name="back" size={20} /></button>
          <h2 aria-live="polite">{MESES_LARGOS[mes.getMonth()]} {mes.getFullYear()}</h2>
          <button type="button" aria-label="Mes siguiente" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}><Icon name="chev" size={20} /></button>
        </div>
        <div className={styles.grilla} role="grid">
          {DIAS.map((d, i) => <span key={i} className={styles.diaSemana} role="columnheader">{d}</span>)}
          {celdas.map((d, i) => {
            if (!d) return <span key={i} />;
            const ev = tieneEvento(d);
            const hoy = mismoDia(d, HOY);
            const pasado = d < HOY && !hoy;
            return (
              <span key={i} role="gridcell" className={cx(styles.dia, pasado && styles.pasado, hoy && styles.hoy, ev && styles.conEvento)}
                aria-label={`${d.getDate()} de ${MESES_LARGOS[d.getMonth()]}${hoy ? ', hoy' : ''}${ev ? ', evento guardado' : ''}`}>
                {d.getDate()}
                {ev && <i className={styles.punto} />}
              </span>
            );
          })}
        </div>
        <p className={styles.leyenda}><span><i className={styles.lGuardado} />Evento guardado</span><span><i className={styles.lHoy} />Hoy</span></p>
      </section>

      {guardados.length === 0 ? (
        <div className={styles.vacio}>
          <span className={styles.vacioIcono}><Icon name="cal" size={28} /></span>
          <h2 className={styles.vacioTitulo}>aún no tienes planes</h2>
          <p className={styles.vacioTexto}>Guarda eventos desde el feed o el mapa y aparecerán aquí con su recordatorio.</p>
          <Button tipo="Secundario" to="/feed">Explorar el feed</Button>
        </div>
      ) : (
        <section className={styles.lista} aria-label="mis eventos guardados">
          <h2 className={styles.h2}>mis eventos guardados</h2>
          <ul>
            {(delMes.length ? delMes : guardados).map((e) => {
              const d = parseLocal(e.inicio);
              const r = app.guardados[e.id];
              return (
                <li key={e.id}>
                  <Link to={`/evento/${e.id}`} className={styles.item}>
                    <span className={styles.fecha}><b>{d.getDate()}</b><small>{DIA_CORTO[d.getDay()]}</small></span>
                    <span className={styles.itemTexto}>
                      <strong>{e.titulo}</strong>
                      <span>{e.venueCorto} · {hora(d)}</span>
                      <em><Icon name="bell" size={14} />{r === 'Sin recordatorio' ? 'Sin recordatorio' : `Recordatorio: ${r}`}</em>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </Screen>
  );
}
