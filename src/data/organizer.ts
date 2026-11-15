// Datos del organizador de ejemplo del Figma (Bambulé) y sus eventos (05 · Panel 2024:36206,
// 09 · Métricas 2026:40682, 10 · Notificaciones del organizador 2026:40788).
import type { EventItem, NotificationItem } from '../types';
import type { OrgEvent, OrgPerfil } from '../state/AppState';

export const ORG_DEMO: OrgPerfil = {
  nombre: 'Bambulé',
  contacto: 'bambulebta@correo.com',
  tipo: 'Venue',
  zona: 'Bar y discoteca · Zona Rosa, Bogotá',
  descripcion: 'Bar de rumba en la Zona Rosa: reggaetón, pop latino y crossover. Jue 6 p. m. – 2 a. m. · vie a dom 8 p. m. – 2 a. m.',
  ubicacion: 'Cra. 13 # 83-47, El Retiro · Chapinero',
  redes: '@bambulebta',
};

const base = (id: string, titulo: string, inicio: string, extra: Partial<EventItem> = {}): EventItem => ({
  id, titulo, artista: 'Bambulé', generos: ['Reggaetón', 'Urbano'], formato: 'DJ set', venueTipo: 'Bar', categoria: 'Bar',
  venue: 'Bambulé', venueCorto: 'Bambulé', zona: 'Zona Rosa', direccion: 'Cra. 13 # 83-47, El Retiro · Chapinero',
  mapa: { x: 452, y: 575 }, distanciaKm: 2.6, inicio,
  notaFecha: 'Evento para mayores de 18 años', notaPrecio: 'Cover consumible · precios en COP',
  precioMin: 40_000, precioMax: 60_000, edad: '+18',
  descripcion: 'Solo mayores de 18 años. Ingreso con cédula. Cover consumible.',
  urlVenta: 'https://tikipal.com.co/bogota/bambule', ticketera: 'Tikipal', dominio: 'tikipal.com.co',
  portada: 'bambule', organizadorId: 'bambule', ...extra,
});

/** Eventos del panel de Bambulé con sus estados y métricas de 7 días. */
export const ORG_EVENTOS_DEMO: OrgEvent[] = [
  { evento: base('bambule-viernes-reggaeton', 'Bambulé · Viernes de Reggaetón', '2026-10-16T20:00'), estado: 'Publicado', vistas: 128, guardados: 34, clics: 9 },
  { evento: base('bambule-perreo-halloween', 'Bambulé · Perreo de Halloween', '2026-10-31T21:00', { precioMin: null, precioMax: null }), estado: 'En revisión', vistas: 0, guardados: 0, clics: 0 },
  { evento: base('bambule-old-school', 'Bambulé · Old School Reggaetón', '2026-11-07T21:00'), estado: 'Rechazado', vistas: 0, guardados: 0, clics: 0, motivo: 'Falta el permiso de la Alcaldía (PMU)' },
];

/** Serie de 7 días de 09 · Métricas (4–10 oct): vistas y guardados. */
export const SERIE_METRICAS = {
  dias: [4, 5, 6, 7, 8, 9, 10],
  vistas: [6, 13, 19, 16, 31, 25, 17],
  guardados: [1, 2, 4, 3, 10, 7, 5],
};

export const ORG_NOTIFICACIONES: NotificationItem[] = [
  { id: 'o1', grupo: 'hoy', tipo: 'Evento aprobado', hace: 'hace 1 h', titulo: 'Tu evento fue aprobado', texto: 'Viernes de Reggaetón ya está en el feed, el mapa y los filtros.', eventoId: 'bambule-viernes-reggaeton' },
  { id: 'o2', grupo: 'hoy', tipo: 'Hito alcanzado', hace: 'hace 3 h', titulo: '¡30 guardados!', texto: 'Viernes de Reggaetón llegó a 30 guardados. Vas muy bien.', eventoId: 'bambule-viernes-reggaeton' },
  { id: 'o3', grupo: 'hoy', tipo: 'Actualiza tu evento', hace: 'ayer', titulo: 'Revisa los datos de tu evento', texto: 'Faltan 2 días para Viernes de Reggaetón. Confirma hora y link de venta.', eventoId: 'bambule-viernes-reggaeton' },
];
