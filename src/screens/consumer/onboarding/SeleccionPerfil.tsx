// Figma: 00 · Selecciona tu perfil 2012:118
import { Link } from 'react-router-dom';
import { Icon, Logo, Screen } from '../../../design-kit/components';
import { BRILLOS_ONBOARDING } from '../../brillos';
import o from './Onboarding.module.css';
import styles from './SeleccionPerfil.module.css';

export function SeleccionPerfil() {
  return (
    <Screen brillos={BRILLOS_ONBOARDING}>
      <div className={o.cuerpo}>
        <Logo size={34.56} className={styles.logo} />
        <h1 className={styles.titulo}>¿cómo quieres usar riff?</h1>
        <p className={styles.texto}>Elige tu perfil para mostrarte lo que necesitas. Cero fomo, siempre al tanto.</p>
        <Link to="/registro" className={`${styles.opcion} ${styles.destacada}`}>
          <span className={`${styles.icono} ${styles.rosa}`}><Icon name="compass" size={28} /></span>
          <span className={styles.textos}>
            <strong>Quiero descubrir eventos</strong>
            <span>Recomendaciones de música en vivo según tus gustos y tu presupuesto.</span>
          </span>
          <Icon name="chev" size={20} />
        </Link>
        <Link to="/org/registro" className={styles.opcion}>
          <span className={`${styles.icono} ${styles.morado}`}><Icon name="mic" size={28} /></span>
          <span className={styles.textos}>
            <strong>Soy organizador, venue o artista</strong>
            <span>Publica tus eventos, verifica tu cuenta y mide su alcance.</span>
          </span>
          <Icon name="chev" size={20} />
        </Link>
        <p className={`${o.legal} ${styles.legal}`}>Al continuar aceptas los Términos y la Política de tratamiento de datos.</p>
      </div>
    </Screen>
  );
}
