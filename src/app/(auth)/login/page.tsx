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
// import { signInWithEmail } from "@/services/auth";
// import { useAuth } from "@/context/authContext";
import { signIn,useSession } from "next-auth/react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);
    // Here you would typically send the data to your backend
    console.log(data);
    try {
      
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect:false
      });
      console.log("🚀 ~ onSubmit ~ response:", response);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  const handleGoogleLogin = async() =>{
    try {
    const response = await signIn("google")
      console.log("🚀 ~ handleGoogleLogin ~ response:", response)
      
    } catch (error) {
      console.error(error)
    }
  }

  const { data: session, status } = useSession();
  console.log("🚀 ~ LoginPage ~ session:", session)
  console.log("🚀 ~ LoginPage ~ status:", status)

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
                    <Input placeholder="kon@example.com" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <LoaderButton /> : <span>Log in</span>}
            </Button>
            <Button className="w-full" type="button" disabled={isLoading} onClick={handleGoogleLogin}>
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
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
