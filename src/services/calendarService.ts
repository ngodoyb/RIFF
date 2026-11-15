// Exporta un evento a .ics para "Añadir a Calendario".
import { parseLocal } from '../lib/format';
import type { EventItem } from '../types';

const f = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;

export function descargarIcs(e: EventItem): void {
  const ini = parseLocal(e.inicio);
  const fin = e.fin ? parseLocal(e.fin) : new Date(ini.getTime() + 3 * 3600_000);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//RIFF//ES', 'BEGIN:VEVENT',
    `UID:${e.id}@riff.app`, `DTSTART;TZID=America/Bogota:${f(ini)}`, `DTEND;TZID=America/Bogota:${f(fin)}`,
    `SUMMARY:${e.titulo}`, `LOCATION:${e.venue}, ${e.direccion}`, `URL:${e.urlVenta}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `${e.id}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
