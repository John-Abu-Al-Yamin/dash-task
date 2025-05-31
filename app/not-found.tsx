import Link from "next/link";
import { MoveLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
      <div className="space-y-10 flex flex-col items-center">
        <div className="relative">
          <div className="text-9xl font-extrabold text-muted-foreground/20">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="h-24 w-24 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto max-w-[500px] text-muted-foreground md:text-xl/relaxed">
            Sorry we couldnt find the page youre looking for. It might have
            been moved or deleted.
          </p>
        </div>
        <button className="relative text-white text-xl py-2 px-6 bg-black border-none rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300">
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Return Home
          </Link>
        </button>
      </div>
    </div>
  );
}
