-- CreateTable
CREATE TABLE "Movement" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "image_url" VARCHAR(255),
    "video_url" VARCHAR(255),
    "duration_seconds" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest_after_seconds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPackage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageMovement" (
    "id" SERIAL NOT NULL,
    "package_id" INTEGER NOT NULL,
    "movement_id" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "PackageMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackageMovement_package_id_sequence_key" ON "PackageMovement"("package_id", "sequence");

-- AddForeignKey
ALTER TABLE "PackageMovement" ADD CONSTRAINT "PackageMovement_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "WorkoutPackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageMovement" ADD CONSTRAINT "PackageMovement_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
