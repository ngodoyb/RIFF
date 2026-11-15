// Rutas de RIFF con su node-id de Figma (archivo 80vaxDw05umaX0Ped7RyCk) y sus estados.
// Cada estado se ve con ?estado=<clave>, además de aparecer cuando la lógica lo produce.
import type { ReactNode } from 'react';
import { SCREENS } from './screens';

export type Estado = { clave: string; nombre: string; nodo: string };
export type Pantalla = {
  path: string;
  /** Ruta de ejemplo para el índice (rellena los parámetros). */
  ejemplo?: string;
  nombre: string;
  nodo: string;
  flujo: 'consumidor' | 'organizador' | 'dev';
  estados?: Estado[];
  element: ReactNode;
};

export const PANTALLAS: Pantalla[] = [
  // ---------- Consumidor ----------
  { path: '/', nombre: 'Splash', nodo: '2012:92', flujo: 'consumidor', element: SCREENS.Splash,
    estados: [{ clave: 'entrada', nombre: 'Splash · entrada (0 s)', nodo: '2012:74' }] },
  { path: '/perfil-tipo', nombre: '00 · Selecciona tu perfil', nodo: '2012:118', flujo: 'consumidor', element: SCREENS.SeleccionPerfil },
  { path: '/registro', nombre: '01 · Crear cuenta', nodo: '2012:163', flujo: 'consumidor', element: SCREENS.CrearCuenta,
    estados: [
      { clave: 'error', nombre: '01 · Crear cuenta (error)', nodo: '2012:163' },
      { clave: 'valido', nombre: '01 · Crear cuenta — campos válidos', nodo: '2012:218' },
    ] },
  { path: '/login', nombre: '02 · Iniciar sesión', nodo: '2012:280', flujo: 'consumidor', element: SCREENS.IniciarSesion },
  { path: '/vincular', nombre: '03 · Vincular gustos', nodo: '2013:200', flujo: 'consumidor', element: SCREENS.VincularGustos },
  { path: '/vincular/spotify', nombre: '03 · Spotify — autorización', nodo: '2061:40701', flujo: 'consumidor', element: SCREENS.SpotifyAuth },
  { path: '/vincular/apple', nombre: '03 · Apple Music — permiso', nodo: '2061:40845', flujo: 'consumidor', element: SCREENS.ApplePermiso },
  { path: '/vincular/importando/:proveedor', ejemplo: '/vincular/importando/spotify', nombre: '03 · Importando gustos', nodo: '2061:40786', flujo: 'consumidor', element: SCREENS.Importando,
    estados: [{ clave: 'apple', nombre: '03 · Apple Music — importando gustos', nodo: '2061:40908' }] },
  { path: '/vincular/listo/:proveedor', ejemplo: '/vincular/listo/spotify', nombre: '03 · Vinculado', nodo: '2013:256', flujo: 'consumidor', element: SCREENS.Vinculado,
    estados: [{ clave: 'apple', nombre: '03 · Vinculado con Apple Music', nodo: '2061:41061' }] },
  { path: '/gustos', nombre: '03 · Vincular gustos — manual', nodo: '2013:331', flujo: 'consumidor', element: SCREENS.GustosManual },
  { path: '/presupuesto', nombre: '03 · Tu presupuesto', nodo: '2102:125', flujo: 'consumidor', element: SCREENS.Presupuesto },
  { path: '/feed', nombre: '04 · Feed principal', nodo: '2014:299', flujo: 'consumidor', element: SCREENS.Feed,
    estados: [
      { clave: 'cargando', nombre: '04 · Feed — cargando', nodo: '2014:612' },
      { clave: 'sin-conexion', nombre: '04 · Feed — sin conexión', nodo: '2014:688' },
      { clave: 'tutorial-1', nombre: '04 · Feed — tutorial 1/3', nodo: '2014:759' },
      { clave: 'tutorial-2', nombre: '04 · Feed — tutorial 2/3', nodo: '2014:813' },
      { clave: 'tutorial-3', nombre: '04 · Feed — tutorial 3/3', nodo: '2014:863' },
    ] },
  { path: '/buscar', nombre: '05 · Búsqueda y filtros', nodo: '2015:1442', flujo: 'consumidor', element: SCREENS.Buscar,
    estados: [{ clave: 'escribir', nombre: '05 · Búsqueda — escribir', nodo: '2170:3564' }] },
  { path: '/resultados', nombre: '06 · Resultados de búsqueda', nodo: '2015:1542', flujo: 'consumidor', element: SCREENS.Resultados,
    estados: [
      { clave: 'vacio', nombre: '06 · Resultados — sin resultados', nodo: '2015:1736' },
      { clave: 'cargando', nombre: '06 · Resultados — cargando', nodo: '2015:1820' },
    ] },
  { path: '/evento/:id', ejemplo: '/evento/omar-courtz', nombre: '07 · Detalle de evento', nodo: '2018:1764', flujo: 'consumidor', element: SCREENS.Detalle,
    estados: [
      { clave: 'compartir', nombre: '07 · Detalle — compartir', nodo: '2018:1866' },
      { clave: 'salida', nombre: '07 · Aviso de salida', nodo: '2018:2025' },
    ] },
  { path: '/guardado/:id', ejemplo: '/guardado/omar-courtz', nombre: '08 · Guardado y recordatorio', nodo: '2018:2140', flujo: 'consumidor', element: SCREENS.Guardado,
    estados: [{ clave: 'recordatorio', nombre: '08 · Guardado — editar recordatorio', nodo: '2018:2212' }] },
  { path: '/calendario', nombre: '09 · Calendario personal', nodo: '2019:1920', flujo: 'consumidor', element: SCREENS.Calendario,
    estados: [{ clave: 'vacio', nombre: '09 · Calendario — sin eventos', nodo: '2019:2115' }] },
  { path: '/mapa', nombre: '10 · Mapa de Bogotá', nodo: '2020:1989', flujo: 'consumidor', element: SCREENS.Mapa,
    estados: [
      { clave: 'lista', nombre: '10 · Mapa — lista (hoja media)', nodo: '2020:6244' },
      { clave: 'pin', nombre: '10 · Mapa — pin seleccionado', nodo: '2020:10552' },
      { clave: 'completa', nombre: '10 · Mapa — hoja completa', nodo: '2020:14868' },
      { clave: 'cluster', nombre: '10 · Mapa — zoom en cluster', nodo: '2021:19070' },
      { clave: 'sin-permiso', nombre: '10 · Mapa — sin permiso de ubicación', nodo: '2021:23280' },
      { clave: 'sin-eventos', nombre: '10 · Mapa — zona sin eventos', nodo: '2021:27512' },
      { clave: 'como-llegar', nombre: '10 · Mapa — cómo llegar', nodo: '2021:31674' },
    ] },
  { path: '/perfil', nombre: '11 · Perfil', nodo: '2022:35853', flujo: 'consumidor', element: SCREENS.Perfil,
    estados: [
      { clave: 'cerrar-sesion', nombre: '11 · Perfil — confirmar cierre de sesión', nodo: '2022:35965' },
    ] },
  { path: '/perfil/presupuesto', nombre: '11 · Perfil — editar presupuesto', nodo: '2141:40440', flujo: 'consumidor', element: SCREENS.EditarPresupuesto },
  { path: '/perfil/gustos', nombre: '11 · Perfil — editar gustos (usa 03 · manual)', nodo: '2013:331', flujo: 'consumidor', element: SCREENS.EditarGustos },
  { path: '/notificaciones', nombre: '12 · Notificaciones', nodo: '2022:36088', flujo: 'consumidor', element: SCREENS.Notificaciones },

  // ---------- Organizador ----------
  { path: '/org/registro', nombre: '01 · Crear cuenta (organizador)', nodo: '2023:35980', flujo: 'organizador', element: SCREENS.OrgRegistro,
    estados: [
      { clave: 'error', nombre: '01 · Crear cuenta (organizador) — error', nodo: '2023:35980' },
      { clave: 'valido', nombre: '01 · Crear cuenta (organizador) — válido', nodo: '2024:36133' },
    ] },
  { path: '/org/verificacion', nombre: '02 · Verificación de documentos', nodo: '2023:36047', flujo: 'organizador', element: SCREENS.OrgVerificacion,
    estados: [{ clave: 'rechazada', nombre: '02 · Verificación — rechazada', nodo: '2023:36114' }] },
  { path: '/org/perfil', nombre: '03 · Perfil público del organizador', nodo: '2023:36184', flujo: 'organizador', element: SCREENS.OrgPerfil },
  { path: '/org/login', nombre: '04 · Iniciar sesión (organizador)', nodo: '2023:36286', flujo: 'organizador', element: SCREENS.OrgLogin },
  { path: '/org/panel', nombre: '05 · Panel de organizador', nodo: '2024:36206', flujo: 'organizador', element: SCREENS.OrgPanel,
    estados: [{ clave: 'cancelar', nombre: '05 · Panel — confirmar cancelación', nodo: '2024:36374' }] },
  { path: '/org/nuevo', nombre: '06 · Formulario de publicación de evento', nodo: '2025:36283', flujo: 'organizador', element: SCREENS.OrgNuevo,
    estados: [
      { clave: 'paso-2', nombre: '06 · Formulario — paso 2 · fecha y lugar', nodo: '2025:36371' },
      { clave: 'paso-3', nombre: '06 · Formulario — paso 3 · clasificación', nodo: '2025:40555' },
      { clave: 'paso-4', nombre: '06 · Formulario — paso 4 · venta y permisos', nodo: '2025:40664' },
    ] },
  { path: '/org/revision', nombre: '07 · Evento en revisión', nodo: '2026:40550', flujo: 'organizador', element: SCREENS.OrgRevision },
  { path: '/org/publicado', nombre: '08 · Confirmación de publicación', nodo: '2026:40614', flujo: 'organizador', element: SCREENS.OrgPublicado },
  { path: '/org/metricas/:id', ejemplo: '/org/metricas/kaleido', nombre: '09 · Métricas del evento', nodo: '2026:40682', flujo: 'organizador', element: SCREENS.OrgMetricas },
  { path: '/org/notificaciones', nombre: '10 · Notificaciones del organizador', nodo: '2026:40788', flujo: 'organizador', element: SCREENS.OrgNotificaciones },

  // ---------- Desarrollo ----------
  { path: '/design-kit', nombre: 'Design kit', nodo: '2008:2', flujo: 'dev', element: SCREENS.DesignKit },
];
