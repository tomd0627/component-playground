import { createContext } from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';

export interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
