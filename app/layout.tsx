import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VC Intelligence | Thesis-First Deal Research",
  description:
    "Discover, enrich, and evaluate companies against your investment thesis.",
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
