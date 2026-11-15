// Figma: Botón/Continuar con Spotify 2060:40695 y Botón/Continuar con Apple Music 2060:40703
// Logos: Logo/Spotify (verde) 2060:40679 · (negro) 2060:40685 · Logo/Apple Music 2060:40691
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './MusicButton.module.css';

type Props = { proveedor: 'Spotify' | 'Apple Music'; onClick?: () => void; className?: string; texto?: string };

export function MusicButton({ proveedor, onClick, className, texto }: Props) {
  const spotify = proveedor === 'Spotify';
  return (
    <button type="button" onClick={onClick} className={cx(styles.btn, spotify ? styles.spotify : styles.apple, className)}>
      <Icon name={spotify ? 'spotify' : 'apple'} size={spotify ? 26 : 22} />
      {texto ?? `Continuar con ${proveedor}`}
    </button>
  );
}
