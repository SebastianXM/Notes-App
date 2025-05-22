"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GoogleSignInButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleClick = () => {
        try {
            signIn("google");
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard");
        }
    }, [status, router]);

    if (status === "loading") {
        return <Button disabled>Loading...</Button>;
    }

    if (status === "authenticated") {
        return <Button disabled>Redirecting...</Button>;
    }

    return (
        <Button onClick={handleClick}>
            <Image
                src="/google_icon.svg"
                alt="Google Icon"
                width={30}
                height={30}
                className="mr-2"
            />
            Sign in with Google
        </Button>
    );
}