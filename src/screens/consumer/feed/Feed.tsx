// Figma: 04 · Feed principal 2014:299 · cargando 2014:612 · sin conexión 2014:688 ·
// tutorial 1/3 2014:759 · 2/3 2014:813 · 3/3 2014:863
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, EventCard, Icon, Screen, SkeletonCard, TabBar } from '../../../design-kit/components';
import { cx } from '../../../lib/cx';
import { useEstado } from '../../../lib/useEstado';
import { esEstaSemana, getEvents, recomendar } from '../../../services/eventsService';
import { useApp } from '../../../state/AppState';
import { useGuardar, useOnline } from '../../../state/useGuardar';
import type { EventItem } from '../../../types';
import { BRILLOS_APP } from '../../brillos';
import { Tutorial } from './Tutorial';
import styles from './Feed.module.css';

export function Feed() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const guardar = useGuardar();
  const [online, recheck] = useOnline();
  const [cargando, setCargando] = useState(true);
  const [reintentando, setReintentando] = useState(false);

  // Carga simulada (servicio síncrono hoy; con API real esto sería el fetch).
  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 700);
    return () => clearTimeout(t);
  }, []);

  const pasoForzado = estado?.startsWith('tutorial-') ? Number(estado.split('-')[1]) : null;
  const [paso, setPaso] = useState<number | null>(null);
  useEffect(() => {
    if (pasoForzado) setPaso(pasoForzado);
    else if (!app.tutorialVisto && !cargando && online) setPaso(1);
  }, [pasoForzado, app.tutorialVisto, cargando, online]);

  const sinConexion = estado === 'sin-conexion' || (!online && !estado);
  const mostrarSkeleton = estado === 'cargando' || (cargando && !estado) || reintentando;

  const secciones = useMemo(() => {
    const todos = getEvents();
    const rec = recomendar(todos, app.gustos, app.pesosGenero, app.presupuesto);
    const cerca = [...todos].sort((a, b) => a.distanciaKm - b.distanciaKm);
    const semana = todos.filter(esEstaSemana);
    return [
      { titulo: 'recomendado para ti', eventos: rec.slice(0, 6) },
      { titulo: 'cerca de ti', eventos: cerca.slice(0, 6) },
      { titulo: 'esta semana', eventos: semana.length ? semana : rec.slice(6, 10) },
    ];
  }, [app.gustos, app.pesosGenero, app.presupuesto]);

  const terminarTutorial = () => { setPaso(null); app.set('tutorialVisto', true); };
  const reintentar = () => {
    setReintentando(true);
    setTimeout(() => { recheck(); setReintentando(false); }, 700);
  };

  return (
    <Screen
      brillos={BRILLOS_APP}
      conTabBar
      overlay={
        <>
          <div className={styles.barraSuperior} aria-hidden="true" />
          <TabBar activa="Feed" />
          {paso && <Tutorial paso={paso} onPaso={setPaso} onFin={terminarTutorial} />}
        </>
      }
    >
      <header className={styles.header}>
        <div>
          <p className={styles.hola}>hola, {(app.perfil.nombre || 'laura').toLowerCase()}</p>
          <h1 className={styles.titulo}>tu feed</h1>
        </div>
        <Link to="/notificaciones" className={styles.campana} aria-label={app.notisVistas ? 'Notificaciones' : 'Notificaciones (hay nuevas)'}>
          <Icon name="bell" size={22} />
          {!app.notisVistas && <span className={styles.punto} />}
        </Link>
      </header>

      <div className={cx(styles.busqueda, paso === 1 && styles.resaltado)}>
        <button type="button" className={styles.buscar} onClick={() => navigate('/buscar?estado=escribir')}>
          <Icon name="search" size={20} className={styles.lupa} />
          <span>Buscar eventos, artistas, venues</span>
        </button>
        <Link to="/buscar" className={styles.filtros} aria-label="Filtros">
          <Icon name="sliders" size={22} />
        </Link>
      </div>

      {sinConexion && !mostrarSkeleton ? (
        <SinConexion onReintentar={reintentar} />
      ) : mostrarSkeleton ? (
        <section className={styles.seccion} aria-busy="true" aria-label="Cargando eventos">
          <h2 className={styles.h3}>recomendado para ti</h2>
          <div className={styles.skeletons}><SkeletonCard /><SkeletonCard /></div>
        </section>
      ) : (
        secciones.map((s, i) => (
          <Carrusel
            key={s.titulo}
            titulo={s.titulo}
            eventos={s.eventos}
            guardados={app.guardados}
            onGuardar={guardar}
            resaltarPrimerGuardar={i === 0 && paso === 2}
          />
        ))
      )}
    </Screen>
  );
}

function Carrusel({ titulo, eventos, guardados, onGuardar, resaltarPrimerGuardar }: {
  titulo: string; eventos: EventItem[]; guardados: Record<string, unknown>; onGuardar: (e: EventItem) => void; resaltarPrimerGuardar: boolean;
}) {
  return (
    <section className={styles.seccion} aria-label={titulo}>
      <h2 className={styles.h3}>{titulo}</h2>
      <ul className={styles.carrusel}>
        {eventos.map((e, i) => (
          <li key={e.id} className={cx(styles.item, i === 0 && resaltarPrimerGuardar && styles.resaltarGuardar)}>
            <EventCard evento={e} guardado={Boolean(guardados[e.id])} onToggleSave={() => onGuardar(e)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SinConexion({ onReintentar }: { onReintentar: () => void }) {
  return (
    <div className={styles.offline} role="alert">
      <p className={styles.banner}><Icon name="wifi-off" size={20} />Sin conexión a internet</p>
      <span className={styles.offIcono}><Icon name="wifi-off" size={56} /></span>
      <h2 className={styles.offTitulo}>se fue la señal</h2>
      <p className={styles.offTexto}>No pudimos cargar los eventos. Revisa tu wifi o datos móviles e inténtalo otra vez. Tus eventos guardados siguen disponibles en Calendario.</p>
      <Button onClick={onReintentar}>Reintentar</Button>
    </div>
  );
}
