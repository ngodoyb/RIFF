// Figma: Logo/Spotify (verde) 2060:40679 · Logo/Spotify (negro) 2060:40685 · Logo/Apple Music 2060:40691 ·
// tile del logo riff (03 · Spotify — autorización / importando).
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './BrandLogo.module.css';

type Props = { marca: 'Spotify' | 'Spotify negro' | 'Apple Music' | 'riff'; size?: number; className?: string };

export function BrandLogo({ marca, size = 48, className }: Props) {
  if (marca === 'riff') {
    return <span className={cx(styles.logo, styles.riff, className)} style={{ width: size, height: size, fontSize: size * 0.36 }} role="img" aria-label="riff"><span className={styles.riffText}>riff</span></span>;
  }
  const spotify = marca !== 'Apple Music';
  return (
    <span
      className={cx(styles.logo, marca === 'Spotify' && styles.spotify, marca === 'Spotify negro' && styles.spotifyNegro, !spotify && styles.apple, className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={spotify ? 'Spotify' : 'Apple Music'}
    >
      <Icon name={spotify ? 'spotify' : 'apple'} size={Math.round(size * (spotify ? 0.62 : 0.5))} />
    </span>
  );
}
