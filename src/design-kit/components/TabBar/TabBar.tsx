// Figma: Tab bar 2009:259 (Activa=Feed 2009:159 · Mapa 2009:184 · Calendario 2009:209 · Perfil 2009:234)
import { Link } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './TabBar.module.css';

export type TabActiva = 'Feed' | 'Mapa' | 'Calendario' | 'Perfil';
const TABS: { name: TabActiva; icon: IconName; to: string }[] = [
  { name: 'Feed', icon: 'home', to: '/feed' },
  { name: 'Mapa', icon: 'map', to: '/mapa' },
  { name: 'Calendario', icon: 'cal', to: '/calendario' },
  { name: 'Perfil', icon: 'user', to: '/perfil' },
];

export function TabBar({ activa, className }: { activa: TabActiva; className?: string }) {
  return (
    <nav className={cx(styles.bar, className)} aria-label="Principal">
      <ul className={styles.tabs}>
        {TABS.map((t) => {
          const on = t.name === activa;
          return (
            <li key={t.name}>
              <Link to={t.to} replace className={cx(styles.tab, on && styles.on)} aria-current={on ? 'page' : undefined}>
                {on && <span className={styles.indicador} aria-hidden="true" />}
                <Icon name={t.icon} size={24} />
                <span>{t.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
