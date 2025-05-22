"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = async () => {
    try {
      setIsSigningOut(true);
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (status !== "authenticated") {
    return null;
  }

  if (isSigningOut) {
    return <Button disabled>Signing out...</Button>;
  }

  return <Button onClick={handleClick}>Sign out</Button>;
}
