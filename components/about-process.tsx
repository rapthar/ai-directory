import { ArrowRight } from "lucide-react";

export function AboutProcess() {
  const steps = [
    {
      number: "01",
      title: "Define Your Needs",
      description:
        "Tell us about your project requirements, budget, and timeline. Our smart matching system starts working immediately.",
    },
    {
      number: "02",
      title: "Browse Agencies",
      description:
        "Explore our curated list of AI development agencies, filtered according to your specific needs and preferences.",
    },
    {
      number: "03",
      title: "Compare & Choose",
      description:
        "Review detailed agency profiles, past projects, client testimonials, and expertise to make an informed decision.",
    },
    {
      number: "04",
      title: "Connect & Create",
      description:
        "Connect directly with your chosen agency and begin bringing your AI project to life with confidence.",
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes it easy to find and connect with the
            perfect AI development agency for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="mb-6">
                <span className="text-5xl font-bold text-red-500/20">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-red-500/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
