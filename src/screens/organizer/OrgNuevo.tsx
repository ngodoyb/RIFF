// Figma: 06 · Formulario de publicación de evento 2025:36283 (paso 1) · paso 2 2025:36371 · paso 3 2025:40555 · paso 4 2025:40664
// El borrador (incluido el paso actual) se guarda en localStorage; "Atrás" conserva lo escrito.
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Cover, Icon, Input, NavBar, ProgressSteps, Screen } from '../../design-kit/components';
import mapaBase from '../../assets/mapa/bogota-base.jpg';
import { cx } from '../../lib/cx';
import { pesos } from '../../lib/format';
import { useEstado } from '../../lib/useEstado';
import { validarUrl } from '../../lib/validation';
import { borradorAEvento, eventosIniciales } from '../../services/organizerService';
import { BORRADOR_VACIO, useApp, type Borrador } from '../../state/AppState';
import type { Genre } from '../../types';
import { BRILLOS_ONBOARDING } from '../brillos';
import o from './Org.module.css';
import styles from './OrgNuevo.module.css';

const NOMBRES = ['Lo básico', 'Fecha y lugar', 'Clasificación y precio', 'Venta y permisos'];
const GENEROS: Genre[] = ['Reggaetón', 'Urbano', 'Pop latino', 'Electrónica', 'Salsa'];
const FORMATOS = ['DJ set', 'En vivo', 'Acústico'];
const VENUES = ['Club', 'Bar', 'Teatro', 'Al aire libre'];
const DEMO: Borrador = {
  ...BORRADOR_VACIO, nombre: 'Bambulé · Viernes de Reggaetón', organizadores: '@bambulebta', portada: 'bambule',
  direccion: 'Cra. 13 # 83-47, El Retiro · Chapinero', fecha: '2026-10-16', hora: '20:00',
  generos: ['Reggaetón', 'Urbano'], formato: 'DJ set', venueTipo: 'Club', precioDesde: '40000', precioHasta: '60000', edad: '+18',
  urlVenta: 'https://tikipal.com.co/bogota/bambule-viernes', pmu: 'licencia_bambule_zona_rosa.pdf · 860 KB',
  restricciones: 'Solo mayores de 18 años. Ingreso con cédula. Cover consumible.',
};

