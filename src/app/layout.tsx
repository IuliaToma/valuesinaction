import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/app-provider";

export const metadata: Metadata = {
  title: "Values in Action",
  description: "Reconnect with what matters through small, meaningful actions.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F5F4EA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="min-h-[100dvh] flex flex-col items-center" style={{ background: "var(--bg-base)" }}>
            <div className="w-full max-w-[480px] min-h-[100dvh] relative flex flex-col" style={{ background: "var(--bg-base)" }}>
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
