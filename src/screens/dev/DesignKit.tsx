// Figma: Design system · RIFF (2008:2) — catálogo de todos los componentes y sus variantes.
import { useState } from 'react';
import {
  Badge, BottomSheet, BudgetSelector, Button, Chip, EventCard, EventRow, Input, Logo, MapCluster,
  MapControls, MapPin, MetricTile, MusicButton, NavBar, NotificationCard, ProgressSteps, RangeSlider,
  SearchBar, SegmentedControl, SkeletonCard, TabBar, Toast, UserLocation, Cover,
  type BadgeTipo, type ButtonTipo, type TipoCuenta, type TabActiva,
} from '../../design-kit/components';
import { EVENTS } from '../../data/events';
import type { Budget, CoverKey, NotificationKind } from '../../types';
import styles from './DesignKit.module.css';

const SWATCHES = [
  ['Fondo', '#100310', 'bg/base', 'var(--bg-base)'],
  ['Superficie', '#633866 · 30 %', 'surface/default', 'var(--surface-default)'],
  ['Superficie profunda', '#633866', 'surface/deep', 'var(--surface-deep)'],
  ['Primario', '#E199D1', 'brand/primary', 'var(--brand-primary)'],
  ['Secundario', '#765BA3', 'brand/secondary', 'var(--brand-secondary)'],
  ['Acento', '#CB6E74', 'brand/accent', 'var(--brand-accent)'],
  ['Sensible / alerta', '#933A50', 'status/danger', 'var(--status-danger)'],
  ['Texto', '#FFFFFF', 'text/primary', 'var(--text-primary)'],
  ['Texto secundario', '#FFFFFF · 65 %', 'text/secondary', 'var(--text-secondary)'],
];

const NOTIS: { tipo: NotificationKind; hace: string; titulo: string; texto: string }[] = [
  { tipo: 'Según tus gustos', hace: 'hace 2 h', titulo: 'Nuevo evento de techno esta semana', texto: 'Kaleido llega a Video Club el vie 16 oct. Encaja con tus gustos.' },
  { tipo: 'Sorpréndeme', hace: 'hace 5 h', titulo: 'Sorpréndeme: algo distinto', texto: '¿Y si pruebas jazz? Jazz en la terraza, Zona G · $35.000' },
  { tipo: 'Recordatorio', hace: 'ayer', titulo: 'Tu evento es mañana', texto: 'Mar de Cumbia · sáb 17 oct · 8:00 p. m. · Latino Power' },
  { tipo: 'Evento aprobado', hace: 'hace 1 h', titulo: 'Tu evento fue aprobado', texto: 'Kaleido ya está en el feed, el mapa y los filtros.' },
  { tipo: 'Hito alcanzado', hace: 'hace 3 h', titulo: '¡30 guardados!', texto: 'Kaleido llegó a 30 guardados. Vas muy bien.' },
  { tipo: 'Actualiza tu evento', hace: 'ayer', titulo: 'Revisa los datos de tu evento', texto: 'Faltan 2 días para Kaleido. Confirma hora y link de venta.' },
];

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className={styles.seccion}>
      <h2 className={styles.label}>{titulo}</h2>
      <div className={styles.fila}>{children}</div>
    </section>
  );
}

