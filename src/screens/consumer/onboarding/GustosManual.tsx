// Figma: 03 · Vincular gustos — manual 2013:331
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Chip, NavBar, Screen } from '../../../design-kit/components';
import { GENEROS_MANUALES } from '../../../data/genres';
import { useApp } from '../../../state/AppState';
import type { Genre } from '../../../types';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';

export function GustosManual({ desdePerfil = false }: { desdePerfil?: boolean }) {
  const { gustos, set } = useApp();
  const navigate = useNavigate();
  const [sel, setSel] = useState<Genre[]>(gustos);
  const toggle = (g: Genre) => setSel((a) => (a.includes(g) ? a.filter((x) => x !== g) : [...a, g]));
  const continuar = () => { set('gustos', sel); navigate(desdePerfil ? '/perfil' : '/presupuesto'); };
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <div className={o.cuerpo}>
        <h1 className={o.titulo}>tus gustos</h1>
        <p className={o.texto}>Elige al menos un género. Puedes cambiarlos cuando quieras.</p>
        <div className={o.chips} style={{ marginTop: 12 }} role="group" aria-label="Géneros">
          {GENEROS_MANUALES.map((g) => <Chip key={g} estado={sel.includes(g) ? 'Seleccionado' : 'Default'} onClick={() => toggle(g)}>{g}</Chip>)}
        </div>
      </div>
      <div className={o.acciones}>
        <Button disabled={sel.length === 0} onClick={continuar}>Continuar</Button>
        {!desdePerfil && <Link to="/presupuesto" className={o.ghostLink}>Omitir por ahora</Link>}
      </div>
    </Screen>
  );
}
