'use client';

import { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  title?: string;
  duration?: number;
  onClose?: () => void;
}

export function ErrorToast({
  message,
  title = 'Error',
  duration = 5000,
  onClose,
}: ErrorToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    const { dismiss } = toast({
      title,
      description: message,
      variant: 'destructive',
      icon: <AlertTriangle className="h-5 w-5" />,
    });

    const timer = setTimeout(() => {
      dismiss();
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, title, duration, toast, onClose]);

  return null;
}
