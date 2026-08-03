import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusGuard APM & AI Security Sentinel",
  description: "Real-Time Application Performance Monitoring & AI Cyber Security Command Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-cyber-bg text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
