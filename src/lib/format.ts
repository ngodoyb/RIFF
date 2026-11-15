// Formatos de fecha y precio en español de Colombia, como en Figma:
// "jue 12 nov · 8:00 p. m." y "$189.000 – $577.000".

const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const MESES_LARGOS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const cop = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

export function parseLocal(iso: string): Date {
  const [d, t = '00:00'] = iso.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm] = t.split(':').map(Number);
  return new Date(y, m - 1, day, hh, mm);
}

export function hora(date: Date): string {
  const h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, '0');
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}

export function diaCorto(date: Date, conAnio = false): string {
  return `${DIAS[date.getDay()]} ${date.getDate()} ${MESES[date.getMonth()]}${conAnio ? ` ${date.getFullYear()}` : ''}`;
}

/** "vie 16 oct · 10:00 p. m." */
export function fechaEvento(inicio: string, fin?: string, conAnio = false): string {
  const a = parseLocal(inicio);
  if (fin) {
    const b = parseLocal(fin);
    return `${DIAS[a.getDay()]} ${a.getDate()} – ${diaCorto(b, conAnio)}`;
  }
  return `${diaCorto(a, conAnio)} · ${hora(a)}`;
}

export function pesos(n: number): string {
  return `$${cop.format(n)}`;
}

export function rangoPrecio(min: number | null, max: number | null, texto?: string): string {
  if (texto) return texto;
  if (min === null) return '—';
  if (min === 0 && (max === null || max === 0)) return 'Gratis';
  if (max === null || max === min) return pesos(min);
  return `${pesos(min)} – ${pesos(max)}`;
}

export function desde(min: number | null, texto?: string): string {
  if (min === null) return texto ?? '—';
  if (min === 0) return 'Gratis';
  return `desde ${pesos(min)}`;
}

export function km(n: number): string {
  return `a ${n.toLocaleString('es-CO', { maximumFractionDigits: 1 })} km`;
}
