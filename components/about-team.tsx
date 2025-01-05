import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function AboutTeam() {
  const t = useTranslations();

  const team = [
    { name: "Julia", role: "Web Designer" },
    { name: "Liam", role: "UI/UX Designer" },
    { name: "Robert", role: "Developer" },
    { name: "Sara", role: "Product Manager" },
    { name: "Steve", role: "Creative Director" },
  ];

  return (
    <section className="py-20 bg-[#0D1E32]">
      <div className="container mx-auto max-w-7xl px-8">
        <h2 className="text-3xl font-semibold mb-12 text-white">
          Crafts Visionary Ideas <span className="text-pink-600">That Inspire</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-700 pb-4"
              >
                <div>
                  <div className="text-lg font-semibold text-white">{member.name}</div>
                  <div className="text-gray-400">{member.role}</div>
                </div>
                <Button variant="ghost" className="text-pink-600 hover:text-pink-500">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
          <Card className="bg-gradient-to-br from-[#034B5E] to-[#023847] border-0 overflow-hidden rounded-full aspect-square">
            <Image
              src="/placeholder.png"
              alt="Team member"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
