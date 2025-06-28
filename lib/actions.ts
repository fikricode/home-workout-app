// lib/actions.ts
// Using Next.js Server Actions for data mutations
"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { z } from "zod";

// Perbarui skema untuk menyertakan validasi URL (opsional)
const MovementSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().optional(),
  duration_seconds: z.coerce.number().min(1, "Duration must be at least 1."),
  reps: z.coerce.number().min(1, "Reps must be at least 1."),
  rest_after_seconds: z.coerce.number().min(0, "Rest cannot be negative."),
  // Memungkinkan string kosong atau URL yang valid
  image_url: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  video_url: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
});

// --- MOVEMENT ACTIONS ---

export async function createMovement(formData: FormData) {
  const validatedFields = MovementSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    // Ini akan lebih baik jika kita bisa mengembalikan pesan error ke form
    throw new Error("Invalid fields for creating movement.");
  }

  await prisma.movement.create({
    data: {
      ...validatedFields.data,
      // Pastikan string kosong disimpan sebagai null
      image_url: validatedFields.data.image_url || null,
      video_url: validatedFields.data.video_url || null,
    },
  });

  revalidatePath("/admin/movements"); // Refresh the admin page
}

export async function deleteMovement(id: number) {
  try {
    await prisma.movement.delete({ where: { id } });
    revalidatePath("/admin/movements");
  } catch (error) {
    throw new Error("Failed to delete movement. It might be in use by a package.", { cause: error });
  }
}

// --- PACKAGE ACTIONS ---

export async function createPackage(data: { name: string; description: string; movements: { movementId: number; sequence: number }[] }) {
  const { name, description, movements } = data;

  if (!name || movements.length === 0) {
    throw new Error("Package name and at least one movement are required.");
  }

  await prisma.workoutPackage.create({
    data: {
      name,
      description,
      movements: {
        create: movements.map((m) => ({
          movementId: m.movementId,
          sequence: m.sequence,
        })),
      },
    },
  });

  revalidatePath("/admin/packages");
}

export async function deletePackage(id: number) {
  await prisma.workoutPackage.delete({ where: { id } });
  revalidatePath("/admin/packages");
}

// --- DATA FETCHING ---

export async function getPackages() {
  return await prisma.workoutPackage.findMany({
    include: {
      movements: {
        include: {
          movement: true,
        },
      },
    },
  });
}

export async function getPackageById(id: number) {
  return await prisma.workoutPackage.findUnique({
    where: { id },
    include: {
      movements: {
        orderBy: {
          sequence: "asc",
        },
        include: {
          movement: true,
        },
      },
    },
  });
}

export async function getMovements() {
  return await prisma.movement.findMany();
}
