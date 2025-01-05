import { Check, Code2, Cpu, Globe2, Rocket, Users2 } from "lucide-react";

export function AboutFeatures() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI Expertise",
      description:
        "Connect with agencies specializing in machine learning, natural language processing, computer vision, and more.",
    },
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Verified Partners",
      description:
        "Every agency in our directory undergoes thorough vetting to ensure they meet our high standards of expertise and reliability.",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Custom Solutions",
      description:
        "Find agencies that can build tailored AI solutions for your specific industry and business needs.",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Global Network",
      description:
        "Access a worldwide network of AI development teams, offering diverse perspectives and expertise.",
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: "Quality Assurance",
      description:
        "Our platform ensures all listed agencies maintain high standards of code quality and project delivery.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Fast Matching",
      description:
        "Our intelligent matching system helps you find the perfect AI development partner quickly and efficiently.",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose Our Directory
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've built the most comprehensive platform for connecting businesses
            with top AI development agencies. Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-black/50 border border-zinc-800/50 hover:border-red-500/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500 group-hover:bg-red-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
