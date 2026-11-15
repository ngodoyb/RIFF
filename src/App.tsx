import { Navigate, Route, Routes } from 'react-router-dom';
import { PANTALLAS } from './routes';
import { DevPantallas } from './screens/dev/DevPantallas';

export function App() {
  return (
    <Routes>
      {PANTALLAS.map((p) => <Route key={p.path} path={p.path} element={p.element} />)}
      {import.meta.env.DEV && <Route path="/dev/pantallas" element={<DevPantallas />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
