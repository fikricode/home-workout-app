// app/(user)/page.tsx
// Halaman utama yang menampilkan daftar semua paket workout.

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPackages } from "@/lib/actions";
import Link from "next/link";

// Tipe ini membantu TypeScript memahami struktur data paket yang kita terima.
type PackageWithMovements = Awaited<ReturnType<typeof getPackages>>[0];

/**
 * Menghitung estimasi total waktu untuk sebuah paket workout.
 * Logika ini menjumlahkan durasi setiap gerakan dan waktu istirahat setelahnya.
 * Sesuai dengan spesifikasi: "estimasi total waktu (dihitung dari jumlah durasi gerakan + istirahat)". [cite: 24]
 */
function calculateTotalTime(pkg: PackageWithMovements): number {
  if (!pkg.movements || pkg.movements.length === 0) {
    return 0;
  }

  const totalSeconds = pkg.movements.reduce((accumulator, currentMovement) => {
    return accumulator + currentMovement.movement.duration_seconds + currentMovement.movement.rest_after_seconds;
  }, 0);

  // Mengonversi total detik ke menit dan membulatkannya ke atas.
  return Math.ceil(totalSeconds / 60);
}

export default async function UserHomePage() {
  // Mengambil data semua paket dari backend menggunakan Server Action. [cite: 25]
  const packages = await getPackages();

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6">Available Workouts</h1>

      {/* Menampilkan paket dalam format grid atau daftar kartu. [cite: 24] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          // Setiap kartu adalah tautan yang mengarahkan ke halaman detail paket. [cite: 25]
          <Link
            href={`/${pkg.id}`}
            key={pkg.id}
            className="block hover:scale-105 transition-transform duration-200"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <p className="text-sm text-muted-foreground">{pkg.movements.length} movements</p>
                <p className="text-sm font-semibold">
                  {/* Menampilkan estimasi total waktu yang telah dihitung. [cite: 24] */}
                  Estimated Time: {calculateTotalTime(pkg)} minutes
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
