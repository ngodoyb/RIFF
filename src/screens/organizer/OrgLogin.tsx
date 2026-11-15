// Figma: 04 · Iniciar sesión (organizador) 2023:36286
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, NavBar, Screen } from '../../design-kit/components';
import { validarContacto } from '../../lib/validation';
import { useApp } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import o from './Org.module.css';

export function OrgLogin() {
  const navigate = useNavigate();
  const app = useApp();
  const [contacto, setContacto] = useState(app.org.contacto);
  const [foco, setFoco] = useState(false);
  const v = validarContacto(contacto, foco);
  const entrar = () => {
    if (!app.org.contacto) app.set('org', { ...app.org, contacto: contacto.trim(), nombre: app.org.nombre || 'Bambulé' });
    app.set('session', { rol: 'organizador' });
    navigate('/org/panel', { replace: true });
  };
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <form className={o.cuerpo} onSubmit={(e) => { e.preventDefault(); if (v.valido) entrar(); }} noValidate>
        <h1 className={o.titulo}>hola de nuevo</h1>
        <p className={o.texto} style={{ marginTop: 10 }}>Entra a tu panel para publicar y medir tus eventos.</p>
        <div className={o.form}>
          <Input
            label="Correo o número de celular"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            onFocus={() => setFoco(true)}
            onBlur={() => setFoco(false)}
            valido={v.valido}
            ayuda="Te enviaremos un código de 6 dígitos."
            autoComplete="email"
          />
        </div>
        <Button type="submit" disabled={!v.valido} style={{ marginTop: 24 }}>Iniciar sesión</Button>
        <Link to="/org/registro" className={o.link}>¿No tienes cuenta? <strong>Créala aquí</strong></Link>
      </form>
    </Screen>
  );
}
