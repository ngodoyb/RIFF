// Figma: 10 · Mapa de Bogotá 2020:1989 · lista (hoja media) 2020:6244 · pin seleccionado 2020:10552 ·
// hoja completa 2020:14868 · zoom en cluster 2021:19070 · sin permiso de ubicación 2021:23280 ·
// zona sin eventos 2021:27512 · cómo llegar 2021:31674
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ActionSheet, BottomSheet, Button, Chip, Cover, EventRow, Icon, MapView, SearchBar, TabBar,
  VISTA_INICIAL, type SheetAltura, type Vista,
} from '../../../design-kit/components';
import { HOY } from '../../../data/demo';
import { USUARIO_MAPA, ZONAS } from '../../../data/mapa';
import { cx } from '../../../lib/cx';
import { fechaEvento, km, parseLocal, rangoPrecio, hora } from '../../../lib/format';
import { buscar, enPresupuesto, esEstaSemana, getEvents } from '../../../services/eventsService';
import { appleRuta, googleRuta } from '../../../services/mapsService';
import { useApp } from '../../../state/AppState';
import { useGuardar } from '../../../state/useGuardar';
import type { EventItem } from '../../../types';
import styles from './Mapa.module.css';

const ALTO = 812 - 83; // área sobre la tab bar
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

type Permiso = 'ok' | 'pedir' | 'no';

/** Fecha corta de las filas del mapa: "sáb 17 · 8:00 p. m." / "12–13 feb 2027". */
function fechaFila(e: EventItem): string {
  const d = parseLocal(e.inicio);
  if (e.fin) return fechaEvento(e.inicio, e.fin, true).replace(/^\w+ (\d+) – \w+ /, '$1–');
  return `${DIAS[d.getDay()]} ${d.getDate()} · ${hora(d)}`;
}

