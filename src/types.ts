// Modelos de datos de RIFF. Los servicios (src/services) devuelven estos tipos;
// cuando exista una API, solo cambian los servicios.

export type Genre =
  | 'Electrónica' | 'Techno' | 'House' | 'Rap' | 'Hip hop' | 'Cumbia' | 'Salsa' | 'Indie' | 'Jazz' | 'Rock'
  | 'Reggaetón' | 'Urbano' | 'Trap latino' | 'Trap argentino' | 'Pop latino' | 'Clásica' | 'Metal';

export type ActFormat = 'DJ set' | 'En vivo' | 'Acústico' | 'Festival';
export type VenueType = 'Club' | 'Bar' | 'Teatro' | 'Al aire libre' | 'Estadio';
export type AgeRating = 'Todo público' | '+7' | '+12' | '+14' | '+15' | '+18';
export type CoverKey =
  | 'estilo-1' | 'estilo-2' | 'estilo-3' | 'estilo-4' | 'estilo-5' | 'estilo-6'
  | 'omar-courtz' | 'penyair' | 'el-kalvo' | 'baum-festival' | 'slipknot' | 'berliner-philharmoniker';

export type EventItem = {
  id: string;
  titulo: string;
  artista: string;
  generos: Genre[];
  formato: ActFormat;
  venueTipo: VenueType;
  /** Texto de la badge de categoría en el detalle (p. ej. "Arena", "Teatro", "Estadio"). */
  categoria: string;
  venue: string;
  /** Nombre corto que usa la card del feed (p. ej. "Teatro Gaitán"). */
  venueCorto: string;
  /** Título corto en las filas del mapa (p. ej. "Omar Courtz"). */
  tituloCorto?: string;
  zona: string;
  direccion: string;
  /** Posición del pin en el mapa base de Figma (600 × 1000 px). */
  mapa: { x: number; y: number };
  distanciaKm: number;
  inicio: string;              // ISO local, p. ej. 2026-11-12T20:00
  fin?: string;
  /** Si es true, el detalle muestra solo la fecha (sin hora). */
  sinHoraDetalle?: boolean;
  /** Línea secundaria bajo la fecha en el detalle. */
  notaFecha: string;
  /** Línea secundaria bajo el precio en el detalle. */
  notaPrecio: string;
  precioMin: number | null;    // null = sin precio publicado
  precioMax: number | null;
  precioTexto?: string;        // p. ej. "Precios en Ticketmaster"
  edad: AgeRating;
  descripcion: string;
  urlVenta: string;
  /** Nombre de la ticketera, p. ej. "Tuboleta". */
  ticketera: string;
  /** Dominio que se muestra al salir, p. ej. "tuboleta.com". */
  dominio: string;
  portada: CoverKey;
  organizadorId?: string;
  /** Datos de prueba que no vienen del Figma. */
  prueba?: boolean;
};

export type Session = { rol: 'consumidor' | 'organizador' } | null;
export type MusicProvider = 'spotify' | 'apple';

export type Budget = { min: number; max: number | null }; // max null = sin límite

export type Reminder = '1 hora antes' | '3 horas antes' | '1 día antes' | '2 días antes' | 'Sin recordatorio';

export type NotificationKind =
  | 'Según tus gustos' | 'Sorpréndeme' | 'Recordatorio'
  | 'Evento aprobado' | 'Hito alcanzado' | 'Actualiza tu evento';

export type NotificationItem = {
  id: string;
  tipo: NotificationKind;
  hace: string;
  titulo: string;
  texto: string;
  grupo: 'hoy' | 'esta semana';
  eventoId?: string;
};

export type OrganizerEventStatus = 'Publicado' | 'En revisión' | 'Rechazado';
