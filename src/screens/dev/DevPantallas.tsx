// Índice de desarrollo: todas las pantallas y estados con su node-id de Figma. No sale en producción.
import { Link } from 'react-router-dom';
import { PANTALLAS } from '../../routes';
import styles from './DevPantallas.module.css';

export function DevPantallas() {
  const grupos = ['consumidor', 'organizador', 'dev'] as const;
  return (
    <div className={styles.page}>
      <h1 className="t-h2">pantallas</h1>
      <p className="t-caption c-secondary">Figma 80vaxDw05umaX0Ped7RyCk · {PANTALLAS.length} rutas</p>
      {grupos.map((g) => (
        <section key={g}>
          <h2 className="t-h4">{g}</h2>
          <ul>
            {PANTALLAS.filter((p) => p.flujo === g).map((p) => {
              const base = p.ejemplo ?? p.path;
              return (
                <li key={p.path}>
                  <Link to={base}>{p.nombre}</Link> <code>{p.nodo}</code>
                  {p.estados?.map((e) => (
                    <div key={e.clave} className={styles.estado}>
                      ↳ <Link to={`${base}?estado=${e.clave}`}>{e.nombre}</Link> <code>{e.nodo}</code>
                    </div>
                  ))}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
