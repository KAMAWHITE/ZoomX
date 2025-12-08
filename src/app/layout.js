'use client'
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/components/Language";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <AppProvider>
          <Navbar />
          <main className="overflow-x-hidden">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}