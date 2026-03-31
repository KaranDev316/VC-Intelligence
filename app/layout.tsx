import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalVC",
  description: "Thesis-first sourcing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
