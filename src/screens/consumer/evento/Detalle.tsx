// Figma: 07 · Detalle — Omar Courtz 2018:1764 (y Penyair 2084:40397, Berliner 2084:40592, El Kalvo 2084:40787,
// Slipknot 2084:40990, BAUM 2084:41185) · compartir 2018:1866 · aviso de salida 2018:2025
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Alert, Badge, Cover, Icon, type IconName } from '../../../design-kit/components';
import { cx } from '../../../lib/cx';
import { diaCorto, fechaEvento, km, parseLocal, rangoPrecio } from '../../../lib/format';
import { useEstado } from '../../../lib/useEstado';
import { enPresupuesto, getEvent } from '../../../services/eventsService';
import { mapsUrl } from '../../../services/mapsService';
import { textoRango } from '../../../services/budgetService';
import { useApp } from '../../../state/AppState';
import { useGuardar } from '../../../state/useGuardar';
import { HojaCompartir } from './HojaCompartir';
import styles from './Detalle.module.css';

export function Detalle() {
  const { id = '' } = useParams();
  const estado = useEstado();
  const navigate = useNavigate();
  const app = useApp();
  const guardar = useGuardar();
  const evento = getEvent(id);
  const [hoja, setHoja] = useState(estado === 'compartir');
  const [salida, setSalida] = useState(estado === 'salida');
  if (!evento) return <Navigate to="/feed" replace />;

  const guardado = Boolean(app.guardados[evento.id]);
  const dentro = enPresupuesto(evento, app.presupuesto);
  const rango = app.presupuesto ? textoRango(app.presupuesto) : null;
  const fecha = evento.sinHoraDetalle ? diaCorto(parseLocal(evento.inicio), true) : fechaEvento(evento.inicio, evento.fin, Boolean(evento.fin));
  const url = `https://riff.app/e/${evento.id}`;

  const onGuardar = () => {
    if (guardado) { guardar(evento); return; }
    app.toggleGuardado(evento.id, evento.generos);
    navigate(`/guardado/${evento.id}`);
  };
  const compartir = async () => {
    if (navigator.share && estado !== 'compartir') {
      try { await navigator.share({ title: evento.titulo, url }); } catch { /* cancelado */ }
    } else setHoja(true);
  };
  const abrirVenta = () => {
    setSalida(false);
    window.open(evento.urlVenta, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.pantalla}>
      <div className={styles.scroll}>
        <div className={styles.portada}>
          <Cover estilo={evento.portada} alt={`Portada de ${evento.titulo}`} eager />
          <span className={styles.degradado} />
        </div>
        <button type="button" className={cx(styles.vidrio, styles.volver)} aria-label="Volver" onClick={() => navigate(-1)}><Icon name="back" size={20} /></button>
        <button type="button" className={cx(styles.vidrio, styles.compartirTop)} aria-label="Compartir" onClick={compartir}><Icon name="share" size={20} /></button>

        <div className={styles.contenido}>
          <h1 className={styles.titulo}>{evento.titulo.toLowerCase()}</h1>
          <div className={styles.etiquetas}>
            <Badge tipo="Género">{evento.generos[0]}</Badge>
            <Badge tipo="Venue">{evento.categoria}</Badge>
            <Badge tipo="+18">{evento.edad}</Badge>
          </div>
          <div className={styles.info}>
            <Fila icono="cal" titulo={fecha} sub={evento.notaFecha} />
            <a className={styles.fila} href={mapsUrl(evento)} target="_blank" rel="noopener noreferrer">
              <span className={styles.ic}><Icon name="pin" size={18} /></span>
              <span className={styles.textos}>
                <strong>{evento.venue}</strong>
                <span>{evento.direccion} · {km(evento.distanciaKm)} · Ver en Google Maps</span>
              </span>
            </a>
            <Fila icono="ticket" titulo={rangoPrecio(evento.precioMin, evento.precioMax, evento.precioTexto)} sub={evento.notaPrecio} />
          </div>
          {rango && (
            <div className={styles.presupuesto}>
              {dentro === null ? <span>Precio aún no publicado · Tu rango: {rango}</span> : (
                <>
                  <Badge tipo={dentro ? 'Dentro de presupuesto' : 'Fuera de presupuesto'} />
                  <span>Tu rango: {rango}</span>
                </>
              )}
            </div>
          )}
          <p className={styles.descripcion}>{evento.descripcion}</p>
          <div className={styles.acciones}>
            <button type="button" className={styles.accion} aria-pressed={guardado} onClick={onGuardar}>
              <Icon name={guardado ? 'bm-filled' : 'bm'} size={22} className={guardado ? styles.on : undefined} />Guardar
            </button>
            <button type="button" className={styles.accion} onClick={compartir}><Icon name="share" size={22} />Compartir</button>
            <Link to={`/mapa?evento=${evento.id}`} className={styles.accion}><Icon name="map" size={22} />Ver en mapa</Link>
          </div>
        </div>
      </div>

      <div className={styles.cta} data-cta>
        <button type="button" className={styles.comprar} onClick={() => setSalida(true)}>Comprar en página oficial →</button>
        <p className={styles.salida}><Icon name="external" size={14} />Saldrás de RIFF hacia {evento.dominio} (venta oficial)</p>
      </div>

      <HojaCompartir open={hoja} evento={evento} url={url} onClose={() => setHoja(false)} guardado={guardado} onGuardar={() => guardar(evento)} />
      <Alert
        open={salida}
        icono="external"
        titulo="¿Salir de RIFF?"
        confirmar="Abrir página"
        onCancelar={() => setSalida(false)}
        onConfirmar={abrirVenta}
      >
        Vas a abrir la página oficial de venta en {evento.ticketera} ({evento.dominio}). RIFF no procesa pagos ni guarda tus datos de compra.
      </Alert>
    </div>
  );
}

function Fila({ icono, titulo, sub }: { icono: IconName; titulo: string; sub: string }) {
  return (
    <div className={styles.fila}>
      <span className={styles.ic}><Icon name={icono} size={18} /></span>
      <span className={styles.textos}><strong>{titulo}</strong><span>{sub}</span></span>
    </div>
  );
}

