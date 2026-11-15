// Enlaces de "Ver en Google Maps" y "Cómo llegar" (sin librería de mapas).
import type { EventItem } from '../types';

const q = (e: EventItem) => encodeURIComponent(`${e.venue}, ${e.direccion.replace(/ · /g, ', ')}, Bogotá`);

export const mapsUrl = (e: EventItem) => `https://www.google.com/maps/search/?api=1&query=${q(e)}`;
export const googleRuta = (e: EventItem) => `https://www.google.com/maps/dir/?api=1&destination=${q(e)}`;
export const appleRuta = (e: EventItem) => `https://maps.apple.com/?daddr=${q(e)}`;
export const wazeRuta = (e: EventItem) => `https://waze.com/ul?q=${q(e)}&navigate=yes`;
