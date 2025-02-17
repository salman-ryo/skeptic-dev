"use client";

import { useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signupSchema, SignupValues } from "@/lib/validation/auth";
import { FcGoogle } from "react-icons/fc";
import LoaderButton from "@/components/common/LoaderButton";
import { signIn } from "next-auth/react";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  onSignup: (data: SignupValues) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { errorToast, successToast } = useCustomToast();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    try {
      // Instead of finalizing the signup, we call the parent's onSignup.
      onSignup(data);
    } catch (err: any) {
      errorToast("Sign up failed", err.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    await signIn("google", { redirect: false });
  };

  return (
    <>
      <div className="space-y-2 text-center mb-5">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your admin account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupValues, "name">;
            }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kon Woe"
                    className="noOutline border-0 rounded-none border-b-2 dark:border-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupValues, "email">;
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="kon@example.com"
                    className="noOutline border-0 rounded-none border-b-2 dark:border-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupValues, "password">;
            }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="noOutline border-0 rounded-none border-b-2 dark:border-blue-400 pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 dark:hover:text-cPeach" />
                      ) : (
                        <Eye className="h-5 w-5 dark:hover:text-cPeach" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full border mt-10 mb-4 dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoaderButton /> : <span>Sign up</span>}
          </Button>
          <Button
            className="w-full border dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark"
            type="button"
            disabled={isLoading}
            onClick={handleGoogleAuth}
          >
            {isLoading ? (
              <LoaderButton />
            ) : (
              <>
                <FcGoogle /> Sign up with Google
              </>
            )}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline dark:text-cPeach">
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
