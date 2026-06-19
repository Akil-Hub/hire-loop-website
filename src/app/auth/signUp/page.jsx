import SignUpForm from "@/app/auth/signUp/SignUpForm";
import { Suspense } from "react";


export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignUpForm />
    </Suspense>
  );
}
