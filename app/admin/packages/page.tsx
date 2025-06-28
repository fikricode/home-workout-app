// app/admin/packages/page.tsx
// Halaman untuk menampilkan tabel semua paket workout.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPackages, deletePackage } from "@/lib/actions";
import Link from "next/link";

export default async function PackagesAdminPage() {
  const packages = await getPackages();

  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Package Management</CardTitle>
            <Button asChild>
              <Link href="/admin/packages/new">Add New Package</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Movement Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell>{pkg.description}</TableCell>
                  <TableCell>{pkg.movements.length}</TableCell>
                  <TableCell>
                    <form
                      action={async () => {
                        "use server";
                        await deletePackage(pkg.id);
                      }}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        type="submit"
                      >
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
