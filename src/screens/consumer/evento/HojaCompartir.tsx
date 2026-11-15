// Figma: 07 · Detalle — compartir 2018:1866 (hoja de compartir cuando navigator.share no existe)
import { Cover, Icon, type IconName } from '../../../design-kit/components';
import { descargarIcs } from '../../../services/calendarService';
import { useToast } from '../../../state/ToastContext';
import type { EventItem } from '../../../types';
import styles from './HojaCompartir.module.css';

type Props = { open: boolean; evento: EventItem; url: string; guardado: boolean; onGuardar: () => void; onClose: () => void };

export function HojaCompartir({ open, evento, url, guardado, onGuardar, onClose }: Props) {
  const toast = useToast();
  if (!open) return null;
  const texto = encodeURIComponent(`${evento.titulo} ${url}`);
  const apps: { nombre: string; icono: IconName; color: string; href: string }[] = [
    { nombre: 'Mensajes', icono: 'chat', color: '#34c759', href: `sms:?&body=${texto}` },
    { nombre: 'WhatsApp', icono: 'chat', color: '#25d366', href: `https://wa.me/?text=${texto}` },
    { nombre: 'Correo', icono: 'mail', color: '#3b82f6', href: `mailto:?subject=${encodeURIComponent(evento.titulo)}&body=${texto}` },
    { nombre: 'Instagram', icono: 'share', color: '#c13584', href: 'https://www.instagram.com/' },
  ];
  const copiar = async () => {
    try { await navigator.clipboard.writeText(url); toast({ tipo: 'Guardado', texto: 'Enlace copiado' }); } catch { /* sin portapapeles */ }
    onClose();
  };
  return (
    <div className={styles.capa} onClick={onClose}>
      <div className={styles.hoja} role="dialog" aria-modal="true" aria-label="Compartir" onClick={(e) => e.stopPropagation()}>
        <div className={styles.cabecera}>
          <span className={styles.mini}><Cover estilo={evento.portada} alt="" /></span>
          <div className={styles.cabTexto}><strong>{evento.titulo}</strong><span>{url.replace('https://', '')}</span></div>
          <button type="button" className={styles.cerrar} aria-label="Cerrar" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <ul className={styles.apps}>
          {apps.map((a) => (
            <li key={a.nombre}>
              <a href={a.href} target="_blank" rel="noopener noreferrer" className={styles.app} onClick={onClose}>
                <span style={{ background: a.color }}><Icon name={a.icono} size={26} /></span>
                {a.nombre}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.lista}>
          <button type="button" onClick={copiar}>Copiar enlace<Icon name="copy" size={20} /></button>
          <button type="button" onClick={() => { descargarIcs(evento); onClose(); }}>Añadir a Calendario<Icon name="cal" size={20} /></button>
          <button type="button" onClick={() => { if (!guardado) onGuardar(); onClose(); }}>Guardar en RIFF<Icon name="bm" size={20} /></button>
        </div>
      </div>
    </div>
  );
}
