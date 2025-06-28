// app/admin/movements/new/page.tsx
// Halaman yang berisi form untuk menambah gerakan baru, kini dengan field media.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createMovement } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewMovementPage() {
  async function createMovementAction(formData: FormData) {
    "use server";
    await createMovement(formData);
    redirect("/admin/movements");
  }

  return (
    <main className="p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Movement</CardTitle>
          <CardDescription>Fill in the details for the new workout movement.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form untuk membuat gerakan baru, memanggil server action */}
          <form
            action={createMovementAction}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Movement Name</Label>
              <Input
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <Label htmlFor="duration_seconds">Duration (seconds)</Label>
              <Input
                id="duration_seconds"
                name="duration_seconds"
                type="number"
                required
              />
            </div>
            <div>
              <Label htmlFor="reps">Repetitions</Label>
              <Input
                id="reps"
                name="reps"
                type="number"
                required
              />
            </div>
            <div>
              <Label htmlFor="rest_after_seconds">Rest After (seconds)</Label>
              <Input
                id="rest_after_seconds"
                name="rest_after_seconds"
                type="number"
                required
              />
            </div>
            {/* === INPUT BARU UNTUK MEDIA === */}
            <div>
              <Label htmlFor="image_url">Image URL (Optional)</Label>
              <Input
                id="image_url"
                name="image_url"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="video_url">Video URL (Optional)</Label>
              <Input
                id="video_url"
                name="video_url"
                placeholder="https://example.com/video.mp4"
              />
              <p className="text-sm text-muted-foreground mt-1">Note: Video will be prioritized over image if both are provided.</p>
            </div>
            {/* ============================== */}
            <div className="flex gap-4 pt-4">
              <Button type="submit">Save Movement</Button>
              <Button
                variant="outline"
                asChild
              >
                <Link href="/admin/movements">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
