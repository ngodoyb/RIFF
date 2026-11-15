// Validación en vivo de formularios con los mensajes del Figma (Input: Normal, Foco, Error, Válido).

export type Validacion = { valido: boolean; error: string | null; ayuda: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Correo o celular colombiano de 10 dígitos. */
export function validarContacto(v: string, foco: boolean): Validacion {
  const t = v.trim();
  const digitos = t.replace(/[\s-]/g, '');
  if (!t) return { valido: false, error: null, ayuda: foco ? 'Escribe tu correo o un celular de 10 dígitos.' : 'Te enviaremos un código para verificarlo.' };
  if (/^\+?\d+$/.test(digitos)) {
    const n = digitos.replace(/^\+?57/, '');
    if (n.length === 10) return { valido: true, error: null, ayuda: '¡Listo! Celular válido.' };
    return { valido: false, error: 'Escribe tu correo o un celular de 10 dígitos.', ayuda: '' };
  }
  if (EMAIL.test(t)) return { valido: true, error: null, ayuda: '¡Listo! Correo válido.' };
  if (t.includes('@')) {
    const [usuario, dominio] = t.split('@');
    if (!dominio || !dominio.includes('.')) return { valido: false, error: `Falta el dominio. Prueba con ${usuario || 'laura'}@correo.com`, ayuda: '' };
  }
  return { valido: false, error: 'Escribe tu correo o un celular de 10 dígitos.', ayuda: '' };
}

export function validarNombre(v: string): boolean {
  return v.trim().length >= 2;
}

export function validarUrl(v: string): boolean {
  try {
    const u = new URL(v.trim());
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}
