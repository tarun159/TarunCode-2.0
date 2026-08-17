import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismissToast(id), 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  const typeStyles: Record<ToastType, string> = {
    success: 'bg-green-500/20 border-green-500/50 text-green-300',
    error: 'bg-red-500/20 border-red-500/50 text-red-300',
    info: 'bg-primary-500/20 border-primary-500/50 text-primary-300',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
  };

  const typeIcons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          className={cn(
            'pointer-events-auto glass px-4 py-3 rounded-xl border shadow-glow flex items-center gap-3 min-w-[280px] max-w-md',
            typeStyles[toast.type]
          )}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <span className="flex-shrink-0">{typeIcons[toast.type]}</span>
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="ml-auto flex-shrink-0 text-current/60 hover:text-current transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}