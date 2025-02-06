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
import AuthLayout from "@/components/pages/auth/auth-layout";
import { FcGoogle } from "react-icons/fc";
import LoaderButton from "@/components/common/LoaderButton";
import { useAuth } from "@/context/authContext";
// import { signUpWithEmail } from "@/services/auth";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { signup, loginWithGoogle } = useAuth();

  async function onSubmit(data: SignupValues) {
    setIsLoading(true);
    try {
      
      // Here you would typically send the data to your backend
      console.log(data);
      const response = await signup(data.email, data.password)
      console.log("🚀 ~ onSubmit ~ response:", response)
    } catch (error) {
      console.error(error)
    } finally{
      setIsLoading(false);
    }
  }
const handleGoogleAuth = async() =>{
  const res = await loginWithGoogle()
  console.log("🚀 ~ handleGoogleAuth ~ res:", res)
}
  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your admin account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({
                field,
              }: {
                field: ControllerRenderProps<SignupValues, "username">;
              }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
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
                    <Input placeholder="john@example.com" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoaderButton/>
              ) : (
                  <span>
                      Sign up
                  </span>
              )}
            </Button>
            <Button className="w-full" type="button" disabled={isLoading} onClick={handleGoogleAuth}>
              {isLoading ? (
                <LoaderButton/>
              ) : (
                <>
                  <FcGoogle /> Sign up with Google
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/admin/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
