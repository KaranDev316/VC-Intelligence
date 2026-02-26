import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VC Intelligence",
  description: "Thesis-first sourcing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0 }} suppressHydrationWarning>{children}</body>
    </html>
  );
}
