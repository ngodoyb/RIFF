// Figma: 03 · Vincular gustos — vinculado con Spotify 2013:256 · con Apple Music 2061:41061
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BrandLogo, Button, Chip, Icon, NavBar, Screen } from '../../../design-kit/components';
import { cx } from '../../../lib/cx';
import { useEstado } from '../../../lib/useEstado';
import { NOMBRE_PROVEEDOR, resultadoDe } from '../../../services/musicLinkService';
import { useApp } from '../../../state/AppState';
import type { Genre, MusicProvider } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';
import styles from './Vinculado.module.css';

export function Vinculado() {
  const params = useParams();
  const estado = useEstado();
  const proveedor: MusicProvider = estado === 'apple' || params.proveedor === 'apple' ? 'apple' : 'spotify';
  const r = resultadoDe(proveedor);
  const navigate = useNavigate();
  const { set } = useApp();
  const [activos, setActivos] = useState<Genre[]>(r.generos);
  const todos = [...r.generos, ...r.sugeridos];
  const toggle = (g: Genre) => setActivos((a) => (a.includes(g) ? a.filter((x) => x !== g) : [...a, g]));

  const continuar = () => {
    set('musica', proveedor);
    set('gustos', activos);
    set('artistas', r.artistas.map((a) => a.nombre));
    navigate('/presupuesto');
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar onBack={() => navigate('/vincular', { replace: true })} />
      <div className={o.cuerpo}>
        <h1 className={styles.titulo}>¡listo, ya te conocemos!</h1>
        <div className={cx(styles.cuenta, proveedor === 'spotify' ? styles.verde : styles.roja)}>
          <BrandLogo marca={proveedor === 'spotify' ? 'Spotify negro' : 'Apple Music'} size={40} />
          <div className={styles.cuentaTexto}>
            <strong>{NOMBRE_PROVEEDOR[proveedor]} vinculado</strong>
            <span>{r.cuenta} · {r.plan}</span>
          </div>
          <span className={styles.ok}><Icon name="check" size={16} /></span>
        </div>
        <p className={styles.seccion}><Icon name="music" size={16} className={styles.musica} />Tus artistas más escuchados</p>
        <ul className={styles.artistas}>
          {r.artistas.map((a) => (
            <li key={a.nombre}>
              {a.foto ? <img src={a.foto} alt="" width={60} height={60} className={styles.avatar} /> : <span className={styles.avatar}>{a.iniciales}</span>}
              <span className={styles.nombre}>{a.nombre}</span>
            </li>
          ))}
        </ul>
        <p className={styles.seccion}>Géneros detectados · toca para quitar</p>
        <div className={o.chips}>
          {todos.map((g) => <Chip key={g} estado={activos.includes(g) ? 'Seleccionado' : 'Default'} onClick={() => toggle(g)}>{g}</Chip>)}
        </div>
      </div>
      <div className={o.acciones}>
        <Button disabled={activos.length === 0} onClick={continuar}>Continuar</Button>
      </div>
    </Screen>
  );
}
