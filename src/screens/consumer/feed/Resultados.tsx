// Figma: 06 · Resultados de búsqueda 2015:1542 · sin resultados 2015:1736 · cargando 2015:1820
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, EventRow, Icon, NavBar, Screen, SkeletonRow, TabBar } from '../../../design-kit/components';
import { useEstado } from '../../../lib/useEstado';
import { filtrar, getEvents } from '../../../services/eventsService';
import { FILTROS_VACIOS, useApp, type Filtros } from '../../../state/AppState';
import { useGuardar } from '../../../state/useGuardar';
import type { Genre } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Resultados.module.css';

const DEMO: Record<string, { q: string; f: Filtros }> = {
  vacio: { q: 'jazz acústico', f: { ...FILTROS_VACIOS, generos: ['Jazz'], formatos: ['Acústico'], venues: ['Estadio'] } },
  cargando: { q: 'rap', f: { ...FILTROS_VACIOS, generos: ['Electrónica', 'Rap'], formatos: ['DJ set', 'En vivo'] } },
};

export function Resultados() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const guardar = useGuardar();
  const demo = estado ? DEMO[estado] : undefined;
  const q = demo?.q ?? app.query;
  const f = demo?.f ?? app.filtros;
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(true);
    const t = setTimeout(() => setCargando(false), 600);
    return () => clearTimeout(t);
  }, [q, f]);

  const lista = useMemo(() => filtrar(getEvents(), demo ? (estado === 'vacio' ? '' : q) : q, f), [q, f, demo, estado]);
  const chips: { k: 'generos' | 'formatos' | 'venues'; v: string }[] = [
    ...f.generos.map((v) => ({ k: 'generos' as const, v })),
    ...f.formatos.map((v) => ({ k: 'formatos' as const, v })),
    ...f.venues.map((v) => ({ k: 'venues' as const, v })),
  ];
  const quitar = (k: 'generos' | 'formatos' | 'venues', v: string) => app.setFiltros({ ...f, [k]: (f[k] as string[]).filter((x) => x !== v) });
  const vaciar = () => { app.setFiltros(FILTROS_VACIOS); app.setQuery(''); navigate('/buscar', { replace: true }); };

  const mostrarCargando = estado === 'cargando' || (cargando && !estado);
  const vacio = estado === 'vacio' || (!mostrarCargando && lista.length === 0);

  // "Prueba con": combinaciones de un género o formato con otro tipo de venue que sí tienen eventos.
  const sugerencias = useMemo(() => {
    if (!vacio) return [];
    const base = [...f.generos, ...f.formatos];
    const out: string[] = [];
    for (const b of base) {
      for (const v of ['Bar', 'Teatro', 'Club', 'Al aire libre', 'Estadio']) {
        const esGenero = f.generos.includes(b as Genre);
        const r = filtrar(getEvents(), '', { generos: esGenero ? [b as Genre] : [], formatos: esGenero ? [] : [b], venues: [v] });
        if (r.length && !f.venues.includes(v)) { out.push(`${b} · ${v}`); break; }
      }
    }
    return out.slice(0, 2);
  }, [vacio, f]);

  const ultimo = chips[chips.length - 1]?.v;

  return (
    <Screen brillos={BRILLOS_ONBOARDING} conTabBar overlay={<TabBar activa="Feed" />}>
      <NavBar titulo="resultados" />
      <div className={styles.cuerpo}>
        <button type="button" className={styles.buscar} onClick={() => navigate('/buscar?estado=escribir')}>
          <Icon name="search" size={20} className={styles.lupa} />
          <span>{q || 'Buscar eventos, artistas, venues'}</span>
        </button>
      </div>
      {chips.length > 0 && (
        <div className={styles.chips} role="list" aria-label="Filtros activos">
          {chips.map((c) => <Chip key={c.k + c.v} estado="Removible" onClick={() => !demo && quitar(c.k, c.v)}>{c.v}</Chip>)}
        </div>
      )}

      {mostrarCargando ? (
        <div className={styles.lista} aria-busy="true" aria-label="Cargando resultados">
          {Array.from({ length: 5 }, (_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : vacio ? (
        <div className={styles.vacio}>
          <span className={styles.vacioIcono}><Icon name="search" size={56} /></span>
          <h2 className={styles.vacioTitulo}>no encontramos eventos</h2>
          <p className={styles.vacioTexto}>
            Ningún evento coincide con todos tus filtros.{ultimo ? ` Prueba quitar “${ultimo}” o amplía el tipo de venue.` : ''}
          </p>
          {sugerencias.length > 0 && (
            <>
              <p className={styles.prueba}>Prueba con</p>
              <div className={styles.sugerencias}>
                {sugerencias.map((s) => {
                  const [a, v] = s.split(' · ');
                  return (
                    <Chip key={s} onClick={() => app.setFiltros({ ...FILTROS_VACIOS, generos: f.generos.includes(a as Genre) ? [a as Genre] : [], formatos: f.formatos.includes(a) ? [a] : [], venues: [v] })}>
                      {s}
                    </Chip>
                  );
                })}
              </div>
            </>
          )}
          <Button onClick={vaciar} className={styles.quitar}>Quitar todos los filtros</Button>
        </div>
      ) : (
        <>
          <div className={styles.conteo}>
            <p>{lista.length} {lista.length === 1 ? 'evento encontrado' : 'eventos encontrados'}</p>
            <span className={styles.orden}>Más cercanos <Icon name="chev-down" size={16} /></span>
          </div>
          <ul className={styles.lista}>
            {lista.map((e) => <li key={e.id}><EventRow evento={e} guardado={Boolean(app.guardados[e.id])} onToggleSave={() => guardar(e)} /></li>)}
          </ul>
        </>
      )}
    </Screen>
  );
}
