// app/admin/packages/new/page.tsx
// Halaman ini akan memuat data gerakan dan menampilkannya melalui komponen Form.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMovements } from "@/lib/actions";
import { PackageForm } from "@/components/admin/PackageForm";

export default async function NewPackagePage() {
  // Ambil semua gerakan yang tersedia untuk dipilih di dalam form
  const movements = await getMovements();

  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Workout Package</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Render komponen form (client component) dan berikan data gerakan */}
          <PackageForm allMovements={movements} />
        </CardContent>
      </Card>
    </main>
  );
}
