// Recordatorios de eventos guardados (simulados: no se envían notificaciones reales).
// TODO backend: programar el push/correo en el servidor al guardar o cambiar el recordatorio.
import { diaCorto, hora, parseLocal } from '../lib/format';
import type { EventItem, Reminder } from '../types';

export const RECORDATORIOS: Reminder[] = ['1 hora antes', '3 horas antes', '1 día antes', '2 días antes', 'Sin recordatorio'];
const HORAS: Record<Reminder, number> = { '1 hora antes': 1, '3 horas antes': 3, '1 día antes': 24, '2 días antes': 48, 'Sin recordatorio': 0 };

/** Fecha en que sonará el recordatorio, p. ej. "mié 11 nov · 8:00 p. m.". */
export function fechaRecordatorio(e: EventItem, r: Reminder): string | null {
  if (r === 'Sin recordatorio') return null;
  const d = new Date(parseLocal(e.inicio).getTime() - HORAS[r] * 3600_000);
  return `${diaCorto(d)} · ${hora(d)}`;
}
