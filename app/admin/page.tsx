// app/admin/page.tsx
// Halaman utama (dasbor) untuk area admin.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Movement Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, edit, or delete individual workout movements.</p>
            <Button asChild>
              <Link href="/admin/movements">Go to Movements</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Package Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Create or manage workout packages by combining movements.</p>
            <Button asChild>
              <Link href="/admin/packages">Go to Packages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
