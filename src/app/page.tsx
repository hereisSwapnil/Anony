"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center flex-col gap-10 align-middle items-center h-[100vh]">
      <h1 className="text-7xl">Welcome to Anony</h1>
      <Button className="text-2xl" onClick={() => router.push("/sign-in")}>
        Sign In
      </Button>
    </div>
  );
}
