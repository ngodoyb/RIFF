// Notificaciones tal como aparecen en Figma (12 · Notificaciones 2022:36088 y
// 10 · Notificaciones del organizador 2026:40788). "Sorpréndeme" se recalcula según los gustos.
import type { NotificationItem } from '../types';

export const NOTIFICACIONES: NotificationItem[] = [
  { id: 'n1', grupo: 'hoy', tipo: 'Según tus gustos', hace: 'hace 2 h', titulo: 'Nuevo concierto de trap latino', texto: 'Omar Courtz abrió segunda fecha en el Movistar Arena: jue 12 nov. Encaja con tus gustos.', eventoId: 'omar-courtz' },
  { id: 'n2', grupo: 'hoy', tipo: 'Sorpréndeme', hace: 'hace 5 h', titulo: 'Sorpréndeme: algo distinto', texto: '¿Y si pruebas clásica? Berliner Philharmoniker, Teatro Mayor · desde $44.300', eventoId: 'berliner-philharmoniker' },
  { id: 'n3', grupo: 'hoy', tipo: 'Recordatorio', hace: 'ayer', titulo: 'Tu evento es este sábado', texto: 'El Kalvo · sáb 17 oct · 8:00 p. m. · Teatro Gaitán', eventoId: 'el-kalvo' },
  { id: 'n4', grupo: 'esta semana', tipo: 'Según tus gustos', hace: 'lun', titulo: 'Penyair abrió segunda fecha', texto: 'Teatro Gaitán · dom 29 nov. Rap, como te gusta.', eventoId: 'penyair' },
];
