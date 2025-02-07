// useCustomToast.tsx
"use client";

import * as React from "react";
import {  ToastActionElement } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// Define a type for our toast function signature.
type ToastFn = (
  title: string,
  description?: string,
  action?: ToastActionElement
) => void;

/**
 * A custom hook wrapping the default toast API.
 * Provides dry methods like error() and success() to show toasts.
 */
export function useCustomToast() {
  const { toast } = useToast();

  // Use useCallback to memoize our functions (optional but recommended)
  const error: ToastFn = React.useCallback(
    (title, description, action) => {
      toast({
        // Assuming "destructive" is your error variant.
        variant: "destructive",
        title,
        description,
        action,
      });
    },
    [toast]
  );

  const success: ToastFn = React.useCallback(
    (title, description, action) => {
      toast({
        // You can define a "success" variant in your theme or use the default one.
        variant: "default",
        title,
        description,
        action,
      });
    },
    [toast]
  );

  // If needed, you can also expose a generic toast that does not force a variant.
  const generic: ToastFn = React.useCallback(
    (title, description, action) => {
      toast({
        title,
        description,
        action,
      });
    },
    [toast]
  );

  return {
    errorToast:error,
    successToast:success,
    customToast: generic,
  };
}
