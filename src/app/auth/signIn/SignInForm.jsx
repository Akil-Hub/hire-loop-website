"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirect') || '/';

  const router = useRouter();
  

  const onSubmit = async(e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));




const { data, error } = await authClient.signIn.email({
    email: formData.email,
    password:formData.password, 
});

if (error) {
  console.log(error)
  toast.danger('Sign In failed')
  return
}
    router.push(redirectTo);
    toast.success('Singn In Successfull.')
  };

  const googleSignIn = () => {
    router.push("/dashboard");
  };

  return (
  <section className="min-h-screen flex bg-black">

      {/* LEFT SIDE */}
      <div className="hidden pb-20 lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-black px-16">

        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Build your <br />
            future today.
          </h1>

          <p className="text-zinc-200 mt-6 max-w-md text-lg">
            Create your account and manage everything in a clean,
            modern dashboard built for productivity.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-6 my-20">

        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">

            {/* HEADER */}
            <div className="text-center mb-8">

              <h2 className="text-3xl font-bold text-white">
                Sign In
              </h2>

         

            </div>

            {/* GOOGLE BUTTON */}
            <Button
              className="w-full h-12 bg-white text-black font-semibold flex items-center justify-center gap-2"
              onPress={googleSignIn}
            >
              <FaGoogle className="text-black" />
              Continue with Google
            </Button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-6">

              <div className="flex-1 h-px bg-zinc-700" />

              <span className="text-xs text-zinc-400">
                OR
              </span>

              <div className="flex-1 h-px bg-zinc-700" />

            </div>

            {/* FORM */}
            <Form onSubmit={onSubmit} className="flex flex-col gap-4">

   

      {/* EMAIL */}
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      {/* PASSWORD */}
    <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }} 
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
  
        <FieldError />
      </TextField>
              <Button
                type="submit"
                color="primary"
                className="w-full h-12 font-semibold mt-2"
              >
                Sing In
              </Button>

            </Form>

            {/* FOOTER */}
            <div className="mt-6 text-center space-y-4">

              <p className="text-zinc-400 text-sm">

                Don't' have an account?

                <Link
                 href={`/auth/signUp?redirect=${redirectTo}`} 
                  className="text-blue-500 ml-2 hover:underline font-medium"
                >
                  Sign Up
                </Link>

              </p>

          
            </div>

          </div>

        </div>

      </div>

    </section>
  
  );
}
