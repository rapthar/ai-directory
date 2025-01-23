import { Hero } from "@/components/hero";
import Listing from "@/components/listing";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen bg-[#0B1829] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Listing />
      </div>
    </main>
  );
}
