"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/common/LoaderButton";
import Link from "next/link";
import { useCustomToast } from "@/hooks/useCustomToast";
import { api } from "@/utils/apiClient";

interface OtpVerificationProps {
  email: string;
  onOtpVerified: () => void;
  onResend: () => void;
  initialTimer?: number;
}

const OTP_LENGTH = 6;

const OtpVerification: React.FC<OtpVerificationProps> = ({
  email,
  onOtpVerified,
  onResend,
  initialTimer = 300, // 5 minutes
}) => {
  const form = useForm();
  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [otpTimer, setOtpTimer] = useState(initialTimer);
  const [isLoading, setIsLoading] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const otpInput = otpValues.join("");
      const response = await api.post("/api/auth/otp/verify", { email, otp: otpInput });
      
      if (response.status===200) {
        successToast("OTP Verified", "Your account has been created");
        onOtpVerified();
      }
    } catch (err: any) {
      const errorData = err.data || {};
      errorToast(
        "Verification failed",
        (errorData.error || "Something went wrong") + errorData.attemptsLeft ? `Attempts left: ${errorData.attemptsLeft}` : undefined,
        
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setOtpTimer(300); // Reset to 5 minutes
    setOtpValues(Array(OTP_LENGTH).fill(""));
    onResend();
    inputRefs.current[0]?.focus();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleOtpSubmit} className="space-y-5">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">OTP Verification</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit OTP sent to {email}
          </p>
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otpValues[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {(inputRefs.current[index] = el)}}
              className="w-12 h-12 text-center font-mono text-xl noOutline border-2 rounded dark:border-blue-400"
            />
          ))}
        </div>
        <Button
          className="w-full border mt-10 mb-4 dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark"
          type="submit"
          disabled={isLoading || otpTimer === 0}
        >
          {isLoading ? <LoaderButton /> : <span>Verify OTP</span>}
        </Button>
        {otpTimer > 0 && (
          <p className={`text-center font-medium ${otpTimer <= 60 ? "text-red-400" : "text-cyan-400"}`}>
            {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')} remaining
          </p>
        )}
        <Button
          className="w-full border dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark"
          type="button"
          disabled={otpTimer > 0}
          onClick={handleResend}
        >
          Resend OTP
        </Button>
        <div className="text-center text-sm">
          <Link href="/login" className="underline dark:text-cPeach">
            Back to Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default OtpVerification;