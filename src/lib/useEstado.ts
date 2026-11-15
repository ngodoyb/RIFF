import { useSearchParams } from 'react-router-dom';

/** Lee ?estado=<clave> para forzar un estado de Figma en la pantalla actual. */
export function useEstado(): string | null {
  const [params] = useSearchParams();
  return params.get('estado');
}
