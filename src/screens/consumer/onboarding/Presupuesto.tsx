// Figma: 03 · Tu presupuesto 2102:125
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BudgetSelector, Button, NavBar, Screen } from '../../../design-kit/components';
import { useApp } from '../../../state/AppState';
import type { Budget } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';
import styles from './Presupuesto.module.css';

export function Presupuesto() {
  const { presupuesto, set } = useApp();
  const navigate = useNavigate();
  const [valor, setValor] = useState<Budget>(presupuesto ?? { min: 50_000, max: 150_000 });
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <div className={o.cuerpo}>
        <h1 className={o.titulo}>tu presupuesto</h1>
        <p className={o.texto}>¿Cuánto quieres gastar por evento? Puedes cambiarlo cuando quieras desde tu perfil.</p>
        <BudgetSelector value={valor} onChange={setValor} className={styles.selector} />
        <p className={styles.nota}>Te mostraremos si cada evento está dentro o fuera de tu presupuesto.</p>
      </div>
      <div className={o.acciones}>
        <Button onClick={() => { set('presupuesto', valor); navigate('/feed', { replace: true }); }}>Ir a mi feed</Button>
        <Link to="/feed" replace className={o.ghostLink}>Omitir por ahora</Link>
      </div>
    </Screen>
  );
}
