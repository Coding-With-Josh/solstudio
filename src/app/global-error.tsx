"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-160px)] w-full flex-col items-center justify-center gap-y-4">
      <h2 className=" text-3xl font-bold text-destructive">
        Oops, Something Went Wrong!
      </h2>
      <div className="flex min-w-fit min-h-fit items-center justify-center p-3 bg-destructive text-white">
        <X size={46} strokeWidth={3}/>
      </div> 
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
