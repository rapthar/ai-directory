import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AboutTimeline() {
  const t = useTranslations();

  return (
    <section className="py-20 bg-[#0D1E32]">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-sm uppercase mb-4 text-pink-600">OUR STORY</div>
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Your Gateway To <span className="text-pink-600">Online Excellence</span> Dream Big in Pixels.
            </h2>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6">
              Learn More
            </Button>
          </div>
          <Card className="bg-gradient-to-br from-[#034B5E] to-[#023847] border-0 overflow-hidden">
            <Image
              src="/placeholder.png"
              alt="Timeline illustration"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
