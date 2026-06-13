"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();
  useEffect(() => {
    try {
      const values = JSON.parse(localStorage.getItem("via_values") || "[]");
      router.replace(values.length > 0 ? "/home" : "/onboarding");
    } catch {
      router.replace("/onboarding");
    }
  }, [router]);
  return null;
}
