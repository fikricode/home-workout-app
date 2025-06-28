// app/(user)/layout.tsx
// Layout ini berlaku untuk semua halaman publik/pengguna.
import Link from "next/link";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar untuk Pengguna */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold hover:text-gray-300"
          >
            Home Workout
          </Link>
          {/* Tautan ke panel admin, bisa disembunyikan jika ada autentikasi */}
          <Link
            href="/admin"
            className="text-sm hover:text-gray-300"
          >
            Admin Panel
          </Link>
        </nav>
      </header>
      {/* Konten halaman akan dirender di sini */}
      <main>{children}</main>
    </>
  );
}
