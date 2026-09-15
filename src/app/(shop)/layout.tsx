// app/(shop)/layout.tsx
import { Navbar } from "../../components/common/navbar";
import { Footer } from "../../components/common/footer";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}
