import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToasterProps {
  toasts?: Toast[];
}

export function Toaster({ toasts = [] }: ToasterProps) {
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      setActiveToasts(prev => [...prev, ...toasts]);
    }
  }, [toasts]);

  const removeToast = (id: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-error-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary-500" />;
    }
  };

  const getToastStyles = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-200 dark:bg-success-900/20 dark:border-success-800';
      case 'error':
        return 'bg-error-50 border-error-200 dark:bg-error-900/20 dark:border-error-800';
      case 'warning':
        return 'bg-warning-50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-800';
      case 'info':
        return 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`
              max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4
              ${getToastStyles(toast.type)}
            `}
            onAnimationComplete={() => {
              if (toast.duration) {
                setTimeout(() => removeToast(toast.id), toast.duration);
              }
            }}
          >
            <div className="flex items-start space-x-3">
              {getToastIcon(toast.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
