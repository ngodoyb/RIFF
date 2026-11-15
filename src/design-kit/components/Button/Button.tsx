// Figma: Button 2008:118 (Tipo=Primario 2008:106 · Secundario 2008:108 · Ghost 2008:110 · Deshabilitado 2008:112 · Peligro 2008:114 · Acento 2008:116)
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../../lib/cx';
import styles from './Button.module.css';

export type ButtonTipo = 'Primario' | 'Secundario' | 'Ghost' | 'Deshabilitado' | 'Peligro' | 'Acento';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  tipo?: ButtonTipo;
  /** Si se pasa, se dibuja como enlace de react-router. */
  to?: string;
  type?: 'button' | 'submit';
  children: ReactNode;
};

export function Button({ tipo = 'Primario', to, disabled, className, children, type = 'button', ...rest }: ButtonProps) {
  const t = disabled ? 'Deshabilitado' : tipo;
  const cls = cx(styles.button, styles[t], className);
  if (to && !disabled) {
    return <Link to={to} className={cls}>{children}</Link>;
  }
  return (
    <button type={type} className={cls} disabled={disabled || tipo === 'Deshabilitado'} {...rest}>
      {children}
    </button>
  );
}
