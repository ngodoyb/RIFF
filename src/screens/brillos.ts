// Brillos del fondo tal como se ubican en Figma (elipses "brillo" con desenfoque).
import type { Brillo } from '../design-kit/components';

/** 00 · Selecciona tu perfil, 01 · Crear cuenta, 02 · Iniciar sesión, 03 · … (2012:119–121). */
export const BRILLOS_ONBOARDING: Brillo[] = [
  { x: -140, y: -160, size: 380, color: 'morado', opacity: 0.6, blur: 110 },
  { x: 200, y: 520, size: 340, color: 'coral', opacity: 0.35, blur: 110 },
  { x: 120, y: 260, size: 220, color: 'secundario', opacity: 0.25, blur: 110 },
];

/** Splash (2012:93–95): morado, rosa y coral concéntricos. */
export const BRILLOS_SPLASH: Brillo[] = [
  { x: 17, y: 236, size: 340, color: 'morado', opacity: 0.75, blur: 90 },
  { x: 57, y: 296, size: 260, color: 'rosa', opacity: 0.35, blur: 80 },
  { x: 97, y: 336, size: 180, color: 'coral', opacity: 0.3, blur: 60 },
];

/** Pantallas con tab bar (fondo (brillos) 2092:35439). */
export const BRILLOS_APP: Brillo[] = [
  { x: -120, y: -140, size: 360, color: 'morado', opacity: 0.45, blur: 120 },
  { x: 220, y: 480, size: 320, color: 'coral', opacity: 0.25, blur: 120 },
];
