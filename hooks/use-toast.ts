"use client";

import type React from "react";
import { useCallback, useState } from "react";

type ToastType = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = useCallback(
    ({ title, description, variant, action }: Omit<ToastType, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, variant, action },
      ]);
      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toast,
    dismiss,
    dismissAll,
    toasts,
  };
}
