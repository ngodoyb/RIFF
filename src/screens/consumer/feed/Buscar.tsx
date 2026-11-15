// Figma: 05 · Búsqueda y filtros 2015:1442 · 05 · Búsqueda — escribir 2170:3564
import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, EventRow, Icon, NavBar, Screen, SearchBar } from '../../../design-kit/components';
import { FILTRO_FORMATOS, FILTRO_GENEROS, FILTRO_VENUES, RECIENTES_DEMO } from '../../../data/genres';
import { useEstado } from '../../../lib/useEstado';
import { buscar, getEvents } from '../../../services/eventsService';
import { useApp, type Filtros } from '../../../state/AppState';
import { useGuardar } from '../../../state/useGuardar';
import type { Genre } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Buscar.module.css';

export function Buscar() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const guardar = useGuardar();
  const [q, setQ] = useState(app.query);
  const [escribiendo, setEscribiendo] = useState(estado === 'escribir');
  const [draft, setDraft] = useState<Filtros>(app.filtros);
  const input = useRef<HTMLInputElement>(null);
  const recientes = app.recientes.length ? app.recientes : RECIENTES_DEMO;

  const toggle = <K extends 'generos' | 'formatos' | 'venues'>(k: K, v: string) =>
    setDraft((d) => ({ ...d, [k]: (d[k] as string[]).includes(v) ? (d[k] as string[]).filter((x) => x !== v) : [...(d[k] as string[]), v] }));
  const n = draft.generos.length + draft.formatos.length + draft.venues.length;

  const aplicar = (query = q, f: Filtros = draft) => {
    const limpio = query.trim();
    app.setQuery(limpio);
    app.setFiltros(f);
    if (limpio) app.set('recientes', (r) => [limpio, ...r.filter((x) => x !== limpio)].slice(0, 6));
    navigate('/resultados');
  };

  const resultados = useMemo(() => (q.trim() ? buscar(getEvents(), q) : getEvents()).slice(0, 8), [q]);

  if (escribiendo) {
    return (
      <Screen brillos={BRILLOS_ONBOARDING}>
        <NavBar titulo="buscar" onBack={() => setEscribiendo(false)} />
        <form className={styles.cuerpo} role="search" onSubmit={(e) => { e.preventDefault(); aplicar(); }}>
          <SearchBar
            ref={input}
            autoFocus
            foco
            placeholder="Busca un evento, artista o venue"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onClear={() => { setQ(''); input.current?.focus(); }}
            enterKeyHint="search"
          />
          <p className={styles.etiqueta}>eventos en RIFF</p>
          <ul className={styles.lista} aria-live="polite">
            {resultados.map((e) => (
              <li key={e.id}><EventRow evento={e} guardado={Boolean(app.guardados[e.id])} onToggleSave={() => guardar(e)} /></li>
            ))}
          </ul>
        </form>
      </Screen>
    );
  }

  return (
    <Screen
      brillos={BRILLOS_ONBOARDING}
      overlay={
        <div className={styles.acciones}>
          <Button tipo="Ghost" className={styles.limpiar} onClick={() => { setDraft({ ...draft, generos: [], formatos: [], venues: [] }); setQ(''); }}>Limpiar</Button>
          <Button className={styles.aplicar} onClick={() => aplicar()}>Aplicar filtros{n ? ` (${n})` : ''}</Button>
        </div>
      }
    >
      <NavBar titulo="buscar y filtrar" />
      <div className={styles.cuerpo}>
        <SearchBar
          value={q}
          foco={Boolean(q)}
          onChange={(e) => { setQ(e.target.value); setEscribiendo(true); }}
          onFocus={() => setEscribiendo(true)}
        />
        <p className={styles.recientesTitulo}><Icon name="clock" size={14} />Búsquedas recientes</p>
        <div className={styles.recientes}>
          {recientes.map((r) => <Chip key={r} onClick={() => { setQ(r); aplicar(r); }}>{r}</Chip>)}
        </div>
        <Grupo titulo="género" items={FILTRO_GENEROS} sel={draft.generos} onToggle={(v) => toggle('generos', v as Genre)} />
        <Grupo titulo="formato de acto" items={[...FILTRO_FORMATOS]} sel={draft.formatos} onToggle={(v) => toggle('formatos', v)} />
        <Grupo titulo="tipo de venue" items={[...FILTRO_VENUES]} sel={draft.venues} onToggle={(v) => toggle('venues', v)} />
      </div>
    </Screen>
  );
}

function Grupo({ titulo, items, sel, onToggle }: { titulo: string; items: string[]; sel: string[]; onToggle: (v: string) => void }) {
  return (
    <section className={styles.grupo} aria-label={titulo}>
      <h2 className={styles.h4}>{titulo}</h2>
      <div className={styles.chips}>
        {items.map((g) => <Chip key={g} estado={sel.includes(g) ? 'Seleccionado' : 'Default'} onClick={() => onToggle(g)}>{g}</Chip>)}
      </div>
    </section>
  );
}
