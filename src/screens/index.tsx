// Registro de pantallas. Cada una vive en screens/consumer, screens/organizer o screens/dev.
import type { ReactNode } from 'react';
import { EnConstruccion } from './EnConstruccion';
import { DesignKit } from './dev/DesignKit';

export const SCREENS: Record<string, ReactNode> = {
  Splash: <EnConstruccion nombre="Splash" />,
  SeleccionPerfil: <EnConstruccion nombre="SeleccionPerfil" />,
  CrearCuenta: <EnConstruccion nombre="CrearCuenta" />,
  IniciarSesion: <EnConstruccion nombre="IniciarSesion" />,
  VincularGustos: <EnConstruccion nombre="VincularGustos" />,
  SpotifyAuth: <EnConstruccion nombre="SpotifyAuth" />,
  ApplePermiso: <EnConstruccion nombre="ApplePermiso" />,
  Importando: <EnConstruccion nombre="Importando" />,
  Vinculado: <EnConstruccion nombre="Vinculado" />,
  GustosManual: <EnConstruccion nombre="GustosManual" />,
  Presupuesto: <EnConstruccion nombre="Presupuesto" />,
  Feed: <EnConstruccion nombre="Feed" />,
  Buscar: <EnConstruccion nombre="Buscar" />,
  Resultados: <EnConstruccion nombre="Resultados" />,
  Detalle: <EnConstruccion nombre="Detalle" />,
  Guardado: <EnConstruccion nombre="Guardado" />,
  Calendario: <EnConstruccion nombre="Calendario" />,
  Mapa: <EnConstruccion nombre="Mapa" />,
  Perfil: <EnConstruccion nombre="Perfil" />,
  EditarPresupuesto: <EnConstruccion nombre="EditarPresupuesto" />,
  Notificaciones: <EnConstruccion nombre="Notificaciones" />,
  OrgRegistro: <EnConstruccion nombre="OrgRegistro" />,
  OrgVerificacion: <EnConstruccion nombre="OrgVerificacion" />,
  OrgPerfil: <EnConstruccion nombre="OrgPerfil" />,
  OrgLogin: <EnConstruccion nombre="OrgLogin" />,
  OrgPanel: <EnConstruccion nombre="OrgPanel" />,
  OrgNuevo: <EnConstruccion nombre="OrgNuevo" />,
  OrgRevision: <EnConstruccion nombre="OrgRevision" />,
  OrgPublicado: <EnConstruccion nombre="OrgPublicado" />,
  OrgMetricas: <EnConstruccion nombre="OrgMetricas" />,
  OrgNotificaciones: <EnConstruccion nombre="OrgNotificaciones" />,
  DesignKit: <DesignKit />,
};
