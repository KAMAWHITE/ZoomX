'use client'
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/components/Language";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main className="min-h-screen pt-21 bg-gray-900">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}