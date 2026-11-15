import { NavBar, Screen } from '../design-kit/components';

/** Marcador mientras una pantalla se construye (solo durante el desarrollo por fases). */
export function EnConstruccion({ nombre }: { nombre: string }) {
  return (
    <Screen>
      <NavBar titulo={nombre} />
      <p className="t-small c-secondary" style={{ padding: 16 }}>Pantalla en construcción.</p>
    </Screen>
  );
}
