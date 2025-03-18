"use client"
import { useState } from 'react';
import { ZodError, z } from 'zod';

type ValidationErrors = Record<string, string | string[] | undefined>;

export const useValidation = <T extends z.ZodObject<any>>(schema: T) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (data: z.infer<T>) => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        const simplifiedErrors: ValidationErrors = {};

        Object.entries(formattedErrors).forEach(([key, value]) => {
          simplifiedErrors[key] = value?.[0];
        });

        setErrors(simplifiedErrors);
      }
      return false;
    }
  };

  const validateField = async (field: string, value: any) => {
    try {
      // Now TypeScript knows that schema is a ZodObject and supports pick.
      const fieldSchema = schema.pick({ [field]: true });
      fieldSchema.parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors[0]?.message;
        setErrors(prev => ({ ...prev, [field]: message }));
      }
      return false;
    }
  };

  const resetErrors = () => setErrors({});

  return { errors, validateForm, validateField, resetErrors };
};
