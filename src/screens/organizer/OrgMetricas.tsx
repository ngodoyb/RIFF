// Figma: 09 · Métricas del evento 2026:40682 — gráfica de línea hecha a mano en SVG.
import { Navigate, useParams } from 'react-router-dom';
import { Badge, Cover, Icon, MetricTile, NavBar, Screen } from '../../design-kit/components';
import { SERIE_METRICAS } from '../../data/organizer';
import { eventosIniciales } from '../../services/organizerService';
import { useApp } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import styles from './OrgMetricas.module.css';

const W = 278;
const H = 130;
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

export function OrgMetricas() {
  const { id = '' } = useParams();
  const app = useApp();
  const lista = eventosIniciales(app.orgEventos);
  const o = lista.find((e) => e.evento.id === id) ?? lista.find((e) => e.estado === 'Publicado');
  if (!o) return <Navigate to="/org/panel" replace />;
  const { dias, vistas, guardados } = SERIE_METRICAS;
  const max = Math.max(...vistas) * 1.15;
  const x = (i: number) => (i / (dias.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const linea = (s: number[]) => s.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const mejor = vistas.indexOf(Math.max(...vistas));
  const fechaMejor = new Date(2026, 9, dias[mejor]);
  const tasa = o.vistas ? Math.round((o.guardados / o.vistas) * 100) : 0;

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar titulo="métricas" />
      <div className={styles.cuerpo}>
        <div className={styles.evento}>
          <span className={styles.mini}><Cover estilo={o.evento.portada} alt="" /></span>
          <div><strong>{o.evento.titulo}</strong><Badge tipo={o.estado} /></div>
        </div>
        <div className={styles.metricas}>
          <MetricTile valor={o.vistas} label="Vistas" className={styles.tile} />
          <MetricTile icon="bm" valor={o.guardados} label="Guardados" className={styles.tile} />
          <MetricTile icon="external" valor={o.clics} label="Clics a venta" className={styles.tile} />
        </div>
        <section className={styles.grafica} aria-label="Vistas y guardados en el tiempo">
          <h2>vistas y guardados en el tiempo</h2>
          <p className={styles.leyenda}><span><i className={styles.lVistas} />Vistas</span><span><i className={styles.lGuardados} />Guardados</span></p>
          <svg viewBox={`-6 -8 ${W + 12} ${H + 16}`} className={styles.svg} role="img" aria-label={`Vistas: ${vistas.join(', ')}. Guardados: ${guardados.join(', ')}.`}>
            <defs>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => <line key={i} x1={0} x2={W} y1={(H / 3) * i} y2={(H / 3) * i} stroke="var(--border-subtle)" />)}
            <path d={`${linea(vistas)} L${W},${H} L0,${H} Z`} fill="url(#area)" />
            <path d={linea(vistas)} fill="none" stroke="var(--brand-primary)" strokeWidth={2.5} strokeLinejoin="round" />
            <path d={linea(guardados)} fill="none" stroke="var(--brand-accent)" strokeWidth={2.5} strokeLinejoin="round" />
            {vistas.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="var(--brand-primary)" />)}
            <circle cx={x(mejor)} cy={y(vistas[mejor])} r={6} fill="none" stroke="var(--text-primary)" strokeWidth={2} />
          </svg>
          <p className={styles.ejeX}>{dias.map((d) => <span key={d}>{d}</span>)}</p>
          <p className={styles.periodo}>Octubre · últimos 7 días</p>
          <p className={styles.mejor}><Icon name="trend" size={18} />Mejor día: {DIAS[fechaMejor.getDay()]} {dias[mejor]} oct · {vistas[mejor]} vistas y {guardados[mejor]} guardados</p>
        </section>
        <section className={styles.tasa}>
          <div><strong>Tasa de guardado</strong><span>De cada 100 vistas, {tasa} guardan el evento</span></div>
          <b>{tasa} %</b>
        </section>
      </div>
    </Screen>
  );
}
