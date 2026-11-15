// Figma: 11 · Perfil 2022:35853 · confirmar cierre de sesión 2022:35965
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionSheet, Alert, Button, Icon, Input, Screen, TabBar, textoPresupuesto, type IconName } from '../../../design-kit/components';
import { useEstado } from '../../../lib/useEstado';
import { NOMBRE_PROVEEDOR } from '../../../services/musicLinkService';
import { useApp } from '../../../state/AppState';
import { BRILLOS_ONBOARDING } from '../../brillos';
import styles from './Perfil.module.css';

export function Perfil() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const [salir, setSalir] = useState(estado === 'cerrar-sesion');
  const [cuentas, setCuentas] = useState(false);
  const [ayuda, setAyuda] = useState(false);
  const [editar, setEditar] = useState(false);
  const [borrador, setBorrador] = useState(app.perfil);

  const nombre = `${app.perfil.nombre || 'Laura'} ${app.perfil.apellido || 'Gómez'}`.trim();
  const iniciales = nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  const gustos = app.gustos.length ? `${app.gustos.slice(0, 3).join(', ')}${app.gustos.length > 3 ? ` +${app.gustos.length - 3}` : ''}` : 'Sin definir';
  const presupuesto = app.presupuesto ? `${textoPresupuesto(app.presupuesto)} por evento` : 'Sin definir';
  const cuenta = app.musica ? `${NOMBRE_PROVEEDOR[app.musica]} vinculado` : 'Ninguna cuenta vinculada';

  const filas: { icono: IconName; titulo: string; sub: string; onClick?: () => void; to?: string }[] = [
    { icono: 'music', titulo: 'Mis gustos musicales', sub: gustos, to: '/perfil/gustos' },
    { icono: 'wallet', titulo: 'Presupuesto', sub: presupuesto, to: '/perfil/presupuesto' },
    { icono: 'link', titulo: 'Cuentas vinculadas', sub: cuenta, onClick: () => setCuentas(true) },
    { icono: 'help', titulo: 'Ayuda', sub: 'Centro de ayuda y tutorial de bienvenida', onClick: () => setAyuda(true) },
  ];

  const opcionesCuenta = app.musica
    ? [`Desvincular ${NOMBRE_PROVEEDOR[app.musica]}`]
    : ['Vincular Spotify', 'Vincular Apple Music'];

  return (
    <Screen brillos={BRILLOS_ONBOARDING} conTabBar overlay={<TabBar activa="Perfil" />}>
      <h1 className={styles.titulo}>mi perfil</h1>
      <div className={styles.usuario}>
        <span className={styles.avatar} aria-hidden="true">{iniciales}</span>
        <div className={styles.datos}>
          <strong>{nombre}</strong>
          <span>{app.perfil.contacto || 'laura@correo.com'}</span>
        </div>
        <button type="button" className={styles.editar} aria-label="Editar perfil" onClick={() => { setBorrador(app.perfil); setEditar(true); }}><Icon name="pencil" size={20} /></button>
      </div>
      <ul className={styles.lista}>
        {filas.map((f) => {
          const contenido = (
            <>
              <span className={styles.icono}><Icon name={f.icono} size={20} /></span>
              <span className={styles.textos}><strong>{f.titulo}</strong><span>{f.sub}</span></span>
              <Icon name="chev" size={20} />
            </>
          );
          return (
            <li key={f.titulo}>
              {f.to ? <Link to={f.to} className={styles.fila}>{contenido}</Link> : <button type="button" className={styles.fila} onClick={f.onClick}>{contenido}</button>}
            </li>
          );
        })}
      </ul>
      <button type="button" className={styles.salir} onClick={() => setSalir(true)}><Icon name="logout" size={20} />Cerrar sesión</button>
      <p className={styles.pie}>RIFF v1.0 · Hecho en Bogotá</p>

      <Alert
        open={salir}
        peligro
        titulo="¿Cerrar sesión?"
        confirmar="Cerrar sesión"
        onCancelar={() => setSalir(false)}
        onConfirmar={() => { app.cerrarSesion(); navigate('/perfil-tipo', { replace: true }); }}
      >
        Tus eventos guardados y recordatorios seguirán aquí cuando vuelvas a entrar.
      </Alert>
      <ActionSheet
        open={cuentas}
        primario
        titulo="Cuentas vinculadas"
        opciones={opcionesCuenta}
        onSelect={(o) => {
          setCuentas(false);
          if (o.startsWith('Desvincular')) app.set('musica', null);
          else navigate(o === 'Vincular Spotify' ? '/vincular/spotify' : '/vincular/apple');
        }}
        onClose={() => setCuentas(false)}
      />
      <ActionSheet
        open={ayuda}
        primario
        titulo="Ayuda"
        opciones={['Ver tutorial de bienvenida', 'Reiniciar demo']}
        onSelect={(o) => {
          setAyuda(false);
          if (o === 'Reiniciar demo') { app.reiniciarDemo(); navigate('/', { replace: true }); }
          else { app.set('tutorialVisto', false); navigate('/feed'); }
        }}
        onClose={() => setAyuda(false)}
      />
      {editar && (
        <div className={styles.capa} onClick={() => setEditar(false)}>
          <form className={styles.hoja} role="dialog" aria-modal="true" aria-label="Editar perfil" onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => { e.preventDefault(); app.set('perfil', borrador); setEditar(false); }}>
            <Input label="Nombre" value={borrador.nombre} onChange={(e) => setBorrador({ ...borrador, nombre: e.target.value })} autoFocus />
            <Input label="Apellido" value={borrador.apellido} onChange={(e) => setBorrador({ ...borrador, apellido: e.target.value })} />
            <Input label="Correo o número de celular" value={borrador.contacto} onChange={(e) => setBorrador({ ...borrador, contacto: e.target.value })} />
            <Button type="submit" disabled={!borrador.nombre.trim()}>Guardar cambios</Button>
            <Button tipo="Ghost" onClick={() => setEditar(false)}>Cancelar</Button>
          </form>
        </div>
      )}
    </Screen>
  );
}
