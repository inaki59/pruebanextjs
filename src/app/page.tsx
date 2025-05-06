"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Login");
  }, [router]);

  return null; // No mostramos nada porque redirige automáticamente
}
