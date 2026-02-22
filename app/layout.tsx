import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-outfit",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Vibe Landing Starter",
  description: "Минималистичный лендинг с формой лидов, трекингом и webhook inbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
