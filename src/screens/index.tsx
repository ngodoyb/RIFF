// Registro de pantallas. Cada una vive en screens/consumer, screens/organizer o screens/dev.
import type { ReactNode } from 'react';
import { DesignKit } from './dev/DesignKit';
import { OrgNotificaciones } from './organizer/OrgNotificaciones';
import { OrgMetricas } from './organizer/OrgMetricas';
import { OrgPublicado } from './organizer/OrgPublicado';
import { OrgRevision } from './organizer/OrgRevision';
import { OrgNuevo } from './organizer/OrgNuevo';
import { OrgPanel } from './organizer/OrgPanel';
import { OrgLogin } from './organizer/OrgLogin';
import { OrgPerfil } from './organizer/OrgPerfil';
import { OrgVerificacion } from './organizer/OrgVerificacion';
import { OrgRegistro } from './organizer/OrgRegistro';
import { Notificaciones } from './consumer/perfil/Notificaciones';
import { EditarPresupuesto } from './consumer/perfil/EditarPresupuesto';
import { Perfil } from './consumer/perfil/Perfil';
import { Mapa } from './consumer/mapa/Mapa';
import { Calendario } from './consumer/evento/Calendario';
import { Guardado } from './consumer/evento/Guardado';
import { Detalle } from './consumer/evento/Detalle';
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
  EditarGustos: <GustosManual desdePerfil />,
  Presupuesto: <Presupuesto />,
  Feed: <Feed />,
  Buscar: <Buscar />,
  Resultados: <Resultados />,
  Detalle: <Detalle />,
  Guardado: <Guardado />,
  Calendario: <Calendario />,
  Mapa: <Mapa />,
  Perfil: <Perfil />,
  EditarPresupuesto: <EditarPresupuesto />,
  Notificaciones: <Notificaciones />,
  OrgRegistro: <OrgRegistro />,
  OrgVerificacion: <OrgVerificacion />,
  OrgPerfil: <OrgPerfil />,
  OrgLogin: <OrgLogin />,
  OrgPanel: <OrgPanel />,
  OrgNuevo: <OrgNuevo />,
  OrgRevision: <OrgRevision />,
  OrgPublicado: <OrgPublicado />,
  OrgMetricas: <OrgMetricas />,
  OrgNotificaciones: <OrgNotificaciones />,
  DesignKit: <DesignKit />,
};
