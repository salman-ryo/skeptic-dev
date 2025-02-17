"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { loginSchema, LoginValues } from "@/lib/validation/auth";
import AuthLayout from "@/components/pages/auth/auth-layout";
import { FcGoogle } from "react-icons/fc";
import LoaderButton from "@/components/common/LoaderButton";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  // Get the callbackUrl from the query parameters, defaulting to "/blogs"
  const callbackUrl = searchParams.get("callbackUrl") || "/blogs";

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);
    try {
      // Pass the callbackUrl so that on success, next-auth returns it in the response
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      setIsLoading(false);

      // If signIn was successful, router.push to the returned URL
      if (response?.url) {
        router.push(response.url);
      } else {
        // Handle login failure (e.g., show an error message)
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: session, status } = useSession();

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="kon@example.com" className="noOutline border-0 rounded-none border-b-2 dark:border-blue-400" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="********" className="noOutline border-0 rounded-none border-b-2 dark:border-blue-400 pr-10" {...field} />
                      <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full border mt-10 mb-4
              dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark
            " type="submit" disabled={isLoading}>
              {isLoading ? <LoaderButton /> : <span>Log in</span>}
            </Button>
            <Button
              className="w-full border
              dark:bg-black dark:border-cyan-400 dark:text-white dark:hover:bg-black dark:hover:border-cPeach-dark
              
              "
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
            >
              {isLoading ? (
                <LoaderButton />
              ) : (
                <>
                  <FcGoogle /> Log in with Google
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline dark:text-cPeach">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
