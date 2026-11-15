// Figma: Search bar 2009:146
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './SearchBar.module.css';

type Props = InputHTMLAttributes<HTMLInputElement> & { foco?: boolean; onClear?: () => void };

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  { className, foco, onClear, placeholder = 'Buscar eventos, artistas, venues', value, ...rest }, ref,
) {
  return (
    <div className={cx(styles.bar, foco && styles.foco, className)}>
      <Icon name="search" size={20} className={styles.ic} />
      <input ref={ref} type="search" className={styles.input} placeholder={placeholder} aria-label={placeholder} value={value} {...rest} />
      {onClear && value ? (
        <button type="button" className={styles.clear} onClick={onClear} aria-label="Borrar búsqueda">
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
});
