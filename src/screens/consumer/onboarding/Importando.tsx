// Figma: 03 · Spotify — importando gustos 2061:40786 · 03 · Apple Music — importando gustos 2061:40908
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BrandLogo, Icon, Screen } from '../../../design-kit/components';
import { cx } from '../../../lib/cx';
import { useEstado } from '../../../lib/useEstado';
import { NOMBRE_PROVEEDOR, importarGustos } from '../../../services/musicLinkService';
import type { MusicProvider } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Importando.module.css';

export function Importando() {
  const params = useParams();
  const estado = useEstado();
  const proveedor: MusicProvider = estado === 'apple' || params.proveedor === 'apple' ? 'apple' : 'spotify';
  const nombre = NOMBRE_PROVEEDOR[proveedor];
  const navigate = useNavigate();
  const [paso, setPaso] = useState(2); // Figma muestra 2 de 4 completos y el 3.º en curso

  useEffect(() => {
    if (estado) return; // estado forzado: se queda como en Figma
    const t1 = setTimeout(() => setPaso(3), 1100);
    const t2 = setTimeout(() => setPaso(4), 2000);
    importarGustos(proveedor).then(() => navigate(`/vincular/listo/${proveedor}`, { replace: true }));
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [estado, proveedor, navigate]);

  const items = [`Conectado con ${nombre}`, 'Artistas más escuchados · 50', 'Géneros favoritos', 'Eventos para ti en Bogotá'];
  return (
    <Screen brillos={BRILLOS_ONBOARDING} scroll={false}>
      <div className={styles.cuerpo} aria-live="polite">
        <div className={styles.logos}>
          <BrandLogo marca={proveedor === 'spotify' ? 'Spotify negro' : 'Apple Music'} size={72} />
          <span className={styles.puntos} aria-hidden="true"><i /><i /><i className={styles.on} /><i /><i /></span>
          <BrandLogo marca="riff" size={72} />
        </div>
        <h1 className={styles.titulo}>importando tus gustos</h1>
        <p className={styles.texto}>Estamos leyendo lo que más escuchas en {nombre}. Toma unos segundos.</p>
        <div className={styles.barra} role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={paso}>
          <span style={{ width: `${(paso / 4) * 100 - (paso < 4 ? 30 : 0)}%` }} />
        </div>
        <ul className={styles.lista}>
          {items.map((t, i) => (
            <li key={t} className={cx(i >= paso && styles.pendiente)}>
              <span className={cx(styles.marca, i < paso ? styles.hecho : i === paso ? styles.cargando : styles.vacio)}>
                {i < paso && <Icon name="check" size={14} />}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
