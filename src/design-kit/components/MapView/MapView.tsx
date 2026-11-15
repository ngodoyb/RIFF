// MapView: mapa de Bogotá sin librería de mapas.
// Usa el asset "Mapa Bogotá (base · modo oscuro)" 2011:72 (600 × 1000) y posiciona los pines con
// las coordenadas de Figma. La vista es { x, y, s }: desplazamiento en px y escala (1 = 10 · Mapa 2020:1989,
// 1.6 = zoom en cluster 2021:19070). Se arrastra con el dedo/ratón; los clusters se separan al acercar.
import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import mapaBase from '../../../assets/mapa/bogota-base.jpg';
import type { EventItem } from '../../../types';
import { cx } from '../../../lib/cx';
import { MapCluster, MapPin, UserLocation } from '../MapPin';
import styles from './MapView.module.css';

export const MAPA_W = 600;
export const MAPA_H = 1000;
export type Vista = { x: number; y: number; s: number };
export const VISTA_INICIAL: Vista = { x: -130, y: -430, s: 1 };

/** Zonas que Figma agrupa en un cluster cuando el mapa está alejado. */
export const ZONAS_CLUSTER = ['Zona T'];
const ESCALA_SEPARA = 1.3;

type Props = {
  eventos: EventItem[];
  vista: Vista;
  onVista: (v: Vista) => void;
  seleccionado?: string | null;
  onPin?: (e: EventItem) => void;
  onCluster?: (zona: string, eventos: EventItem[]) => void;
  /** Posición del usuario en el mapa base, o null sin permiso de ubicación. */
  usuario?: { x: number; y: number } | null;
  alto: number;
  children?: ReactNode;
  className?: string;
};

export function MapView({ eventos, vista, onVista, seleccionado, onPin, onCluster, usuario, alto, children, className }: Props) {
  const drag = useRef<{ px: number; py: number; v: Vista; movio: boolean } | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  const clamp = (v: Vista): Vista => ({
    s: v.s,
    x: Math.min(0, Math.max(375 - MAPA_W * v.s, v.x)),
    y: Math.min(60, Math.max(alto - MAPA_H * v.s, v.y)),
  });
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    drag.current = { px: e.clientX, py: e.clientY, v: vista, movio: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.movio && Math.hypot(dx, dy) < 4) return;
    d.movio = true;
    setArrastrando(true);
    onVista(clamp({ ...d.v, x: d.v.x + dx, y: d.v.y + dy }));
  };
  const onUp = () => { drag.current = null; setArrastrando(false); };

  const agrupar = vista.s < ESCALA_SEPARA;
  const clusters = new Map<string, EventItem[]>();
  const sueltos: EventItem[] = [];
  for (const e of eventos) {
    if (agrupar && ZONAS_CLUSTER.includes(e.zona) && e.id !== seleccionado) {
      clusters.set(e.zona, [...(clusters.get(e.zona) ?? []), e]);
    } else sueltos.push(e);
  }
  const pos = (p: { x: number; y: number }) => ({ left: vista.x + p.x * vista.s, top: vista.y + p.y * vista.s });
  const centro = (lista: EventItem[]) => ({
    x: lista.reduce((a, e) => a + e.mapa.x, 0) / lista.length,
    y: lista.reduce((a, e) => a + e.mapa.y, 0) / lista.length,
  });

  return (
    <div
      className={cx(styles.mapa, arrastrando && styles.arrastrando, className)}
      style={{ height: alto }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="application"
      aria-label="Mapa de eventos en Bogotá. Arrastra para moverte."
    >
      <img
        src={mapaBase}
        alt=""
        draggable={false}
        className={styles.base}
        style={{ width: MAPA_W * vista.s, height: MAPA_H * vista.s, transform: `translate(${vista.x}px, ${vista.y}px)` }}
      />
      {usuario && <UserLocation style={pos(usuario)} />}
      {[...clusters.entries()].map(([zona, lista]) => (
        lista.length > 1
          ? <MapCluster key={zona} cantidad={lista.length} style={pos(centro(lista))} onClick={() => onCluster?.(zona, lista)} />
          : <Pin key={lista[0].id} e={lista[0]} />
      ))}
      {sueltos.map((e) => <Pin key={e.id} e={e} />)}
      <p className={styles.atribucion}>Mapa: Esri, © colaboradores de OpenStreetMap</p>
      {children}
    </div>
  );

  function Pin({ e }: { e: EventItem }) {
    const sel = e.id === seleccionado;
    return (
      <MapPin
        genero={e.generos[0]}
        estado={sel ? 'Seleccionado' : 'Normal'}
        portada={e.portada}
        etiqueta={e.tituloCorto ?? e.titulo}
        style={pos(e.mapa)}
        onClick={() => onPin?.(e)}
      />
    );
  }
}
