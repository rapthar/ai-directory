import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
      
      <div className="container mx-auto max-w-7xl px-8 relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect AI Development Partner?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join hundreds of businesses who have already found their ideal AI
            development teams through our platform.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/create" className="gap-2">
                List Your Agency
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/agencies">Browse Agencies</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
