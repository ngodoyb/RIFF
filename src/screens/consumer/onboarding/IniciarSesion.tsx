// Figma: 02 · Iniciar sesión 2012:280
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon, Input, NavBar, Screen } from '../../../design-kit/components';
import { validarContacto } from '../../../lib/validation';
import { useApp } from '../../../state/AppState';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';
import styles from './IniciarSesion.module.css';

export function IniciarSesion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { perfil, set } = useApp();
  const creada = Boolean((location.state as { creada?: boolean } | null)?.creada);
  const [contacto, setContacto] = useState(perfil.contacto);
  const [foco, setFoco] = useState(false);
  const [tocado, setTocado] = useState(false);
  const v = validarContacto(contacto, foco);
  const ayuda = v.valido && contacto === perfil.contacto && perfil.contacto ? 'Usaremos el que registraste.' : v.ayuda;

  const entrar = () => {
    set('session', { rol: 'consumidor' });
    if (!perfil.contacto) set('perfil', { ...perfil, contacto: contacto.trim() });
    navigate('/vincular');
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <form className={o.cuerpo} onSubmit={(e) => { e.preventDefault(); if (v.valido) entrar(); }} noValidate>
        {creada && (
          <div className={styles.aviso} role="status">
            <span className={styles.avisoIcono}><Icon name="check" size={16} /></span>
            <p>¡Cuenta creada! Inicia sesión para vincular tus gustos.</p>
          </div>
        )}
        <h1 className={o.titulo} style={creada ? { marginTop: 22 } : undefined}>hola de nuevo</h1>
        <p className={o.texto}>Te enviaremos un código de 6 dígitos para entrar sin contraseña.</p>
        <div className={o.form}>
          <Input
            label="Correo o número de celular"
            placeholder="Ej.: laura@correo.com"
            autoComplete="email"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            onFocus={() => setFoco(true)}
            onBlur={() => { setFoco(false); setTocado(true); }}
            error={tocado && !foco ? v.error : null}
            valido={v.valido}
            ayuda={ayuda}
          />
        </div>
        <Button type="submit" disabled={!v.valido} style={{ marginTop: 24 }}>Iniciar sesión</Button>
        <Link to="/registro" className={o.link}>¿No tienes cuenta? <strong>Créala aquí</strong></Link>
      </form>
    </Screen>
  );
}
