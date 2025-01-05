import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function AboutAwards() {
  const awards = [
    "Creative Genius Award",
    "Social Media Star Award",
    "Data Wizard Award",
    "Innovation Award",
    "Rising Star Award",
    "SEO Guru Award",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-8">
        <h2 className="text-3xl font-semibold mb-12 text-white">
          Prestigious <span className="text-pink-600">Awards</span>
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="flex items-center justify-between p-6 bg-gradient-to-br from-[#034B5E] to-[#023847] border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white">
                  ▶
                </div>
                <div className="text-lg font-semibold text-white">{award}</div>
              </div>
              <Button variant="ghost" className="text-pink-600 hover:text-pink-500">
                <span>Read More</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
