import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export function AboutStats() {
  const stats = [
    { value: "10k+", label: "Completed Projects" },
    { value: "15k", label: "Satisfied Customers" },
    { value: "10k+", label: "Years Of Mastery" },
    { value: "45+", label: "Worldwide Honors" },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-white uppercase">OUR STORY</span>
              <div className="w-5 h-[1px] bg-zinc-800"></div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-b from-red-500/50 to-transparent"></div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Your Vision Our Expertise Your Success Get Noticed Generate{" "}
                <span className="text-red-500">Leads Dominate.</span>
              </h2>
            </div>

            <div className="mt-12">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                alt="Team collaboration"
                width={600}
                height={400}
                className="rounded-lg w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                  alt="Tech Blog"
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-[180px] object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Tech Blog</Badge>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Trends</Badge>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                  alt="Tech Blog"
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-[180px] object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Tech Blog</Badge>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Trends</Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Tempor commodo ullamcorper a lacus. Amet commodo nulla facilisi nullam. Molestie nunc non blandit massa enim nec. Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Eros in cursus turpis massa tincidunt dui.
            </p>

            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-black overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={`Team member ${index + 1}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="text-white border-red-500/20 hover:bg-red-500/10 gap-2 rounded-full"
              >
                <PlayCircle className="w-5 h-5" />
                WATCH INTRO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
