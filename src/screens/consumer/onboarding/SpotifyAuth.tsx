// Figma: 03 · Spotify — autorización 2061:40701 (navegador del sistema simulado, sin la marca de RIFF)
import { useNavigate } from 'react-router-dom';
import { BrandLogo, Icon, type IconName } from '../../../design-kit/components';
import styles from './SpotifyAuth.module.css';

const PERMISOS: { icon: IconName; texto: string; no?: boolean }[] = [
  { icon: 'user', texto: 'Ver los datos de tu cuenta de Spotify: nombre y foto de perfil' },
  { icon: 'music', texto: 'Ver tus artistas y canciones más escuchados' },
  { icon: 'clock', texto: 'Ver lo que has escuchado recientemente' },
  { icon: 'x', texto: 'No podrá publicar, crear ni modificar tus playlists.', no: true },
];

export function SpotifyAuth() {
  const navigate = useNavigate();
  const cancelar = () => navigate('/vincular', { replace: true });
  return (
    <div className={styles.fondo}>
      <div className={styles.navegador}>
        <header className={styles.barra}>
          <button type="button" onClick={cancelar}>Cancelar</button>
          <span className={styles.url}><Icon name="lock" size={12} />accounts.spotify.com</span>
          <span className={styles.recargar} aria-hidden="true"><Icon name="shuffle" size={20} /></span>
        </header>
        <div className={styles.cuerpo}>
          <p className={styles.marca}><BrandLogo marca="Spotify" size={32} /> Spotify</p>
          <div className={styles.logos}>
            <BrandLogo marca="riff" size={64} />
            <span className={styles.puntos} aria-hidden="true">••••</span>
            <BrandLogo marca="Spotify negro" size={64} />
          </div>
          <h1 className={styles.titulo}>RIFF quiere acceder a tu cuenta de Spotify</h1>
          <p className={styles.cuenta}><span className={styles.avatar} />laura.gomez <span className={styles.noEres}>· No eres tú?</span></p>
          <p className={styles.podra}>RIFF podrá:</p>
          <ul className={styles.permisos}>
            {PERMISOS.map((p) => (
              <li key={p.texto} className={p.no ? styles.no : undefined}><Icon name={p.icon} size={20} />{p.texto}</li>
            ))}
          </ul>
          <button type="button" className={styles.aceptar} onClick={() => navigate('/vincular/importando/spotify', { replace: true })}>Aceptar</button>
          <button type="button" className={styles.cancelar} onClick={cancelar}>Cancelar</button>
          <p className={styles.pie}>Puedes quitar este acceso cuando quieras en spotify.com/account/apps.</p>
        </div>
      </div>
    </div>
  );
}
