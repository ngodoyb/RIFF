// Figma: 03 · Vincular gustos 2013:200 (también es el fondo de 03 · Apple Music — permiso 2061:40845)
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo, Button, Icon, MusicButton, NavBar, Screen } from '../../../design-kit/components';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';
import styles from './VincularGustos.module.css';

const BARRAS = [[24, 80, 40], [46, 50, 70], [68, 20, 100], [90, 56, 64], [112, 32, 88], [134, 68, 52], [156, 10, 110], [178, 40, 80], [200, 62, 58], [222, 24, 96], [244, 76, 44], [266, 48, 72], [288, 20, 100], [310, 68, 52]];

export function VincularGustos({ overlay }: { overlay?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <Screen brillos={BRILLOS_ONBOARDING} overlay={overlay}>
      <NavBar accion={<Link to="/presupuesto" className={o.omitir}>Omitir</Link>} />
      <div className={o.cuerpo}>
        <div className={styles.contenido}>
          <div className={styles.ilustracion} aria-hidden="true">
            {BARRAS.map(([x, y, h]) => <span key={x} className={styles.barra} style={{ left: x, top: y, height: h }} />)}
            <BrandLogo marca="Spotify" size={56} className={styles.spotify} />
            <BrandLogo marca="Apple Music" size={56} className={styles.apple} />
          </div>
          <h1 className={styles.titulo}>vincula tu música</h1>
          <p className={o.texto} style={{ marginTop: 0 }}>Conecta Spotify o Apple Music y te recomendamos conciertos de los artistas y géneros que más escuchas.</p>
          <p className={styles.privacidad}><Icon name="lock" size={16} />Solo leemos tus artistas y géneros más escuchados. Nunca publicamos nada.</p>
        </div>
        <div className={styles.botones}>
          <MusicButton proveedor="Spotify" onClick={() => navigate('/vincular/spotify')} />
          <MusicButton proveedor="Apple Music" onClick={() => navigate('/vincular/apple')} />
          <div className={styles.separador}><span />o<span /></div>
          <Button tipo="Secundario" to="/gustos">Prefiero definirlos manualmente</Button>
          <p className={o.legal}>Es opcional: puedes hacerlo después desde tu perfil.</p>
        </div>
      </div>
    </Screen>
  );
}
