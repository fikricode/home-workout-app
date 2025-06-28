// app/[packageId]/page.tsx
// Page to show workout details before starting
import { Button } from "@/components/ui/button";
import { getPackageById } from "@/lib/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PackageDetailPage({ params }: { params: { packageId: string } }) {
  const pkg = await getPackageById(Number(params.packageId));

  if (!pkg) {
    notFound();
  }

  const totalTime = Math.ceil(pkg.movements.reduce((acc, curr) => acc + curr.movement.duration_seconds + curr.movement.rest_after_seconds, 0) / 60);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{pkg.name}</h1>
      <p className="text-lg text-muted-foreground mt-2">{pkg.description}</p>
      <p className="mt-1 font-semibold">Estimated Time: {totalTime} minutes</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Movements in this Workout</h2>
        {/* Sequenced list of all movements in the package [cite: 28] */}
        <ol className="list-decimal list-inside space-y-3">
          {pkg.movements.map((item) => (
            <li key={item.id}>
              <span className="font-semibold">{item.movement.name}</span>
              <span className="text-muted-foreground">
                {" "}
                ({item.movement.duration_seconds}s, {item.movement.reps} reps)
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Button to start the workout session [cite: 29] */}
      <Button
        asChild
        size="lg"
        className="mt-8 w-full"
      >
        <Link href={`/${pkg.id}/start`}>Start Workout</Link>
      </Button>
    </main>
  );
}
