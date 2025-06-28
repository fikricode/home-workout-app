// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Logika autentikasi semu (di dunia nyata, ini akan memeriksa sesi pengguna)
const auth = (req: Request) => ({ id: "fakeUser" });

// FileRouter Anda, mendefinisikan semua endpoint unggahan file
export const ourFileRouter = {
  // Endpoint untuk mengunggah gambar ilustrasi gerakan
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Middleware ini berjalan di server sebelum unggahan
    .middleware(async ({ req }) => {
      // Validasi pengguna di sini
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      // Apa pun yang dikembalikan di sini tersedia di onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Callback ini berjalan di server setelah unggahan selesai
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      // Apa pun yang dikembalikan di sini dikirim kembali ke klien
      return { uploadedBy: metadata.userId };
    }),

  // Endpoint untuk mengunggah video ilustrasi gerakan
  videoUploader: f({ video: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
