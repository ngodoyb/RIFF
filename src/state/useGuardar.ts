// Guardar / quitar un evento con feedback inmediato (toast con "Deshacer").
import { useCallback, useEffect, useState } from 'react';
import type { EventItem } from '../types';
import { useApp } from './AppState';
import { useToast } from './ToastContext';

export function useGuardar() {
  const { guardados, toggleGuardado } = useApp();
  const toast = useToast();
  return useCallback((e: EventItem) => {
    const estaba = Boolean(guardados[e.id]);
    toggleGuardado(e.id, e.generos);
    toast({
      tipo: estaba ? 'Quitado' : 'Guardado',
      onAccion: () => toggleGuardado(e.id, e.generos),
    });
  }, [guardados, toggleGuardado, toast]);
}

/** Estado de conexión (navigator.onLine) que se actualiza con los eventos online/offline. */
export function useOnline(): [boolean, () => void] {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  return [online, () => setOnline(navigator.onLine)];
}
