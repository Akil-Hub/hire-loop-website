"use client";
import { Description, Radio, RadioGroup, toast } from "@heroui/react";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { Suspense, useState } from "react";

export default function SignUpForm
() {
  const [role, setRole] = useState("seeker")
 const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirect') || '/';

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();



    const plan = role ==='seeker'?'seeker_free':'recruiter_free'
    const formData = Object.fromEntries(new FormData(e.currentTarget));



    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      requestedRole:role,
      plan,
    });

 if (error) {
    toast.danger("Sign up failed", { description: error.message });
    return; 
  }

    router.push(redirectTo);
    toast.success('Account Created Successfully.')
  };

  const googleSignIn = () => {
    router.push("/dashboard");
  };

  return (
    <Suspense fallback={null}>
    <section className="min-h-screen flex bg-black">

      {/* LEFT SIDE */}
      <div className="hidden pb-20 lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-700 to-black px-16">
        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Build your <br /> future today.
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
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-zinc-400 mt-2">Join thousands of users today</p>
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
              <span className="text-xs text-zinc-400">OR</span>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            {/* FORM */}
            <Form onSubmit={onSubmit} className="flex flex-col gap-4">

              {/* NAME */}
              <TextField
                name="name"
                isRequired
                validate={(value) =>
                  value.length < 4 ? "Please enter at least 4 characters" : null
                }
              >
                <Label>Full Name</Label>
                <Input placeholder="Enter your name" />
                <FieldError />
              </TextField>

              {/* EMAIL */}
              <TextField
                name="email"
                type="email"
                isRequired
                validate={(value) =>
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ? "Please enter a valid email address"
                    : null
                }
              >
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              {/* PASSWORD */}
              <TextField
                name="password"
                type="password"
                isRequired
                validate={(value) => {
                  if (value.length < 8) return "Password must be at least 8 characters";
                  if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
                  if (!/[0-9]/.test(value)) return "Must contain at least one number";
                  return null;
                }}
              >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />
                <FieldError />
              </TextField>
              {/* Role */}
              <div className="flex flex-col gap-4">
                <Label>Subscription plan</Label>
                <RadioGroup value={role} name="role" orientation="horizontal"  onChange={setRole}>
                  <Radio value="seeker" >
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Seeker</Label>
                      <Description>For side projects</Description>
                    </Radio.Content>
                  </Radio>
                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter</Label>
                      <Description>Advanced reporting</Description>
                    </Radio.Content>
                  </Radio>
                  
                </RadioGroup>
              </div>


              <Button
                type="submit"
                color="primary"
                className="w-full h-12 font-semibold mt-2"
              >
                Create Account
              </Button>

            </Form>

            {/* FOOTER */}
            <div className="mt-6 text-center space-y-4">
              <p className="text-zinc-400 text-sm">
                Already have an account?
                <Link href={`/auth/signIn?redirect=${redirectTo}`} className="text-blue-500 ml-2 hover:underline font-medium">
                  Sign In
                </Link>
              </p>
              <p className="text-xs text-zinc-500">
                By continuing you agree to our{" "}
                <Link href="/terms" className="underline">Terms</Link>
                {" "}and{" "}
                <Link href="/auth/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
    </Suspense>

  );
}