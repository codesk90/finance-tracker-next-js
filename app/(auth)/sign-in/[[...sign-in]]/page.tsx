import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex-col items-center justify-center px-4 lg:flex">
        <div className="space-y-4 pt-16 text-center">
          <h1 className="text=[#2E2A47] text-3xl font-bold">Welcome Back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
          <div className="mt-8 flex items-center justify-center">
            <ClerkLoaded>
              <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>
      </div>
      <div className="hidden h-full items-center justify-center bg-blue-600 lg:flex">
        <Image src="/logo.svg" height={100} width={100} alt="logo" />
      </div>
    </div>
  );
}
