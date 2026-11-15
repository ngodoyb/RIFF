// Géneros, formatos y tipos de venue tal como aparecen en Figma.
import type { Genre } from '../types';

/** 03 · Vincular gustos — manual (2013:331), en el mismo orden. */
export const GENEROS_MANUALES: Genre[] = [
  'Trap latino', 'Reggaetón', 'Urbano', 'Trap argentino', 'Rap', 'Hip hop',
  'Pop latino', 'Electrónica', 'Salsa', 'Rock', 'Cumbia', 'Indie',
];

/** 05 · Búsqueda y filtros (2015:1442). */
export const FILTRO_GENEROS: Genre[] = ['Electrónica', 'Rap', 'House', 'Cumbia', 'Salsa', 'Indie', 'Jazz', 'Rock'];
export const FILTRO_FORMATOS = ['DJ set', 'En vivo', 'Acústico', 'Festival'] as const;
export const FILTRO_VENUES = ['Club', 'Bar', 'Teatro', 'Al aire libre', 'Estadio'] as const;

/** Búsquedas recientes de ejemplo del Figma (se reemplazan por las del usuario). */
export const RECIENTES_DEMO = ['Techno en Chapinero', 'Video Club', 'Jazz'];
