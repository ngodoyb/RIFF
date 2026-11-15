// Acceso a eventos. Hoy lee src/data; para conectar un backend, cambia solo este archivo
// (por ejemplo: `return fetch('/api/events').then(r => r.json())`).
import { EVENTS } from '../data/events';
import { load } from '../state/storage';
import type { Budget, EventItem, Genre } from '../types';
import { parseLocal } from '../lib/format';
import { HOY } from '../data/demo';

type OrgEventsSnapshot = { orgEventos?: { evento: EventItem; estado: string }[] };

/** Eventos publicados por organizadores en esta demo (se guardan en localStorage). */
function publicados(): EventItem[] {
  const s = load<OrgEventsSnapshot>('state', {});
  return (s.orgEventos ?? []).filter((o) => o.estado === 'Publicado').map((o) => o.evento);
}

export function getEvents(): EventItem[] {
  const pub = publicados();
  const ids = new Set(pub.map((e) => e.id));
  return [...pub, ...EVENTS.filter((e) => !ids.has(e.id))];
}

export function getEvent(id: string): EventItem | undefined {
  return getEvents().find((e) => e.id === id);
}

export function enPresupuesto(e: EventItem, b: Budget | null): boolean | null {
  if (!b || e.precioMin === null) return null;
  const max = b.max ?? Infinity;
  return e.precioMin >= b.min && e.precioMin <= max;
}

/** Búsqueda por texto en evento, artista y venue (sin tildes ni mayúsculas). */
export function normalizar(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
export function buscar(events: EventItem[], q: string): EventItem[] {
  const t = normalizar(q.trim());
  if (!t) return events;
  return events.filter((e) => normalizar(`${e.titulo} ${e.artista} ${e.venue} ${e.venueCorto} ${e.generos.join(' ')}`).includes(t));
}

export function esEstaSemana(e: EventItem): boolean {
  const d = parseLocal(e.inicio).getTime();
  return d >= HOY.getTime() - 86_400_000 && d <= HOY.getTime() + 7 * 86_400_000;
}

/**
 * Recomendación simple y explicable: coincidencia de género con los gustos (más el peso de los
 * guardados), luego si está dentro del presupuesto y luego por cercanía.
 */
export function recomendar(events: EventItem[], gustos: Genre[], pesos: Partial<Record<Genre, number>>, b: Budget | null): EventItem[] {
  const score = (e: EventItem) => {
    const genero = e.generos.reduce((acc, g) => acc + (gustos.includes(g) ? 10 : 0) + (pesos[g] ?? 0) * 2, 0);
    const pres = enPresupuesto(e, b) ? 5 : 0;
    return genero + pres - e.distanciaKm / 10;
  };
  return [...events].sort((a, b2) => score(b2) - score(a));
}

/** "Sorpréndeme": un evento de un género que el usuario NO tiene. */
export function sorprendeme(events: EventItem[], gustos: Genre[]): EventItem | undefined {
  return events.find((e) => e.generos.every((g) => !gustos.includes(g)));
}

export type FiltrosBusqueda = { generos: Genre[]; formatos: string[]; venues: string[] };

/**
 * Filtra por texto (evento, artista, venue) y por chips: OR dentro de cada grupo, AND entre grupos.
 * Si el texto es exactamente un género, se trata como filtro de género.
 */
export function filtrar(events: EventItem[], q: string, f: FiltrosBusqueda): EventItem[] {
  const t = normalizar(q.trim());
  const esGenero = (g: string) => normalizar(g) === t;
  const generoTexto = t && events.some((e) => e.generos.some(esGenero)) ? t : '';
  const generos = f.generos.map(normalizar);
  if (generoTexto && !generos.includes(generoTexto)) generos.push(generoTexto);
  return events
    .filter((e) => (generoTexto || !t ? true : buscar([e], q).length > 0))
    .filter((e) => !generos.length || e.generos.some((g) => generos.includes(normalizar(g))))
    .filter((e) => !f.formatos.length || f.formatos.includes(e.formato))
    .filter((e) => !f.venues.length || f.venues.includes(e.venueTipo))
    .sort((a, b) => a.distanciaKm - b.distanciaKm);
}
