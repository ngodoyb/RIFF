// Figma: 05 · Panel de organizador 2024:36206 · confirmar cancelación 2024:36374
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Badge, Cover, Icon, MetricTile, Screen, type IconName } from '../../design-kit/components';
import { cx } from '../../lib/cx';
import { fechaEvento } from '../../lib/format';
import { useEstado } from '../../lib/useEstado';
import { eventosIniciales } from '../../services/organizerService';
import { BORRADOR_VACIO, useApp, type OrgEvent } from '../../state/AppState';
import { useToast } from '../../state/ToastContext';
import { BRILLOS_ONBOARDING } from '../brillos';
import styles from './OrgPanel.module.css';

export function OrgPanel() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const toast = useToast();
  const eventos = eventosIniciales(app.orgEventos);
  const [cancelar, setCancelar] = useState<OrgEvent | null>(estado === 'cancelar' ? eventos[0] : null);

  const { set, orgEventos } = app;
  useEffect(() => { if (!orgEventos.length) set('orgEventos', eventosIniciales([])); }, [orgEventos.length, set]);

  const total = eventos.reduce((a, e) => ({ v: a.v + e.vistas, g: a.g + e.guardados, c: a.c + e.clics }), { v: 0, g: 0, c: 0 });
  const nombre = (app.org.nombre || 'Bambulé').toLowerCase();
  const corto = (t: string) => t.replace(/^.*? · /, '');

  const duplicar = (o: OrgEvent) => {
    const e = o.evento;
    app.set('borrador', {
      ...BORRADOR_VACIO, nombre: e.titulo, organizadores: app.org.redes || '@bambulebta', portada: e.portada, direccion: e.direccion,
      generos: e.generos, formato: e.formato, venueTipo: e.venueTipo,
      precioDesde: e.precioMin ? String(e.precioMin) : '', precioHasta: e.precioMax ? String(e.precioMax) : '',
      edad: e.edad === '+18' || e.edad === '+14' || e.edad === 'Todo público' ? e.edad : '+18', urlVenta: e.urlVenta,
    });
    navigate('/org/nuevo');
  };
  const editar = (o: OrgEvent) => { duplicar(o); };
  const confirmarCancelacion = () => {
    if (!cancelar) return;
    const quitado = cancelar;
    app.set('orgEventos', (l) => eventosIniciales(l).filter((x) => x.evento.id !== quitado.evento.id));
    setCancelar(null);
    toast({ tipo: 'Quitado', texto: `Cancelaste “${corto(quitado.evento.titulo)}”` });
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <header className={styles.header}>
        <div>
          <p className={styles.hola}>hola, {nombre}</p>
          <h1 className={styles.titulo}>tu panel</h1>
        </div>
        <Link to="/org/notificaciones" className={styles.campana} aria-label="Notificaciones (hay nuevas)"><Icon name="bell" size={22} /><span className={styles.punto} /></Link>
      </header>
      <div className={styles.cuerpo}>
        <Link to="/org/nuevo" className={styles.publicar}>+ Publicar nuevo evento</Link>
        <div className={styles.resumenTitulo}><h2 className={styles.h3}>resumen</h2><span>Últimos 7 días</span></div>
        <div className={styles.metricas}>
          <MetricTile icon="eye" valor={total.v} label="Vistas" className={styles.tile} />
          <MetricTile icon="bm" valor={total.g} label="Guardados" className={styles.tile} />
          <MetricTile icon="external" valor={total.c} label="Clics a venta" className={styles.tile} />
        </div>
        <h2 className={styles.h2}>mis eventos</h2>
        <ul className={styles.eventos}>
          {eventos.map((o) => {
            const acciones: { label: string; icon: IconName; onClick: () => void; peligro?: boolean }[] = [
              ...(o.estado === 'Publicado' ? [{ label: 'Métricas', icon: 'chart' as IconName, onClick: () => navigate(`/org/metricas/${o.evento.id}`) }] : []),
              { label: o.estado === 'Rechazado' ? 'Corregir' : 'Editar', icon: 'pencil', onClick: () => editar(o) },
              { label: 'Duplicar', icon: 'duplicate', onClick: () => duplicar(o) },
              { label: 'Cancelar', icon: 'x', onClick: () => setCancelar(o), peligro: true },
            ];
            return (
              <li key={o.evento.id} className={cx(styles.evento, o.estado === 'Rechazado' && styles.rechazado)}>
                <div className={styles.eventoArriba}>
                  <span className={styles.mini}><Cover estilo={o.evento.portada} alt="" /></span>
                  <div className={styles.eventoTexto}>
                    <Badge tipo={o.estado} />
                    <strong>{o.evento.titulo}</strong>
                    <span>{fechaEvento(o.evento.inicio)}</span>
                  </div>
                </div>
                <p className={cx(styles.estadoTexto, o.estado === 'Rechazado' && styles.motivo)}>
                  {o.estado === 'Publicado' && `${o.vistas} vistas · ${o.guardados} guardados`}
                  {o.estado === 'En revisión' && 'Enviado hace 3 h · respuesta en 48 h'}
                  {o.estado === 'Rechazado' && <><Icon name="alert" size={14} />Motivo: {o.motivo}</>}
                </p>
                <div className={styles.acciones}>
                  {acciones.map((a) => (
                    <button key={a.label} type="button" className={cx(styles.accion, a.peligro && styles.peligro)} onClick={a.onClick}>
                      <Icon name={a.icon} size={16} />{a.label}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Alert
        open={Boolean(cancelar)}
        peligro
        titulo={`Cancelar “${cancelar ? corto(cancelar.evento.titulo) : ''}”`}
        cancelar="Volver"
        confirmar="Cancelar evento"
        onCancelar={() => setCancelar(null)}
        onConfirmar={confirmarCancelacion}
      >
        {cancelar && cancelar.guardados > 0
          ? `Se ocultará del feed y del mapa, y avisaremos a las ${cancelar.guardados} personas que lo guardaron. Esta acción no se puede deshacer.`
          : 'Se ocultará del feed y del mapa. Esta acción no se puede deshacer.'}
      </Alert>
    </Screen>
  );
}
