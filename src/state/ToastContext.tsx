// Toast global (feedback inmediato con "Deshacer"). Se muestra sobre la tab bar.
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast, type ToastTipo } from '../design-kit/components';
import styles from './Toast.module.css';

type ToastOpts = { tipo: ToastTipo; texto?: string; accion?: string; onAccion?: () => void };
const ToastCtx = createContext<(o: ToastOpts) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<(ToastOpts & { key: number }) | null>(null);
  const timer = useRef<number>();
  const show = useCallback((o: ToastOpts) => {
    window.clearTimeout(timer.current);
    setToast({ ...o, key: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 4000);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={styles.zona} aria-live="polite">
        {toast && (
          <Toast
            key={toast.key}
            tipo={toast.tipo}
            texto={toast.texto}
            accion={toast.accion}
            className={styles.toast}
            onAccion={toast.onAccion ? () => { toast.onAccion!(); setToast(null); } : undefined}
          />
        )}
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