export function DesignKit() {
  const [presupuesto, setPresupuesto] = useState<Budget>({ min: 50_000, max: 150_000 });
  const [cuenta, setCuenta] = useState<TipoCuenta | null>('Venue');
  const [guardado, setGuardado] = useState(false);
  const ev = EVENTS[0];
  return (
    <div className={styles.page}>
      <NavBar titulo="design kit" />
      <div className={styles.cuerpo}>
        <h1 className="t-h3">design system · riff</h1>

        <Seccion titulo="color">
          {SWATCHES.map(([n, hex, token, v]) => (
            <div key={token} className={styles.swatch}>
              <span style={{ background: v }} />
              <strong>{n}</strong><small>{hex}</small><small>{token}</small>
            </div>
          ))}
        </Seccion>

        <Seccion titulo="tipografía">
          <div className={styles.columna}>
            <Logo size={96} />
            <p className="t-h1">tu feed</p><p className="t-h2">mis eventos</p><p className="t-h3">cerca de ti</p><p className="t-h4">esta semana</p>
            <p className="t-body">Cuerpo 16 · Lunasima Regular — Descubre música en vivo en Bogotá.</p>
            <p className="t-body-b">Cuerpo 16 Bold · botones e inputs</p>
            <p className="t-small">Secundario 14 · vie 17 oct · 9:00 p. m.</p>
            <p className="t-caption">Caption 12 · etiquetas y ayudas</p>
            <p className="t-fig-48">128  34  9</p><p className="t-fig-32">17</p>
          </div>
        </Seccion>

        <Seccion titulo="Button">
          {(['Primario', 'Secundario', 'Ghost', 'Deshabilitado', 'Peligro', 'Acento'] as ButtonTipo[]).map((t) => (
            <Button key={t} tipo={t}>{t === 'Deshabilitado' ? 'Crear cuenta' : `Botón ${t.toLowerCase()}`}</Button>
          ))}
        </Seccion>

        <Seccion titulo="Input">
          <Input label="Correo o número de celular" placeholder="Ej.: laura@correo.com" ayuda="Te enviaremos un código para verificarlo." estado="Normal" />
          <Input label="Correo o número de celular" defaultValue="laura@" ayuda="Escribe tu correo o un celular de 10 dígitos." estado="Foco" />
          <Input label="Correo o número de celular" defaultValue="laura@correo" error="Falta el dominio. Prueba con laura@correo.com" estado="Error" />
          <Input label="Correo o número de celular" defaultValue="laura@correo.com" ayuda="¡Listo! Correo válido." estado="Válido" />
        </Seccion>

        <Seccion titulo="Chip">
          <Chip>Techno</Chip><Chip estado="Seleccionado">Techno</Chip><Chip estado="Removible">Electrónica</Chip>
        </Seccion>

        <Seccion titulo="Badge">
          {(['Género', 'Venue', '+18', 'En revisión', 'Publicado', 'Rechazado', 'Dentro de presupuesto', 'Fuera de presupuesto'] as BadgeTipo[]).map((t) => <Badge key={t} tipo={t} />)}
        </Seccion>

        <Seccion titulo="Portada">
          {(['estilo-1', 'estilo-2', 'estilo-3', 'estilo-4', 'estilo-5', 'estilo-6', 'omar-courtz', 'penyair', 'el-kalvo', 'baum-festival', 'slipknot', 'berliner-philharmoniker'] as CoverKey[]).map((c) => (
            <div key={c} className={styles.portada}><Cover estilo={c} alt={c} /></div>
          ))}
        </Seccion>

        <Seccion titulo="Event card">
          <EventCard evento={ev} guardado={guardado} onToggleSave={() => setGuardado(!guardado)} />
          <EventCard evento={ev} guardado onToggleSave={() => {}} />
        </Seccion>

        <Seccion titulo="Event row">
          <EventRow evento={EVENTS[1]} guardado={false} onToggleSave={() => {}} />
          <EventRow evento={EVENTS[1]} guardado onToggleSave={() => {}} />
        </Seccion>

        <Seccion titulo="Search bar · Nav bar">
          <SearchBar readOnly />
          <div className={styles.ancho}><NavBar titulo="título" /></div>
        </Seccion>

        <Seccion titulo="Tab bar">
          {(['Feed', 'Mapa', 'Calendario', 'Perfil'] as TabActiva[]).map((t) => (
            <div key={t} className={styles.tabbar}><TabBar activa={t} /></div>
          ))}
        </Seccion>

        <Seccion titulo="Toast">
          <Toast tipo="Guardado" onAccion={() => {}} /><Toast tipo="Quitado" onAccion={() => {}} /><Toast tipo="Error" onAccion={() => {}} />
        </Seccion>

        <Seccion titulo="Map pin · cluster · ubicación · controles">
          <div className={styles.mapa}>
            <MapPin genero="Electrónica" portada="estilo-1" etiqueta="Kaleido: techno" style={{ left: 40, top: 70 }} />
            <MapPin genero="Electrónica" estado="Seleccionado" portada="estilo-1" etiqueta="Kaleido: techno" style={{ left: 150, top: 80 }} />
            <MapPin genero="Cumbia" portada="estilo-2" etiqueta="Kaleido: techno" style={{ left: 40, top: 170 }} />
            <MapPin genero="Cumbia" estado="Seleccionado" portada="estilo-2" etiqueta="Kaleido: techno" style={{ left: 150, top: 180 }} />
            <MapPin genero="Indie" portada="estilo-4" etiqueta="Kaleido: techno" style={{ left: 40, top: 270 }} />
            <MapPin genero="Indie" estado="Seleccionado" portada="estilo-4" etiqueta="Kaleido: techno" style={{ left: 150, top: 280 }} />
            <MapCluster cantidad={4} style={{ left: 280, top: 60 }} />
            <UserLocation style={{ left: 280, top: 150 }} />
            <MapControls className={styles.controles} />
          </div>
        </Seccion>

        <Seccion titulo="Bottom sheet">
          {(['Mínima', 'Media'] as const).map((a) => (
            <div key={a} className={styles.sheet} style={{ height: a === 'Mínima' ? 160 : 430 }}><BottomSheet altura={a} fija /></div>
          ))}
        </Seccion>

        <Seccion titulo="Selector segmentado">
          <SegmentedControl seleccionado={cuenta} onChange={setCuenta} />
        </Seccion>

        <Seccion titulo="Notification card">
          {NOTIS.map((n) => <NotificationCard key={n.tipo} {...n} />)}
        </Seccion>

        <Seccion titulo="Skeleton · Metric tile · Progress steps">
          <SkeletonCard />
          <div className={styles.metricas}>
            <MetricTile valor={128} label="Vistas" /><MetricTile icon="bm" valor={34} label="Guardados" /><MetricTile icon="external" valor={9} label="Clics a venta" />
          </div>
          <ProgressSteps paso={2} nombre="Fecha y lugar" />
        </Seccion>

        <Seccion titulo="Slider de rango · Selector de presupuesto">
          <RangeSlider value={presupuesto} onChange={setPresupuesto} />
          <BudgetSelector value={presupuesto} onChange={setPresupuesto} />
        </Seccion>

        <Seccion titulo="Terceros">
          <MusicButton proveedor="Spotify" /><MusicButton proveedor="Apple Music" />
        </Seccion>
      </div>
    </div>
  );
}
