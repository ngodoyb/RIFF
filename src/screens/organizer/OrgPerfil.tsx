// Figma: 03 · Perfil público del organizador 2023:36184
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from '../../design-kit/components';
import portada from '../../assets/organizador/bambule-portada.jpg';
import avatar from '../../assets/organizador/bambule-avatar.jpg';
import f1 from '../../assets/organizador/bambule-1.jpg';
import f2 from '../../assets/organizador/bambule-2.jpg';
import f3 from '../../assets/organizador/bambule-3.jpg';
import { ORG_DEMO } from '../../data/organizer';
import { useApp } from '../../state/AppState';
import styles from './OrgPerfil.module.css';

export function OrgPerfil() {
  const navigate = useNavigate();
  const app = useApp();
  const inicial = { ...ORG_DEMO, ...Object.fromEntries(Object.entries(app.org).filter(([, v]) => v)) };
  const [p, setP] = useState(inicial);
  const [fotos, setFotos] = useState<string[]>([f1, f2, f3]);
  const [cover, setCover] = useState(portada);
  const listo = p.descripcion.trim().length > 0 && p.ubicacion.trim().length > 0;
  const leer = (file: File, cb: (url: string) => void) => cb(URL.createObjectURL(file));

  return (
    <div className={styles.pantalla}>
      <div className={styles.scroll}>
        <div className={styles.portada}>
          <img src={cover} alt={`Portada de ${p.nombre}`} />
          <button type="button" className={styles.volver} aria-label="Volver" onClick={() => navigate(-1)}><Icon name="back" size={20} /></button>
          <label className={styles.camara} aria-label="Cambiar portada">
            <Icon name="camera" size={20} />
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) leer(f, setCover); }} />
          </label>
        </div>
        <div className={styles.cabecera}>
          <img src={avatar} alt="" className={styles.avatar} width={72} height={72} />
          <span className={styles.verificado}><Icon name="check" size={14} />Verificado</span>
        </div>
        <div className={styles.cuerpo}>
          <h1 className={styles.nombre}>{p.nombre.toLowerCase()}</h1>
          <p className={styles.tipo}>{p.zona}</p>
          <Input label="Descripción del venue o artista" multiline value={p.descripcion} onChange={(e) => setP({ ...p, descripcion: e.target.value })} valido={p.descripcion.trim().length > 0} />
          <Input label="Ubicación" value={p.ubicacion} onChange={(e) => setP({ ...p, ubicacion: e.target.value })} valido={p.ubicacion.trim().length > 0} />
          <div className={styles.galeria}>
            <span className={styles.label}>Fotos (galería)</span>
            <div className={styles.fotos}>
              {fotos.map((f, i) => <img key={i} src={f} alt={`Foto ${i + 1} de ${p.nombre}`} />)}
              <label className={styles.agregar} aria-label="Agregar foto">
                <Icon name="plus" size={24} />
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) leer(f, (u) => setFotos((x) => [...x, u])); }} />
              </label>
            </div>
          </div>
          <Input label="Redes sociales" value={p.redes} onChange={(e) => setP({ ...p, redes: e.target.value })} valido={p.redes.trim().length > 1} />
          <Button disabled={!listo} onClick={() => { app.set('org', p); navigate('/org/panel', { replace: true }); }}>Guardar y continuar</Button>
        </div>
      </div>
    </div>
  );
}
