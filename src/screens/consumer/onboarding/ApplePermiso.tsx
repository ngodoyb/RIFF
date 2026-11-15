// Figma: 03 · Apple Music — permiso 2061:40845 (diálogo del sistema sobre 03 · Vincular gustos)
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../../design-kit/components';
import { VincularGustos } from './VincularGustos';
import styles from './ApplePermiso.module.css';

export function ApplePermiso() {
  const navigate = useNavigate();
  return (
    <VincularGustos
      overlay={
        <div className={styles.capa}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="apple-titulo" className={styles.alerta}>
            <BrandLogo marca="Apple Music" size={44} />
            <h2 id="apple-titulo">“RIFF” quiere acceder a Apple Music, a tu actividad musical y a tu biblioteca multimedia.</h2>
            <p>RIFF usa tu historial de Apple Music para recomendarte conciertos en Bogotá.</p>
            <div className={styles.botones}>
              <button type="button" onClick={() => navigate('/vincular', { replace: true })}>No permitir</button>
              <button type="button" className={styles.permitir} onClick={() => navigate('/vincular/importando/apple', { replace: true })}>Permitir</button>
            </div>
          </div>
        </div>
      }
    />
  );
}
