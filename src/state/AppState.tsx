// Estado global de RIFF con React Context + localStorage.
// Sesión simulada, perfil del consumidor, guardados, organizador y eventos publicados.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Budget, EventItem, Genre, MusicProvider, Reminder, Session, OrganizerEventStatus } from '../types';
import type { TipoCuenta } from '../design-kit/components';
import { clearAll, load, save } from './storage';

export type Filtros = { generos: Genre[]; formatos: string[]; venues: string[]; fecha: string | null; precio: string | null };
export const FILTROS_VACIOS: Filtros = { generos: [], formatos: [], venues: [], fecha: null, precio: null };

export type DocEstado = 'pendiente' | 'subiendo' | 'subido';
export type Verificacion = {
  estado: 'sin-enviar' | 'en-revision' | 'aprobada' | 'rechazada';
  docs: Record<string, { estado: DocEstado; archivo?: string }>;
  motivo?: string;
};

export type OrgEvent = { evento: EventItem; estado: OrganizerEventStatus; vistas: number; guardados: number; clics: number; motivo?: string };

export type Borrador = {
  paso: number;
  nombre: string;
  organizadores: string;
  portada: string | null;
  direccion: string;
  fecha: string;
  hora: string;
  generos: Genre[];
  formato: string | null;
  venueTipo: string | null;
  precioDesde: string;
  precioHasta: string;
  edad: 'Todo público' | '+14' | '+18' | null;
  urlVenta: string;
  pmu: string | null;
  restricciones: string;
};
export const BORRADOR_VACIO: Borrador = {
  paso: 1, nombre: '', organizadores: '', portada: null, direccion: '', fecha: '', hora: '',
  generos: [], formato: null, venueTipo: null, precioDesde: '', precioHasta: '', edad: null,
  urlVenta: '', pmu: null, restricciones: '',
};

export type Perfil = { nombre: string; apellido: string; contacto: string };
export type OrgPerfil = { nombre: string; contacto: string; tipo: TipoCuenta | null; zona: string; descripcion: string; ubicacion: string; redes: string };

type State = {
  session: Session;
  perfil: Perfil;
  gustos: Genre[];
  artistas: string[];
  musica: MusicProvider | null;
  presupuesto: Budget | null;
  guardados: Record<string, Reminder>;
  pesosGenero: Partial<Record<Genre, number>>;
  tutorialVisto: boolean;
  recientes: string[];
  org: OrgPerfil;
  verificacion: Verificacion;
  orgEventos: OrgEvent[];
  borrador: Borrador;
};

const INICIAL: State = {
  session: null,
  perfil: { nombre: '', apellido: '', contacto: '' },
  gustos: [],
  artistas: [],
  musica: null,
  presupuesto: null,
  guardados: {},
  pesosGenero: {},
  tutorialVisto: false,
  recientes: [],
  org: { nombre: '', contacto: '', tipo: null, zona: '', descripcion: '', ubicacion: '', redes: '' },
  verificacion: { estado: 'sin-enviar', docs: {} },
  orgEventos: [],
  borrador: BORRADOR_VACIO,
};

type Ctx = State & {
  set: <K extends keyof State>(key: K, value: State[K] | ((prev: State[K]) => State[K])) => void;
  toggleGuardado: (id: string, generos: Genre[]) => boolean;
  setRecordatorio: (id: string, r: Reminder) => void;
  filtros: Filtros;
  setFiltros: (f: Filtros) => void;
  query: string;
  setQuery: (q: string) => void;
  cerrarSesion: () => void;
  reiniciarDemo: () => void;
};

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => ({ ...INICIAL, ...load<Partial<State>>('state', {}) }));
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [query, setQuery] = useState('');

  useEffect(() => { save('state', state); }, [state]);

  const set = useCallback<Ctx['set']>((key, value) => {
    setState((s) => ({ ...s, [key]: typeof value === 'function' ? (value as (p: unknown) => unknown)(s[key]) : value }));
  }, []);

  const toggleGuardado = useCallback((id: string, generos: Genre[]) => {
    let guardado = false;
    setState((s) => {
      const g = { ...s.guardados };
      const pesos = { ...s.pesosGenero };
      if (g[id]) {
        delete g[id];
        generos.forEach((x) => { pesos[x] = Math.max(0, (pesos[x] ?? 0) - 1); });
      } else {
        g[id] = '1 día antes';
        guardado = true;
        generos.forEach((x) => { pesos[x] = (pesos[x] ?? 0) + 1; }); // guardar suma peso al género
      }
      return { ...s, guardados: g, pesosGenero: pesos };
    });
    return guardado;
  }, []);

  const setRecordatorio = useCallback((id: string, r: Reminder) => {
    setState((s) => ({ ...s, guardados: { ...s.guardados, [id]: r } }));
  }, []);

  const cerrarSesion = useCallback(() => setState((s) => ({ ...s, session: null })), []);
  const reiniciarDemo = useCallback(() => { clearAll(); setState(INICIAL); setFiltros(FILTROS_VACIOS); }, []);

  const value = useMemo<Ctx>(() => ({
    ...state, set, toggleGuardado, setRecordatorio, filtros, setFiltros, query, setQuery, cerrarSesion, reiniciarDemo,
  }), [state, set, toggleGuardado, setRecordatorio, filtros, query, cerrarSesion, reiniciarDemo]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppStateProvider');
  return ctx;
}
