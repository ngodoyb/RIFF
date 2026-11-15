// Registro de pantallas. Cada una vive en screens/consumer, screens/organizer o screens/dev.
import type { ReactNode } from 'react';
import { EnConstruccion } from './EnConstruccion';
import { DesignKit } from './dev/DesignKit';
import { Resultados } from './consumer/feed/Resultados';
import { Buscar } from './consumer/feed/Buscar';
import { Feed } from './consumer/feed/Feed';
import { Presupuesto } from './consumer/onboarding/Presupuesto';
import { GustosManual } from './consumer/onboarding/GustosManual';
import { Vinculado } from './consumer/onboarding/Vinculado';
import { Importando } from './consumer/onboarding/Importando';
import { ApplePermiso } from './consumer/onboarding/ApplePermiso';
import { SpotifyAuth } from './consumer/onboarding/SpotifyAuth';
import { VincularGustos } from './consumer/onboarding/VincularGustos';
import { IniciarSesion } from './consumer/onboarding/IniciarSesion';
import { CrearCuenta } from './consumer/onboarding/CrearCuenta';
import { SeleccionPerfil } from './consumer/onboarding/SeleccionPerfil';
import { Splash } from './consumer/onboarding/Splash';

export const SCREENS: Record<string, ReactNode> = {
  Splash: <Splash />,
  SeleccionPerfil: <SeleccionPerfil />,
  CrearCuenta: <CrearCuenta />,
  IniciarSesion: <IniciarSesion />,
  VincularGustos: <VincularGustos />,
  SpotifyAuth: <SpotifyAuth />,
  ApplePermiso: <ApplePermiso />,
  Importando: <Importando />,
  Vinculado: <Vinculado />,
  GustosManual: <GustosManual />,
  Presupuesto: <Presupuesto />,
  Feed: <Feed />,
  Buscar: <Buscar />,
  Resultados: <Resultados />,
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
