// components/workout/WorkoutPlayer.tsx
// Ini adalah client component untuk mengelola sesi real-time.
"use client";

import { Movement } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Image from "next/image";

interface WorkoutPlayerProps {
  movements: Movement[];
}

export function WorkoutPlayer({ movements }: WorkoutPlayerProps) {
  const router = useRouter();
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(movements[0].duration_seconds);
  const [isFinished, setIsFinished] = useState(false);

  const currentMovement = movements[currentMovementIndex];

  useEffect(() => {
    if (isFinished) return;

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        }
        handleNext();
        return 0;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentMovementIndex, isResting, isFinished]);

  const handleNext = () => {
    if (isResting) {
      const nextIndex = currentMovementIndex + 1;
      if (nextIndex < movements.length) {
        setCurrentMovementIndex(nextIndex);
        setIsResting(false);
        setTimer(movements[nextIndex].duration_seconds);
      } else {
        setIsFinished(true);
      }
    } else {
      // Hanya mulai istirahat jika waktu istirahat > 0
      if (currentMovement.rest_after_seconds > 0) {
        setIsResting(true);
        setTimer(currentMovement.rest_after_seconds);
      } else {
        // Lewati istirahat jika 0, langsung ke gerakan berikutnya
        const nextIndex = currentMovementIndex + 1;
        if (nextIndex < movements.length) {
          setCurrentMovementIndex(nextIndex);
          setIsResting(false);
          setTimer(movements[nextIndex].duration_seconds);
        } else {
          setIsFinished(true);
        }
      }
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Card className="text-center p-8 shadow-lg">
          <CardTitle className="text-2xl font-bold">🎉 Congratulations! 🎉</CardTitle>
          <CardContent className="mt-4">
            <p>Workout Complete!</p>
            <Button
              onClick={() => router.push("/")}
              className="mt-6"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* === AREA TAMPILAN MEDIA === */}
      <div className="w-full max-w-2xl mb-4 bg-gray-900 rounded-lg shadow-xl overflow-hidden aspect-video">
        {isResting ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <p className="text-2xl font-semibold">Get Ready for the Next Movement</p>
            <p className="text-lg">{movements[currentMovementIndex + 1]?.name || "Final Rest"}</p>
          </div>
        ) : currentMovement.video_url || currentMovement.image_url ? (
          <>
            {currentMovement.video_url && (
              <video
                key={currentMovement.video_url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src={currentMovement.video_url ?? ""}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            {currentMovement.image_url && (
              <img
                src={currentMovement.image_url}
                alt={`Illustration for ${currentMovement.name}`}
                className="w-full h-full object-contain"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
            <p>No media for this movement</p>
          </div>
        )}
      </div>
      {/* ============================ */}

      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{isResting ? "REST" : currentMovement.name}</CardTitle>
          <p className="text-muted-foreground">
            Movement {currentMovementIndex + 1} of {movements.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-8xl font-mono font-extrabold text-blue-600">{String(timer).padStart(2, "0")}</div>
          {!isResting && <div className="text-2xl font-semibold">Reps: {currentMovement.reps}</div>}
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full"
          >
            {isResting ? "Skip Rest" : "Next"}
          </Button>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button
          variant="ghost"
          asChild
        >
          <Link href="/">Quit Workout</Link>
        </Button>
      </div>
    </div>
  );
}
