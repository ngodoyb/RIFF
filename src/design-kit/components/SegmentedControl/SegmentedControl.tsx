// Figma: Segmented control 2010:193 (Seleccionado=Venue 2010:145 · Artista 2010:161 · Organizador 2010:177)
import { cx } from '../../../lib/cx';
import { Icon, type IconName } from '../Icon';
import styles from './SegmentedControl.module.css';

export type TipoCuenta = 'Venue' | 'Artista' | 'Organizador';
const OPC: { v: TipoCuenta; icon: IconName }[] = [
  { v: 'Venue', icon: 'store' }, { v: 'Artista', icon: 'mic' }, { v: 'Organizador', icon: 'users' },
];

export function SegmentedControl({ seleccionado, onChange, label = 'Tipo de cuenta', className }: { seleccionado: TipoCuenta | null; onChange?: (v: TipoCuenta) => void; label?: string; className?: string }) {
  return (
    <div role="radiogroup" aria-label={label} className={cx(styles.seg, className)}>
      {OPC.map((o) => {
        const on = o.v === seleccionado;
        return (
          <button key={o.v} type="button" role="radio" aria-checked={on} className={cx(styles.opt, on && styles.on)} onClick={() => onChange?.(o.v)}>
            <Icon name={o.icon} size={16} />
            {o.v}
          </button>
        );
      })}
    </div>
  );
}
