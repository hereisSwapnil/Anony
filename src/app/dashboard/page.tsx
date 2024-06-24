"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/sign-in" }); // Ensure signOut completes before redirect
      router.push("/sign-in");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="flex justify-center flex-col gap-10 align-middle items-center h-[100vh]">
      <h1 className="text-7xl">Welcome to Anony {session?.user?.username}</h1>
      <Button className="text-2xl" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
