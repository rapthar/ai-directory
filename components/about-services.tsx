import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function AboutServices() {
  const t = useTranslations("about.services");

  const services = [
    {
      title: t("items.seo.title"),
      icon: "🎯",
    },
    {
      title: t("items.development.title"),
      icon: "⚡",
    },
    {
      title: t("items.support.title"),
      icon: "🛠",
    },
    {
      title: t("items.blockchain.title"),
      icon: "🔗",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-8">
        <h2 className="text-3xl font-semibold mb-12 text-center text-white">
          {t("title")} <span className="text-pink-600">{t("titleHighlight")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-[#034B5E] to-[#023847] p-8 rounded-2xl border-0"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{service.title}</h3>
              <Button
                variant="outline"
                className="rounded-full border-pink-600 text-white hover:bg-pink-600"
              >
                <span>{t("learnMore")}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
