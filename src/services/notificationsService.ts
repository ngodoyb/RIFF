// Notificaciones (simuladas). Con backend: GET /notifications.
import { NOTIFICACIONES } from '../data/notifications';
import { pesos } from '../lib/format';
import type { Genre, NotificationItem } from '../types';
import { getEvents, sorprendeme } from './eventsService';

export function getNotificaciones(gustos: Genre[]): NotificationItem[] {
  const sorpresa = gustos.length ? sorprendeme(getEvents().filter((e) => e.precioMin !== null && !e.prueba), gustos) : undefined;
  return NOTIFICACIONES.map((n) => {
    if (n.tipo !== 'Sorpréndeme' || !sorpresa) return n;
    const genero = sorpresa.generos[0].toLowerCase();
    return {
      ...n,
      eventoId: sorpresa.id,
      texto: `¿Y si pruebas ${genero}? ${sorpresa.titulo}, ${sorpresa.venueCorto.replace(' JMSD', '')} · desde ${pesos(sorpresa.precioMin ?? 0)}`,
    };
  });
}