export function OrgNuevo() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const forzado = estado?.startsWith('paso-') ? Number(estado.split('-')[1]) : null;
  const [b, setB] = useState<Borrador>(forzado ? { ...DEMO, paso: forzado } : app.borrador);
  const [tip, setTip] = useState<'organizadores' | 'pmu' | null>(null);

  const { set } = app;
  useEffect(() => { if (!forzado) set('borrador', b); }, [b, forzado, set]);
  const up = (p: Partial<Borrador>) => setB((x) => ({ ...x, ...p }));
  const toggle = (k: 'generos', v: Genre) => up({ [k]: b[k].includes(v) ? b[k].filter((x) => x !== v) : [...b[k], v] });

  const ultimo = eventosIniciales(app.orgEventos)[0]?.evento;
  const precioOk = (s: string) => /^\d{0,7}$/.test(s.replace(/\D/g, ''));
  const valido = [
    b.nombre.trim().length >= 3 && Boolean(b.portada),
    b.direccion.trim().length >= 5 && Boolean(b.fecha) && Boolean(b.hora),
    b.generos.length > 0 && Boolean(b.formato) && Boolean(b.venueTipo) && Boolean(b.edad) && precioOk(b.precioDesde) && (!b.precioHasta || Number(b.precioHasta) >= Number(b.precioDesde || 0)),
    validarUrl(b.urlVenta) && b.restricciones.length <= 200,
  ][b.paso - 1];

  const enviar = () => {
    const evento = borradorAEvento(b, app.org.nombre || 'Bambulé');
    app.set('orgEventos', (l) => [{ evento, estado: 'En revisión', vistas: 0, guardados: 0, clics: 0 }, ...eventosIniciales(l)]);
    app.set('borrador', BORRADOR_VACIO);
    navigate('/org/revision', { replace: true, state: { id: evento.id } });
  };
  const siguiente = () => (b.paso === 4 ? enviar() : up({ paso: b.paso + 1 }));
  const atras = () => (b.paso === 1 ? navigate(-1) : up({ paso: b.paso - 1 }));

  return (
    <Screen
      brillos={BRILLOS_ONBOARDING}
      overlay={
        <div className={o.acciones}>
          <Button tipo="Ghost" className={o.secundario} onClick={atras}>{b.paso === 1 ? 'Cancelar' : 'Atrás'}</Button>
          <Button className={o.principal} disabled={!valido} onClick={siguiente}>{b.paso === 4 ? 'Enviar a revisión' : 'Siguiente'}</Button>
        </div>
      }
    >
      <NavBar titulo="nuevo evento" onBack={atras} />
      <div className={styles.cuerpo}>
        <ProgressSteps paso={b.paso} nombre={NOMBRES[b.paso - 1]} />

        {b.paso === 1 && (
          <>
            {ultimo && (
              <button type="button" className={styles.duplicar} onClick={() => up({
                nombre: ultimo.titulo, portada: ultimo.portada, direccion: ultimo.direccion, generos: ultimo.generos,
                formato: ultimo.formato, venueTipo: ultimo.venueTipo, precioDesde: String(ultimo.precioMin ?? ''), precioHasta: String(ultimo.precioMax ?? ''),
                edad: '+18', urlVenta: ultimo.urlVenta, organizadores: b.organizadores || app.org.redes || '@bambulebta',
              })}>
                <Icon name="duplicate" size={22} />
                <span><strong>Duplicar un evento anterior</strong><span>Reutiliza los datos de “{ultimo.titulo.replace(/^.*? · /, '')} · oct 9”</span></span>
                <Icon name="chev" size={20} />
              </button>
            )}
            <Input label="Nombre del evento" value={b.nombre} onChange={(e) => up({ nombre: e.target.value })} valido={b.nombre.trim().length >= 3} />
            <Etiqueta texto="Organizadores" tip={tip === 'organizadores'} onTip={() => setTip(tip === 'organizadores' ? null : 'organizadores')}
              ayuda="Agrega a los artistas o productores con su @usuario de RIFF. Aparecerán en el detalle del evento.">
              <Input label="Organizadores" className={styles.sinLabel} value={b.organizadores} placeholder="@usuario" onChange={(e) => up({ organizadores: e.target.value })} />
            </Etiqueta>
            <div className={o.campo}>
              <span className={o.label}>Portada</span>
              <label className={cx(styles.portada, !b.portada && styles.portadaVacia)}>
                {b.portada && <Cover estilo={b.portada} alt="Portada del evento" />}
                <span className={styles.cambiar}><Icon name="camera" size={16} />{b.portada ? 'Cambiar portada' : 'Subir portada'} · 1080 × 1080</span>
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onload = () => up({ portada: String(r.result) });
                  r.readAsDataURL(f);
                }} />
              </label>
            </div>
          </>
        )}

        {b.paso === 2 && (
          <>
            <Input label="Dirección" multiline value={b.direccion} onChange={(e) => up({ direccion: e.target.value })} valido={b.direccion.trim().length >= 5} />
            <div className={styles.mapa} aria-label="Vista previa en el mapa">
              <img src={mapaBase} alt="" />
              {b.direccion.trim().length >= 5 && <span className={styles.pin}>{b.portada && <Cover estilo={b.portada} alt="" />}</span>}
            </div>
            <div className={styles.dos}>
              <Input label="Fecha" type="date" value={b.fecha} onChange={(e) => up({ fecha: e.target.value })} min="2026-01-01" />
              <Input label="Hora" type="time" value={b.hora} onChange={(e) => up({ hora: e.target.value })} step={300} />
            </div>
          </>
        )}

        {b.paso === 3 && (
          <>
            <Grupo titulo="Género">{GENEROS.map((g) => <Chip key={g} estado={b.generos.includes(g) ? 'Seleccionado' : 'Default'} onClick={() => toggle('generos', g)}>{g}</Chip>)}</Grupo>
            <Grupo titulo="Formato de acto">{FORMATOS.map((f) => <Chip key={f} estado={b.formato === f ? 'Seleccionado' : 'Default'} onClick={() => up({ formato: f })}>{f}</Chip>)}</Grupo>
            <Grupo titulo="Tipo de venue">{VENUES.map((v) => <Chip key={v} estado={b.venueTipo === v ? 'Seleccionado' : 'Default'} onClick={() => up({ venueTipo: v })}>{v}</Chip>)}</Grupo>
            <div className={styles.dos}>
              <Input label="Precio desde (COP)" inputMode="numeric" value={b.precioDesde ? pesos(Number(b.precioDesde)) : ''} placeholder="$0" onChange={(e) => up({ precioDesde: e.target.value.replace(/\D/g, '').slice(0, 7) })} valido={Boolean(b.precioDesde)} />
              <Input label="Precio hasta (COP)" inputMode="numeric" value={b.precioHasta ? pesos(Number(b.precioHasta)) : ''} placeholder="$0" onChange={(e) => up({ precioHasta: e.target.value.replace(/\D/g, '').slice(0, 7) })}
                valido={Boolean(b.precioHasta) && Number(b.precioHasta) >= Number(b.precioDesde || 0)}
                error={b.precioHasta && Number(b.precioHasta) < Number(b.precioDesde || 0) ? 'Debe ser mayor o igual al precio desde.' : null} />
            </div>
            <div className={o.campo}>
              <span className={o.label}>Clasificación de edad</span>
              <Edad valor={b.edad} onChange={(edad) => up({ edad })} />
            </div>
          </>
        )}

        {b.paso === 4 && (
          <>
            <Input label="Link de venta oficial" type="url" inputMode="url" value={b.urlVenta} placeholder="https://" onChange={(e) => up({ urlVenta: e.target.value })}
              valido={validarUrl(b.urlVenta)} ayuda={validarUrl(b.urlVenta) ? 'Verificamos que el enlace abra correctamente.' : undefined}
              error={b.urlVenta && !validarUrl(b.urlVenta) ? 'Escribe un enlace completo que empiece por https://' : null} />
            <Etiqueta texto="Permisos" tip={tip === 'pmu'} onTip={() => setTip(tip === 'pmu' ? null : 'pmu')}
              ayuda="Sube el PMU o el permiso de la Alcaldía Local si el evento supera 300 personas o es al aire libre.">
              <label className={styles.pmu}>
                <span className={cx(styles.pmuIcono, b.pmu && styles.pmuOk)}><Icon name={b.pmu ? 'check' : 'upload'} size={20} /></span>
                <span className={styles.pmuTexto}><strong>Permiso de la Alcaldía (PMU)</strong><span>{b.pmu ? `${b.pmu} · Subido` : 'Toca para subir PDF o foto (opcional)'}</span></span>
                <input type="file" accept="application/pdf,image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) up({ pmu: `${f.name} · ${Math.max(1, Math.round(f.size / 1000))} KB` }); }} />
              </label>
            </Etiqueta>
            <Input label="Restricciones" multiline maxLength={200} value={b.restricciones} onChange={(e) => up({ restricciones: e.target.value })}
              ayuda={`Opcional · máx. 200 caracteres${b.restricciones ? ` · ${b.restricciones.length}/200` : ''}`} />
            <p className={styles.aviso}><Icon name="clock" size={18} />Revisaremos tu evento en máximo 48 horas antes de publicarlo.</p>
          </>
        )}
      </div>
    </Screen>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return <div className={o.campo} role="group" aria-label={titulo}><span className={o.label}>{titulo}</span><div className={o.chips}>{children}</div></div>;
}

function Etiqueta({ texto, ayuda, tip, onTip, children }: { texto: string; ayuda: string; tip: boolean; onTip: () => void; children: ReactNode }) {
  return (
    <div className={cx(o.campo, styles.conTip)}>
      <span className={o.label}>{texto}<button type="button" className={styles.info} aria-label={`Más información: ${texto}`} aria-expanded={tip} onClick={onTip}><Icon name="info" size={14} /></button></span>
      {tip && <p className={styles.tooltip} role="tooltip">{ayuda}</p>}
      {children}
    </div>
  );
}

function Edad({ valor, onChange }: { valor: Borrador['edad']; onChange: (e: NonNullable<Borrador['edad']>) => void }) {
  return (
    <div role="radiogroup" aria-label="Clasificación de edad" className={styles.edad}>
      {(['Todo público', '+14', '+18'] as const).map((e) => (
        <button key={e} type="button" role="radio" aria-checked={valor === e} className={cx(valor === e && (e === '+18' ? styles.edad18 : styles.edadOn))} onClick={() => onChange(e)}>{e}</button>
      ))}
    </div>
  );
}
