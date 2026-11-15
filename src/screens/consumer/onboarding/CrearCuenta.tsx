// Figma: 01 · Crear cuenta 2012:163 (error) · 01 · Crear cuenta — campos válidos 2012:218
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, NavBar, Screen } from '../../../design-kit/components';
import { useEstado } from '../../../lib/useEstado';
import { validarContacto, validarNombre } from '../../../lib/validation';
import { useApp } from '../../../state/AppState';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';

const DEMO = {
  error: { nombre: 'Laura', apellido: 'Gómez', contacto: 'laura@correo' },
  valido: { nombre: 'Laura', apellido: 'Gómez', contacto: 'laura@correo.com' },
} as const;

export function CrearCuenta() {
  const estado = useEstado();
  const demo = estado === 'error' || estado === 'valido' ? DEMO[estado] : null;
  const navigate = useNavigate();
  const { set } = useApp();
  const [nombre, setNombre] = useState<string>(demo?.nombre ?? '');
  const [apellido, setApellido] = useState<string>(demo?.apellido ?? '');
  const [contacto, setContacto] = useState<string>(demo?.contacto ?? '');
  const [foco, setFoco] = useState(false);
  const [tocado, setTocado] = useState(Boolean(demo));

  const v = validarContacto(contacto, foco);
  const mostrarError = (tocado || contacto.includes('@')) && !foco ? v.error : estado === 'error' ? v.error : null;
  const listo = validarNombre(nombre) && validarNombre(apellido) && v.valido;

  const crear = () => {
    set('perfil', { nombre: nombre.trim(), apellido: apellido.trim(), contacto: contacto.trim() });
    navigate('/login', { state: { creada: true } });
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <form className={o.cuerpo} onSubmit={(e) => { e.preventDefault(); if (listo) crear(); }} noValidate>
        <h1 className={o.titulo}>crea tu cuenta</h1>
        <p className={o.texto}>Así guardamos tus eventos y te recordamos antes de que empiecen.</p>
        <div className={o.form}>
          <Input label="Nombre" autoComplete="given-name" value={nombre} onChange={(e) => setNombre(e.target.value)} valido={validarNombre(nombre)} />
          <Input label="Apellido" autoComplete="family-name" value={apellido} onChange={(e) => setApellido(e.target.value)} valido={validarNombre(apellido)} />
          <Input
            label="Correo o número de celular"
            placeholder="Ej.: laura@correo.com"
            autoComplete="email"
            inputMode="email"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            onFocus={() => setFoco(true)}
            onBlur={() => { setFoco(false); setTocado(true); }}
            error={mostrarError}
            valido={v.valido}
            ayuda={v.ayuda}
          />
        </div>
        <Button type="submit" disabled={!listo} style={{ marginTop: 8 }}>Crear cuenta</Button>
        <Link to="/login" className={o.link}>¿Ya tienes cuenta? <strong>Inicia sesión</strong></Link>
      </form>
    </Screen>
  );
}
