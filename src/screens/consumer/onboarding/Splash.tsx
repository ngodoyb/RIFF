// Figma: Splash 2012:92 (entrada 2012:74). Pasa sola a 00 · Selecciona tu perfil (prototipo: after delay).
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, Screen } from '../../../design-kit/components';
import { useEstado } from '../../../lib/useEstado';
import { useApp } from '../../../state/AppState';
import { BRILLOS_SPLASH } from '../../brillos';
import styles from './Splash.module.css';

export function Splash() {
  const navigate = useNavigate();
  const { session } = useApp();
  const entrada = useEstado() === 'entrada';
  const destino = session?.rol === 'consumidor' ? '/feed' : session?.rol === 'organizador' ? '/org/panel' : '/perfil-tipo';

  useEffect(() => {
    if (entrada) return;
    const t = setTimeout(() => navigate(destino, { replace: true }), 1800);
    return () => clearTimeout(t);
  }, [entrada, destino, navigate]);

  return (
    <Screen brillos={entrada ? BRILLOS_SPLASH.map((b) => ({ ...b, opacity: (b.opacity ?? 0.5) * 0.4 })) : BRILLOS_SPLASH} scroll={false}>
      <button type="button" className={styles.splash} onClick={() => navigate(destino, { replace: true })} aria-label="Entrar a riff">
        <Logo size={96} className={entrada ? styles.logoEntrada : styles.logo} />
        <span className={entrada ? styles.lemaEntrada : styles.lema}>todo en un mismo lugar.</span>
      </button>
    </Screen>
  );
}
