// app/admin/layout.tsx
// Layout ini khusus untuk semua halaman di dalam direktori /admin.
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar untuk Admin */}
      <header className="bg-blue-900 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            href="/admin"
            className="text-xl font-bold hover:text-blue-200"
          >
            Admin Dashboard
          </Link>
          <div className="flex gap-6 text-sm">
            <Link
              href="/"
              className="hover:text-blue-200"
            >
              Go to Public Site
            </Link>
            <Link
              href="/admin/movements"
              className="hover:text-blue-200"
            >
              Manage Movements
            </Link>
            <Link
              href="/admin/packages"
              className="hover:text-blue-200"
            >
              Manage Packages
            </Link>
          </div>
        </nav>
      </header>
      {/* Konten halaman admin akan dirender di sini */}
      <main>{children}</main>
    </>
  );
}
