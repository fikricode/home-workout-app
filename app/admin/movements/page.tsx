// app/admin/movements/page.tsx
// The main page for movement management
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMovements, deleteMovement } from "@/lib/actions";
import Link from "next/link";

export default async function MovementsAdminPage() {
  const movements = await getMovements();

  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Movement Management</CardTitle>
            {/* Button to navigate to the 'new movement' form [cite: 42] */}
            <Button asChild>
              <Link href="/admin/movements/new">Add New Movement</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table displaying all available movements [cite: 42] */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration (s)</TableHead>
                <TableHead>Reps</TableHead>
                <TableHead>Rest After (s)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{movement.name}</TableCell>
                  <TableCell>{movement.duration_seconds}</TableCell>
                  <TableCell>{movement.reps}</TableCell>
                  <TableCell>{movement.rest_after_seconds}</TableCell>
                  <TableCell>
                    <form
                      action={async () => {
                        "use server";
                        await deleteMovement(movement.id);
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
