// components/admin/PackageForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Movement } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPackage } from "@/lib/actions";

interface PackageFormProps {
  allMovements: Movement[];
}

export function PackageForm({ allMovements }: PackageFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Menyimpan gerakan yang dipilih untuk paket ini
  const [selectedMovements, setSelectedMovements] = useState<Movement[]>([]);

  const handleAddMovement = (movement: Movement) => {
    // Tambahkan gerakan ke daftar jika belum ada
    if (!selectedMovements.find((m) => m.id === movement.id)) {
      setSelectedMovements([...selectedMovements, movement]);
    }
  };

  const handleRemoveMovement = (movementId: number) => {
    setSelectedMovements(selectedMovements.filter((m) => m.id !== movementId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const packageData = {
      name,
      description,
      movements: selectedMovements.map((m, index) => ({
        movementId: m.id,
        sequence: index + 1, // Urutan berdasarkan posisi di array
      })),
    };

    try {
      await createPackage(packageData);
      router.push("/admin/packages");
    } catch (error) {
      console.error("Failed to create package", error);
      // Tambahkan notifikasi error untuk pengguna
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Input dasar untuk nama dan deskripsi paket */}
      <div className="space-y-2">
        <Label htmlFor="name">Package Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Bagian untuk memilih gerakan */}
      <div className="space-y-2">
        <Label>Available Movements</Label>
        <div className="grid grid-cols-3 gap-2 border p-2 rounded-md">
          {allMovements.map((movement) => (
            <Button
              type="button"
              variant="outline"
              key={movement.id}
              onClick={() => handleAddMovement(movement)}
            >
              {movement.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Bagian untuk menampilkan dan mengurutkan gerakan yang dipilih */}
      <div className="space-y-2">
        <Label>Selected Movements (in order)</Label>
        <div className="border p-4 rounded-md min-h-[100px] space-y-2">
          {selectedMovements.length === 0 && <p className="text-sm text-muted-foreground">Select movements to add them here.</p>}
          <ol className="list-decimal list-inside">
            {selectedMovements.map((movement) => (
              <li
                key={movement.id}
                className="flex justify-between items-center"
              >
                <span>{movement.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMovement(movement.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit">Save Package</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
