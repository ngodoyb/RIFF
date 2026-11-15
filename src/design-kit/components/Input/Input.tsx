// Figma: Input 2008:151 (Estado=Normal 2008:120 · Foco 2008:126 · Error 2008:133 · Válido 2008:143)
import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Icon } from '../Icon';
import styles from './Input.module.css';

export type InputEstado = 'Normal' | 'Foco' | 'Error' | 'Válido';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: string;
  /** Texto de ayuda debajo del campo (Normal, Foco y Válido). */
  ayuda?: ReactNode;
  /** Mensaje de error junto al campo. Si existe, el estado es Error. */
  error?: string | null;
  valido?: boolean;
  /** Fuerza un estado visual (catálogo /design-kit). */
  estado?: InputEstado;
  multiline?: boolean;
  trailing?: ReactNode;
};

export function Input({ label, ayuda, error, valido, estado, className, onFocus, onBlur, trailing, multiline, ...rest }: InputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const e: InputEstado = estado ?? (error ? 'Error' : focused ? 'Foco' : valido ? 'Válido' : 'Normal');
  const helpId = `${id}-help`;
  const fieldProps = {
    id,
    className: styles.control,
    'aria-invalid': e === 'Error' || undefined,
    'aria-describedby': helpId,
    onFocus: (ev: React.FocusEvent<HTMLInputElement>) => { setFocused(true); onFocus?.(ev); },
    onBlur: (ev: React.FocusEvent<HTMLInputElement>) => { setFocused(false); onBlur?.(ev); },
    ...rest,
  };
  return (
    <div className={cx(styles.input, className)}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={cx(styles.field, styles[e], multiline && styles.multiline)}>
        {multiline
          ? <textarea {...(fieldProps as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
          : <input {...fieldProps} />}
        {trailing}
        {e === 'Error' && <Icon name="alert" size={20} className={styles.alert} />}
        {e === 'Válido' && <Icon name="check" size={20} className={styles.check} />}
      </div>
      {(e === 'Error' || ayuda) && <div id={helpId} className={styles.help} aria-live="polite">
        {e === 'Error' ? (
          <>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.errorText}>{error}</span>
          </>
        ) : (
          <span>{ayuda}</span>
        )}
      </div>}
    </div>
  );
}
