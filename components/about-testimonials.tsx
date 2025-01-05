import Image from "next/image";
import { Star } from "lucide-react";

export function AboutTestimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechVision",
      image: "/images/testimonials/sarah.jpg",
      content:
        "Through this platform, we found the perfect AI development partner for our computer vision project. The quality of agencies listed is exceptional.",
      company: "TechVision AI",
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder at DataFlow",
      image: "/images/testimonials/marcus.jpg",
      content:
        "The matching process was seamless. Within weeks, we were working with a top-tier AI agency that perfectly understood our needs.",
      company: "DataFlow Analytics",
    },
    {
      name: "Emily Watson",
      role: "Product Lead at FinTech",
      image: "/images/testimonials/emily.jpg",
      content:
        "What impressed me most was the quality control. Every agency we interviewed was thoroughly vetted and highly professional.",
      company: "FinTech Solutions",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from businesses who found their perfect AI development partners
            through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-black/50 border border-zinc-800/50"
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <div className="text-red-500 text-xs">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
