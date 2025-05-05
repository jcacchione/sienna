"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const getToastClasses = () => {
    const baseClasses = "fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 min-w-64 max-w-xs";
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-success text-success-content`;
      case 'error':
        return `${baseClasses} bg-error text-error-content`;
      case 'info':
        return `${baseClasses} bg-info text-info-content`;
      default:
        return `${baseClasses} bg-success text-success-content`;
    }
  };

  return (
    <div className={getToastClasses()}>
      <span className="flex-1">{message}</span>
      <button 
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="p-1 rounded-full hover:bg-base-100/20"
      >
        <X size={16} />
      </button>
    </div>
  );
}
