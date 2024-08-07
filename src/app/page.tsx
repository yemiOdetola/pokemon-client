'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    console.log({ token });
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* IMPLEMENT LOADING ICON HERE */}
    </main>
  );
}
