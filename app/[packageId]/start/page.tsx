// app/[packageId]/start/page.tsx
// This page fetches the data and passes it to a client component.
import { WorkoutPlayer } from "@/components/workout/WorkoutPlayer";
import { getPackageById } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function StartWorkoutPage({ params }: { params: { packageId: string } }) {
  const pkg = await getPackageById(Number(params.packageId));

  if (!pkg || pkg.movements.length === 0) {
    notFound();
  }

  const movements = pkg.movements.map((m) => m.movement);

  return <WorkoutPlayer movements={movements} />;
}