export function Mapa() {
  const [params] = useSearchParams();
  const estado = params.get('estado');
  const navigate = useNavigate();
  const app = useApp();
  const guardar = useGuardar();
  const todos = useMemo(() => getEvents(), []);

  const [vista, setVista] = useState<Vista>(VISTA_INICIAL);
  const [altura, setAltura] = useState<SheetAltura>('Mínima');
  const [sel, setSel] = useState<string | null>(null);
  const [cluster, setCluster] = useState<string | null>(null);
  const [permiso, setPermiso] = useState<Permiso>('ok');
  const [rutas, setRutas] = useState(false);
  const [q, setQ] = useState('');
  const [chips, setChips] = useState<{ hoy: boolean; semana: boolean; precio: boolean }>({ hoy: false, semana: false, precio: false });

  // Estados forzados de Figma y "Ver en mapa" desde el detalle.
  useEffect(() => {
    const omar = todos.find((e) => e.id === 'omar-courtz')!;
    const desde = params.get('evento');
    if (estado === 'lista') setAltura('Media');
    if (estado === 'completa') { setAltura('Completa'); setChips((c) => ({ ...c, hoy: true })); }
    if (estado === 'pin' || estado === 'como-llegar' || desde) seleccionar(todos.find((e) => e.id === desde) ?? omar);
    if (estado === 'como-llegar') setRutas(true);
    if (estado === 'cluster') { setVista({ x: -493, y: -604, s: 1.6 }); setCluster('Zona T'); }
    if (estado === 'sin-permiso') setPermiso('pedir');
    if (estado === 'sin-eventos') setVista({ x: 0, y: -60, s: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  // Permiso real de ubicación (navigator.geolocation / Permissions API).
  useEffect(() => {
    if (estado) return;
    if (!('geolocation' in navigator)) { setPermiso('no'); return; }
    navigator.permissions?.query({ name: 'geolocation' as PermissionName })
      .then((p) => setPermiso(p.state === 'granted' ? 'ok' : p.state === 'denied' ? 'no' : 'pedir'))
      .catch(() => setPermiso('pedir'));
  }, [estado]);

  const activarUbicacion = () => {
    navigator.geolocation.getCurrentPosition(() => setPermiso('ok'), () => setPermiso('no'), { timeout: 8000 });
  };

  const seleccionar = (e: EventItem) => {
    setSel(e.id);
    setCluster(null);
    setAltura('Media');
    setVista((v) => ({ s: v.s, x: 184 - e.mapa.x * v.s, y: 216 - e.mapa.y * v.s }));
  };

  // Eventos visibles: búsqueda + chips de la hoja completa.
  const visibles = useMemo(() => {
    let l = buscar(todos, q);
    if (chips.hoy) l = l.filter((e) => parseLocal(e.inicio).toDateString() === HOY.toDateString() || esEstaSemana(e));
    if (chips.semana) l = l.filter(esEstaSemana);
    if (chips.precio) l = l.filter((e) => enPresupuesto(e, app.presupuesto) !== false);
    return l;
  }, [todos, q, chips, app.presupuesto]);

  // Eventos dentro del área visible del mapa (para "zona sin eventos").
  const enPantalla = visibles.filter((e) => {
    const x = vista.x + e.mapa.x * vista.s;
    const y = vista.y + e.mapa.y * vista.s;
    return x > 0 && x < 375 && y > 40 && y < ALTO - 148;
  });
  const zonaVacia = !sel && !cluster && enPantalla.length === 0;
  const zona = useMemo(() => {
    const cx0 = (187 - vista.x) / vista.s;
    const cy0 = (300 - vista.y) / vista.s;
    return [...ZONAS].sort((a, b) => Math.hypot(a.x - cx0, a.y - cy0) - Math.hypot(b.x - cx0, b.y - cy0)).slice(0, 2).map((z) => z.nombre);
  }, [vista]);

  const seleccionado = todos.find((e) => e.id === sel) ?? null;
  const ordenados = [...visibles].sort((a, b) => a.distanciaKm - b.distanciaKm);
  const delCluster = cluster ? visibles.filter((e) => e.zona === cluster) : [];
  const cercaDe = seleccionado
    ? ordenados.filter((e) => e.id !== seleccionado.id).sort((a, b) => Math.hypot(a.mapa.x - seleccionado.mapa.x, a.mapa.y - seleccionado.mapa.y) - Math.hypot(b.mapa.x - seleccionado.mapa.x, b.mapa.y - seleccionado.mapa.y))
    : [];

  let titulo = `${visibles.length} eventos cerca de ti`;
  let sub = altura === 'Mínima' ? 'Bogotá · actualizado hace 1 min' : 'Ordenados por distancia';
  if (permiso !== 'ok') { titulo = `${visibles.length} eventos en toda Bogotá`; sub = 'Sin ubicación · centrado en Bogotá'; }
  if (cluster) { titulo = `${delCluster.length} eventos en ${cluster}`; sub = `Acercaste el mapa · ${cluster}`; }
  if (zonaVacia) { titulo = '0 eventos en esta zona'; sub = zona.join(' · '); }

  const fila = (e: EventItem) => (
    <li key={e.id}>
      <EventRow
        evento={e}
        titulo={e.tituloCorto ?? e.titulo}
        fecha={fechaFila(e)}
        guardado={Boolean(app.guardados[e.id])}
        onToggleSave={() => guardar(e)}
      />
    </li>
  );

  return (
    <div className={styles.pantalla}>
      <MapView
        eventos={visibles}
        vista={vista}
        onVista={(v) => { setVista(v); if (cluster && v.s < 1.3) setCluster(null); }}
        alto={ALTO}
        seleccionado={sel}
        usuario={permiso === 'ok' ? USUARIO_MAPA : null}
        onPin={seleccionar}
        onCluster={(z, lista) => {
          const c = { x: lista.reduce((a, e) => a + e.mapa.x, 0) / lista.length, y: lista.reduce((a, e) => a + e.mapa.y, 0) / lista.length };
          setVista({ s: 1.6, x: 187 - c.x * 1.6, y: 300 - c.y * 1.6 });
          setCluster(z);
          setSel(null);
        }}
      >
        {permiso === 'pedir' && (
          <div className={styles.permiso} role="dialog" aria-label="Activa tu ubicación">
            <div className={styles.permisoFila}>
              <span className={styles.permisoIcono}><Icon name="nav" size={20} /></span>
              <div>
                <strong>Activa tu ubicación</strong>
                <p>Así te mostramos lo que suena cerca y la distancia a cada evento.</p>
              </div>
            </div>
            <div className={styles.permisoBotones}>
              <Button tipo="Secundario" onClick={() => setPermiso('no')}>Ahora no</Button>
              <Button onClick={activarUbicacion}>Activar ubicación</Button>
            </div>
          </div>
        )}
        {zonaVacia && (
          <div className={styles.vacio} role="status">
            <span className={styles.vacioIcono}><Icon name="map" size={24} /></span>
            <h2>no hay eventos en esta zona</h2>
            <p>Por ahora no hay música en vivo por {zona.join(' y ')}. Amplía la búsqueda a toda la ciudad.</p>
            <Button onClick={() => { setVista(VISTA_INICIAL); setQ(''); setChips({ hoy: false, semana: false, precio: false }); }}>Buscar en toda Bogotá</Button>
          </div>
        )}
      </MapView>

      <BottomSheet altura={altura} onAltura={(a) => { setAltura(a); if (a === 'Mínima') setSel(null); }} bottom={83} label="Eventos en el mapa">
        {seleccionado ? (
          <div className={styles.hoja}>
            <div className={styles.cabecera}>
              <div>
                <h2 className={styles.titulo}>{km(seleccionado.distanciaKm)} de ti</h2>
                <p className={styles.sub}>{seleccionado.venueCorto} · {seleccionado.zona}</p>
              </div>
              <button type="button" className={styles.cerrar} aria-label="Cerrar" onClick={() => { setSel(null); setAltura('Mínima'); }}><Icon name="x" size={20} /></button>
            </div>
            <div className={styles.mini}>
              <div className={styles.miniArriba}>
                <span className={styles.miniPortada}><Cover estilo={seleccionado.portada} alt="" /></span>
                <div className={styles.miniTexto}>
                  <strong>{seleccionado.titulo}</strong>
                  <span><Icon name="cal" size={14} />{fechaEvento(seleccionado.inicio, seleccionado.fin)}</span>
                  <span><Icon name="pin" size={14} />{km(seleccionado.distanciaKm)} · {Math.round(seleccionado.distanciaKm * 3.5)} min en carro</span>
                  <b>{rangoPrecio(seleccionado.precioMin, seleccionado.precioMax, seleccionado.precioTexto)}</b>
                </div>
              </div>
              <div className={styles.miniBotones}>
                <button type="button" onClick={() => navigate(`/evento/${seleccionado.id}`)}><Icon name="eye" size={18} />Ver detalle</button>
                <button type="button" aria-pressed={Boolean(app.guardados[seleccionado.id])} onClick={() => guardar(seleccionado)}>
                  <Icon name={app.guardados[seleccionado.id] ? 'bm-filled' : 'bm'} size={18} />Guardar
                </button>
                <button type="button" className={styles.llegar} onClick={() => setRutas(true)}><Icon name="route" size={18} />Cómo llegar</button>
              </div>
            </div>
            <p className={styles.seccion}>más cerca de aquí</p>
            <ul className={styles.lista}>{cercaDe.slice(0, 4).map(fila)}</ul>
          </div>
        ) : (
          <div className={styles.hoja}>
            <h2 className={styles.titulo}>{titulo}</h2>
            <p className={styles.sub}>{sub}</p>
            {altura === 'Completa' && (
              <div className={styles.chips}>
                <Chip estado={chips.hoy ? 'Seleccionado' : 'Default'} onClick={() => setChips((c) => ({ ...c, hoy: !c.hoy }))}>Hoy</Chip>
                <Chip estado={chips.semana ? 'Seleccionado' : 'Default'} onClick={() => setChips((c) => ({ ...c, semana: !c.semana }))}>Esta semana</Chip>
                <Chip onClick={() => navigate('/buscar')}>Género</Chip>
                <Chip estado={chips.precio ? 'Seleccionado' : 'Default'} onClick={() => setChips((c) => ({ ...c, precio: !c.precio }))}>Precio</Chip>
              </div>
            )}
            {altura === 'Mínima' ? (
              <SearchBar className={styles.buscar} placeholder="Buscar en el mapa" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setAltura('Media')} />
            ) : (
              <ul className={cx(styles.lista, styles.listaScroll)}>{(cluster ? delCluster : ordenados).map(fila)}</ul>
            )}
          </div>
        )}
      </BottomSheet>

      <TabBar activa="Mapa" />
      {seleccionado && (
        <ActionSheet
          open={rutas}
          primario
          titulo={`Cómo llegar al ${seleccionado.venueCorto}`}
          mensaje="Abriremos la app de mapas con la ruta desde tu ubicación. Saldrás de RIFF."
          opciones={['Abrir en Apple Maps', 'Abrir en Google Maps']}
          iconos={{ 'Abrir en Apple Maps': 'route', 'Abrir en Google Maps': 'route' }}
          onSelect={(o) => { window.open(o === 'Abrir en Apple Maps' ? appleRuta(seleccionado) : googleRuta(seleccionado), '_blank', 'noopener,noreferrer'); setRutas(false); }}
          onClose={() => setRutas(false)}
        />
      )}
    </div>
  );
}
