// src/app/(user)/layout.tsx

import Navbar from "@/components/Navber/Navber";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar /> {/* الـ Navbar ثابت هنا فقط */}
      <main>{children}</main>
    </section>
  );
}