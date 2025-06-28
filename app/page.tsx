// app/page.tsx
// Main page displaying all available WorkoutPackages
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPackages } from "@/lib/actions";
import Link from "next/link";

// Utility function to calculate total workout time [cite: 24]
function calculateTotalTime(pkg: Awaited<ReturnType<typeof getPackages>>[0]) {
  const totalSeconds = pkg.movements.reduce((acc, curr) => {
    return acc + curr.movement.duration_seconds + curr.movement.rest_after_seconds;
  }, 0);
  return Math.ceil(totalSeconds / 60);
}

export default async function HomePage() {
  const packages = await getPackages();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Workouts</h1>
      {/* Grid or list of WorkoutCards [cite: 24] */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          // Clicking a card navigates to the package detail page [cite: 25]
          <Link
            href={`/${pkg.id}`}
            key={pkg.id}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pkg.movements.length} movements</p>
                <p className="text-sm font-semibold">Estimated Time: {calculateTotalTime(pkg)} minutes</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
