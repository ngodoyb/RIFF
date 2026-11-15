// Figma: 02 · Verificación de documentos 2023:36047 · rechazada 2023:36114
// Subida real de archivo con <input type="file"> (simulada: no se envía a ningún servidor).
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, NavBar, Screen } from '../../design-kit/components';
import { cx } from '../../lib/cx';
import { useEstado } from '../../lib/useEstado';
import { useApp, type Verificacion } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import o from './Org.module.css';
import styles from './OrgVerificacion.module.css';

const DOCS = [
  { id: 'permiso', nombre: 'Permiso de funcionamiento' },
  { id: 'camara', nombre: 'Cámara de comercio' },
  { id: 'rut', nombre: 'RUT y Cámara de Comercio (venue)' },
];
const MOTIVO = 'tu cámara de comercio fue expedida hace más de 30 días. Sube una expedida en el último mes y reenvía.';

const DEMO: Record<string, Verificacion> = {
  base: { estado: 'sin-enviar', docs: { permiso: { estado: 'subido', archivo: 'licencia_funcionamiento_bambule.pdf · 1,2 MB' }, camara: { estado: 'subiendo', archivo: 'camara_comercio_bambule.pdf' } } },
  rechazada: { estado: 'rechazada', motivo: MOTIVO, docs: { permiso: { estado: 'subido', archivo: 'licencia_funcionamiento_bambule.pdf · 1,2 MB' }, camara: { estado: 'subido', archivo: 'Expedida el 12 ago 2026' } } },
};

const tamano = (b: number) => (b > 1_000_000 ? `${(b / 1_000_000).toFixed(1).replace('.', ',')} MB` : `${Math.max(1, Math.round(b / 1000))} KB`);

export function OrgVerificacion() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const v: Verificacion = estado === 'rechazada' ? DEMO.rechazada : app.verificacion;
  const [progreso, setProgreso] = useState<Record<string, number>>(estado === null ? {} : { camara: 60 });
    const rechazada = v.estado === 'rechazada';

  // Estado forzado de Figma para ver el "subiendo".
  const { set } = app;
  useEffect(() => { if (estado === 'base') set('verificacion', DEMO.base); }, [estado, set]);

  const subir = (id: string, f: File) => {
    const archivo = `${f.name} · ${tamano(f.size)}`;
    app.set('verificacion', (x) => ({ ...x, docs: { ...x.docs, [id]: { estado: 'subiendo', archivo: f.name } } }));
    let p = 0;
    const t = setInterval(() => {
      p += 20;
      setProgreso((s) => ({ ...s, [id]: p }));
      if (p >= 100) {
        clearInterval(t);
        app.set('verificacion', (x) => ({ ...x, docs: { ...x.docs, [id]: { estado: 'subido', archivo } } }));
      }
    }, 250);
  };

  const subidos = DOCS.filter((d) => v.docs[d.id]?.estado === 'subido').length;
  const listo = subidos >= 2 && !DOCS.some((d) => v.docs[d.id]?.estado === 'subiendo');
  const enviar = () => {
    app.set('verificacion', (x) => ({ ...x, estado: 'aprobada', motivo: undefined }));
    navigate('/org/perfil');
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <div className={o.cuerpo} style={{ paddingBottom: 24 }}>
        <h1 className={o.titulo}>verifica tu negocio</h1>
        {rechazada ? (
          <div className={styles.rechazo} role="alert">
            <strong><Icon name="alert" size={18} />Verificación rechazada</strong>
            <p>Motivo: {v.motivo}</p>
          </div>
        ) : (
          <p className={o.texto} style={{ marginTop: 10 }}>Sube el soporte que acredite tu negocio o identidad. Solo lo usamos para verificar tu cuenta.</p>
        )}
        <ul className={styles.docs}>
          {DOCS.map((d) => {
            const doc = v.docs[d.id];
            const malo = rechazada && d.id === 'camara';
            const pct = progreso[d.id] ?? 60;
            return (
              <li key={d.id}>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  className="sr-only"
                  id={`doc-${d.id}`}
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) subir(d.id, f); e.target.value = ''; }}
                />
                <label htmlFor={`doc-${d.id}`} className={cx(styles.doc, !doc && styles.pendiente, malo && styles.malo)}>
                  <span className={cx(styles.icono, doc?.estado === 'subido' && !malo && styles.ok, doc?.estado === 'subiendo' && styles.subiendo, malo && styles.iconoMalo)}>
                    <Icon name={malo ? 'alert' : doc?.estado === 'subido' ? 'check' : doc?.estado === 'subiendo' ? 'upload' : 'link'} size={20} />
                  </span>
                  <span className={styles.textos}>
                    <strong>{d.nombre}</strong>
                    {!doc && <span>Toca para subir PDF o foto (máx. 10 MB)</span>}
                    {doc?.estado === 'subido' && <span>{malo ? `${doc.archivo} · reemplázala` : `${doc.archivo} · Subido`}</span>}
                    {doc?.estado === 'subiendo' && (
                      <>
                        <span>{doc.archivo} · subiendo {pct} %</span>
                        <span className={styles.barra}><i style={{ width: `${pct}%` }} /></span>
                      </>
                    )}
                  </span>
                  {doc?.estado === 'subido' && <span className={cx(styles.reemplazar, malo && styles.reemplazarMalo)} aria-label="Reemplazar archivo"><Icon name="shuffle" size={20} /></span>}
                </label>
              </li>
            );
          })}
        </ul>
        <p className={o.nota} style={{ marginTop: 16 }}><Icon name="clock" size={16} />La revisión puede tardar hasta 48 horas. Te avisaremos por notificación.</p>
        {rechazada ? (
          <Button style={{ marginTop: 16 }} disabled={!listo} onClick={enviar}>Corregir y reenviar</Button>
        ) : (
          <>
            <Button style={{ marginTop: 16 }} disabled={!listo} onClick={enviar}>Enviar a revisión</Button>
            <p className={o.alertaRoja} style={{ marginTop: 16 }}><Icon name="alert" size={16} />Si tu verificación es rechazada, verás aquí el motivo exacto y podrás corregir y reenviar.</p>
          </>
        )}
      </div>
    </Screen>
  );
}
