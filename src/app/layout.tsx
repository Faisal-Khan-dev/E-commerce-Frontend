// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { inter } from "../fonts"; // Adjusted based on your path configuration
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Ecommerce Dry Fruits",
  description:
    "Buy the best dry fruits online at our ecommerce store. We offer a wide variety of high-quality dry fruits, including almonds, cashews, walnuts, pistachios, and more. Shop now for fresh and delicious dry fruits delivered straight to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      {/* The 'suppressHydrationWarning' is perfectly placed here to ignore 
        any attributes injected into the body tag by third-party browser extensions.
      */}
      <body
        className="min-h-full flex flex-col bg-[#fcf9f6]"
        suppressHydrationWarning
      >
        <AuthProvider>
        <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
