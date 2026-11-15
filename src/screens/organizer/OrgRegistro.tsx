// Figma: 01 · Crear cuenta (organizador) 2023:35980 · válido 2024:36133
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, NavBar, Screen, SegmentedControl, type TipoCuenta } from '../../design-kit/components';
import { useEstado } from '../../lib/useEstado';
import { validarContacto, validarNombre } from '../../lib/validation';
import { useApp } from '../../state/AppState';
import { BRILLOS_ONBOARDING } from '../brillos';
import o from './Org.module.css';

export function OrgRegistro() {
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const demo = estado === 'error' ? 'bambulebta@correo' : estado === 'valido' ? 'bambulebta@correo.com' : null;
  const [nombre, setNombre] = useState(demo ? 'Bambulé' : app.org.nombre);
  const [contacto, setContacto] = useState(demo ?? app.org.contacto);
  const [tipo, setTipo] = useState<TipoCuenta | null>(demo ? 'Venue' : app.org.tipo);
  const [foco, setFoco] = useState(estado === 'error');
  const [tocado, setTocado] = useState(false);
  const v = validarContacto(contacto, foco);
  const listo = validarNombre(nombre) && v.valido && tipo !== null;
  const ayuda = foco && !v.valido ? 'Escribe un correo o un celular de 10 dígitos.' : v.ayuda;

  const crear = () => {
    app.set('org', { ...app.org, nombre: nombre.trim(), contacto: contacto.trim(), tipo });
    app.set('session', { rol: 'organizador' });
    navigate('/org/verificacion');
  };

  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <NavBar />
      <form className={o.cuerpo} onSubmit={(e) => { e.preventDefault(); if (listo) crear(); }} noValidate>
        <h1 className={o.titulo}>crea tu cuenta de organizador</h1>
        <p className={o.texto} style={{ marginTop: 10 }}>Publica tus eventos y llega a quien ya busca tu música.</p>
        <div className={o.form}>
          <Input label="Nombre del organizador, venue o artista" value={nombre} onChange={(e) => setNombre(e.target.value)} valido={validarNombre(nombre)} />
          <Input
            label="Correo o número de celular"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            onFocus={() => setFoco(true)}
            onBlur={() => { setFoco(false); setTocado(true); }}
            error={tocado && !foco ? v.error : null}
            valido={v.valido}
            ayuda={ayuda}
            autoComplete="email"
          />
          <div className={o.campo}>
            <span className={o.label} id="tipo-cuenta">Tipo de cuenta</span>
            <SegmentedControl seleccionado={tipo} onChange={setTipo} />
          </div>
        </div>
        <Button type="submit" disabled={!listo} style={{ marginTop: 16 }}>Crear cuenta de organizador</Button>
        <Link to="/org/login" className={o.link}>¿Ya tienes cuenta? <strong>Inicia sesión</strong></Link>
      </form>
    </Screen>
  );
}
