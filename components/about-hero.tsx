import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function AboutHero() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-white uppercase">Our Mission</span>
              <div className="w-5 h-[1px] bg-zinc-800"></div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-b from-red-500/50 to-transparent"></div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Connecting Visionaries with Leading{" "}
                <span className="text-red-500">AI Development Teams.</span>
              </h2>
            </div>

            <div className="mt-12">
              <Image
                src="/images/about/ai-collaboration.jpg"
                alt="AI Development Team Collaboration"
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
                  src="/images/about/ai-innovation.jpg"
                  alt="AI Innovation"
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-[180px] object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Innovation</Badge>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">AI</Badge>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/about/tech-solutions.jpg"
                  alt="Tech Solutions"
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-[180px] object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Solutions</Badge>
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">Tech</Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              We're revolutionizing how businesses connect with AI development agencies. Our platform serves as the bridge between innovative companies seeking AI solutions and the world's top AI development teams. Whether you're looking to implement machine learning, develop AI-powered applications, or transform your business with artificial intelligence, we help you find the perfect agency partner.
            </p>

            <div className="grid grid-cols-4 gap-4">
              {[
                { value: "500+", label: "AI Agencies" },
                { value: "2.5k+", label: "Projects Matched" },
                { value: "98%", label: "Success Rate" },
                { value: "50+", label: "Countries" },
              ].map((stat, index) => (
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
                      src={`/images/team/member-${index + 1}.jpg`}
                      alt={`Team member ${index + 1}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <Badge 
                variant="outline" 
                className="text-white border-red-500/20 hover:bg-red-500/10 gap-2 rounded-full px-4 py-2"
              >
                Trusted Platform
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
