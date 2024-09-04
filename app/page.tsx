import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl lg:text-5xl">
          Sakeenah
        </h1>
      </div>
      <div>
        <Link href="/collatz"><Button className="w-full">Collatz Demo</Button></Link>
      </div>
    </main>
  );
}
