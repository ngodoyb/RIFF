// Organizador (simulado). Con backend: POST /organizers, /verifications, /events; GET /events/:id/metrics.
import { ORG_EVENTOS_DEMO } from '../data/organizer';
import type { Borrador, OrgEvent } from '../state/AppState';
import type { ActFormat, EventItem, Genre, VenueType } from '../types';

export function eventosIniciales(actuales: OrgEvent[]): OrgEvent[] {
  return actuales.length ? actuales : ORG_EVENTOS_DEMO;
}

const slug = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const num = (s: string) => Number(s.replace(/\D/g, '')) || 0;

/** Convierte el borrador del formulario en un evento listo para el feed del consumidor. */
export function borradorAEvento(b: Borrador, org: string): EventItem {
  const generos = (b.generos.length ? b.generos : ['Reggaetón']) as Genre[];
  const venueTipo = (b.venueTipo ?? 'Bar') as VenueType;
  const edad = b.edad ?? '+18';
  const id = `${slug(b.nombre) || 'evento'}-${Date.now().toString(36)}`;
  let dominio = 'riff.app';
  try { dominio = new URL(b.urlVenta).hostname.replace(/^www\./, ''); } catch { /* sin URL */ }
  return {
    id,
    titulo: b.nombre.trim(),
    artista: org,
    generos,
    formato: (b.formato ?? 'DJ set') as ActFormat,
    venueTipo,
    categoria: venueTipo,
    venue: org,
    venueCorto: org,
    zona: 'Zona Rosa',
    direccion: b.direccion.trim(),
    mapa: { x: 452, y: 575 },
    distanciaKm: 2.6,
    inicio: `${b.fecha}T${b.hora || '20:00'}`,
    notaFecha: edad === 'Todo público' ? 'Todo público' : `Evento para mayores de ${edad.replace('+', '')} años`,
    notaPrecio: 'Incluye servicio · precios en COP',
    precioMin: b.precioDesde ? num(b.precioDesde) : null,
    precioMax: b.precioHasta ? num(b.precioHasta) : null,
    edad,
    descripcion: b.restricciones.trim() || `${b.nombre.trim()} en ${org}.`,
    urlVenta: b.urlVenta.trim(),
    ticketera: dominio.split('.')[0].replace(/^\w/, (c) => c.toUpperCase()),
    dominio,
    portada: (b.portada as EventItem['portada']) ?? 'bambule',
    organizadorId: slug(org),
  };
}
