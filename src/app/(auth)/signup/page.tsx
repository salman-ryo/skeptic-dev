"use client";

import { useState } from "react";
import AuthLayout from "@/components/pages/auth/auth-layout";
import { SignupValues } from "@/lib/validation/auth";
import { api } from "@/utils/apiClient";
import { useCustomToast } from "@/hooks/useCustomToast";
import OtpVerification from "@/components/pages/auth/OtpVerification";
import SignupForm from "@/components/pages/auth/SignupForm";
import useGoToPage from "@/hooks/useGoToPage";

const SignupPage = () => {
  const [signupData, setSignupData] = useState<SignupValues | null>(null);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const { errorToast, successToast } = useCustomToast();
  const { goto } = useGoToPage();

  const handleSignupSuccess = async (data: SignupValues) => {
    // try {
    //   // Generate OTP first
    //   const res = await api.post("/api/auth/otp/generate", {
    //     email: data.email,
    //   });
    //   setSignupData(data);
    //   console.log("🚀 ~ handleSignupSuccess ~ res:", res);
    //   setIsOtpStage(true);
    //   successToast("OTP Sent", "Check your email for verification code");
    // } catch (err: any) {
    //   errorToast("Signup failed", err.data?.error || "Failed to send OTP");
    // }

    // Ignore otp logic for now
    try {
      
      await api.post("/api/auth/signup", data);
      successToast("Signed up successfully", "Please login");
      goto("/login");
    } catch (error:any) {
      errorToast("Signup failed", error?.data?.error || "Please try again later." );
    }
  };

  const handleOtpVerified = async () => {
    if (!signupData) return;
    try {
      await api.post("/api/auth/signup", signupData);
      successToast("Sign up", "Signup successful");
      goto("/login");
      // Add redirection logic here
    } catch (err: any) {
      errorToast("Sign up failed", err.data?.error || "Something went wrong");
    }
  };

  const handleResendOtp = async () => {
    if (!signupData) return;
    try {
      await api.post("/api/auth/otp/generate", { email: signupData.email });
      successToast("OTP Resent", "New OTP sent to your email");
    } catch (err: any) {
      errorToast("Resend failed", err.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      {isOtpStage && signupData ? (
        <OtpVerification
          email={signupData.email}
          onOtpVerified={handleOtpVerified}
          onResend={handleResendOtp}
        />
      ) : (
        <SignupForm onSignup={handleSignupSuccess} />
      )}
    </AuthLayout>
  );
};

export default SignupPage;
