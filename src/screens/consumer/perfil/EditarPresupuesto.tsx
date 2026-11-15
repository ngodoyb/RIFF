// Figma: 11 · Perfil — editar presupuesto 2141:40440 (cambia el feed y las badges de presupuesto)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BudgetSelector, Button, NavBar, Screen } from '../../../design-kit/components';
import { useApp } from '../../../state/AppState';
import type { Budget } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from '../onboarding/Onboarding.module.css';
import styles from '../onboarding/Presupuesto.module.css';

export function EditarPresupuesto() {
  const { presupuesto, set } = useApp();
  const navigate = useNavigate();
  const [valor, setValor] = useState<Budget>(presupuesto ?? { min: 50_000, max: 150_000 });
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <div className={o.cuerpo}>
        <h1 className={o.titulo}>tu presupuesto</h1>
        <p className={o.texto}>Ajusta cuánto quieres gastar por evento. Lo usamos para marcar qué eventos están dentro de tu rango.</p>
        <BudgetSelector value={valor} onChange={setValor} className={styles.selector} />
        <p className={styles.nota}>Te mostraremos si cada evento está dentro o fuera de tu presupuesto.</p>
      </div>
      <div className={o.acciones}>
        <Button onClick={() => { set('presupuesto', valor); navigate(-1); }}>Guardar cambios</Button>
        <button type="button" className={o.ghostLink} onClick={() => navigate(-1)}>Cancelar</button>
      </div>
    </Screen>
  );
}
