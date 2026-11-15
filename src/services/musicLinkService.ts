// Vinculación con Spotify / Apple Music (SIMULADA).
// TODO integración real:
//  - Spotify: OAuth PKCE con scopes user-top-read y user-read-recently-played; luego
//    GET /v1/me/top/artists y derivar géneros.
//  - Apple Music: MusicKit JS (authorize()) y /v1/me/history/heavy-rotation.
import type { Genre, MusicProvider } from '../types';

export type ArtistaTop = { nombre: string; iniciales?: string; foto?: string };
export type ResultadoImportacion = {
  cuenta: string;
  plan: string;
  artistas: ArtistaTop[];
  generos: Genre[];
  /** Géneros detectados que el usuario puede activar (aparecen sin seleccionar). */
  sugeridos: Genre[];
};

const fotos = import.meta.glob('../assets/artistas/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const foto = (n: string) => fotos[`../assets/artistas/${n}.jpg`];

// Datos tal como aparecen en Figma (03 · Vincular gustos — vinculado con Spotify / Apple Music).
const RESULTADOS: Record<MusicProvider, ResultadoImportacion> = {
  spotify: {
    cuenta: 'laura.gomez',
    plan: 'Premium',
    artistas: [
      { nombre: 'Bomba Estéreo', iniciales: 'BE' },
      { nombre: 'Monsieur Periné', iniciales: 'MP' },
      { nombre: 'Peggy Gou', iniciales: 'PG' },
      { nombre: 'Systema Solar', iniciales: 'SS' },
      { nombre: 'Fred again..', iniciales: 'FA' },
    ],
    generos: ['Electrónica', 'Cumbia', 'Indie', 'House'],
    sugeridos: ['Jazz'],
  },
  apple: {
    cuenta: 'Laura Gómez',
    plan: 'Apple ID',
    artistas: [
      { nombre: 'Álvaro Díaz', foto: foto('alvaro-diaz') },
      { nombre: 'C.R.O', foto: foto('cro') },
      { nombre: 'KHEA', foto: foto('khea') },
      { nombre: 'Duki', foto: foto('duki') },
      { nombre: 'Feid', foto: foto('feid') },
    ],
    generos: ['Trap latino', 'Reggaetón', 'Urbano', 'Trap argentino'],
    sugeridos: ['Pop latino'],
  },
};

/** Simula la autorización y la importación; resuelve después de `ms`. */
export function importarGustos(p: MusicProvider, ms = 2600): Promise<ResultadoImportacion> {
  return new Promise((res) => setTimeout(() => res(RESULTADOS[p]), ms));
}

export function resultadoDe(p: MusicProvider): ResultadoImportacion {
  return RESULTADOS[p];
}

export const NOMBRE_PROVEEDOR: Record<MusicProvider, string> = { spotify: 'Spotify', apple: 'Apple Music' };
