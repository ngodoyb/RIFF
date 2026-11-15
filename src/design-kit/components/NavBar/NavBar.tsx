// Figma: Nav bar 2009:152 — volver (navigate(-1)) + título centrado + acción derecha.
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './NavBar.module.css';

type Props = { titulo?: string; accion?: ReactNode; onBack?: () => void; sinVolver?: boolean; className?: string };

export function NavBar({ titulo, accion, onBack, sinVolver, className }: Props) {
  const navigate = useNavigate();
  return (
    <header className={cx(styles.nav, className)}>
      {!sinVolver && (
        <button type="button" className={styles.back} aria-label="Volver" onClick={onBack ?? (() => navigate(-1))}>
          <Icon name="back" size={22} />
        </button>
      )}
      {titulo && <h1 className={styles.titulo}>{titulo}</h1>}
      <div className={styles.accion}>{accion}</div>
    </header>
  );
}
