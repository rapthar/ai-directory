"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("common");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = newsletterSchema.parse({ email });

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-url": window.location.href,
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      toast.success(t("newsletter.success"));
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(t("newsletter.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="text-white bg-[#0B1829] pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-8">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-[#034B5E] via-[#023847] to-[#0B1829] rounded-[32px] p-12 mb-12">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-full md:w-2/5">
              <h2 className="text-[40px] leading-[44px] font-medium">
                {t("newsletter.title")}
              </h2>
            </div>
            <div className="w-full md:w-3/5">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-8 mb-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={t("newsletter.first_name")}
                      className="w-full bg-transparent border-gray-600 focus:border-gray-400 rounded-none border-t-0 border-x-0 border-b-2 px-0 h-8 placeholder:text-gray-500 text-base"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={t("newsletter.last_name")}
                      className="w-full bg-transparent border-gray-600 focus:border-gray-400 rounded-none border-t-0 border-x-0 border-b-2 px-0 h-8 placeholder:text-gray-500 text-base"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder={t("newsletter.email")}
                      className="w-full bg-transparent border-gray-600 focus:border-gray-400 rounded-none border-t-0 border-x-0 border-b-2 px-0 h-8 placeholder:text-gray-500 text-base"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-none">
                    <Button
                      type="submit"
                      className="bg-[#0B1829] hover:bg-[#0D1E32] text-white border border-pink-600 rounded-full px-8 py-1.5 text-base font-normal whitespace-nowrap"
                      disabled={isLoading}
                    >
                      {t("newsletter.sign_up")}
                    </Button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  {t("newsletter.disclaimer")}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Services */}
          <div className="bg-[#0D1E32] rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#034B5E] after:mt-2">
              {t("services.title")}
            </h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.ai_development")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.mvp_building")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.saas_development")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.ai_integration")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.custom_solutions")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.ai_consulting")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("services.project_management")}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="bg-[#0D1E32] rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#034B5E] after:mt-2">
              {t("company.title")}
            </h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.about")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.how_it_works")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.list_agency")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.success_stories")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.blog")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("company.contact")}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="bg-[#0D1E32] rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#034B5E] after:mt-2">
              {t("resources.title")}
            </h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.ai_guide")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.project_planning")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.cost_calculator")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.agency_reviews")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.documentation")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("resources.api_access")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-[#0D1E32] rounded-3xl p-6">
            <h3 className="text-lg font-semibold mb-4 after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#034B5E] after:mt-2">
              {t("support.title")}
            </h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("support.help_center")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("support.faqs")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("support.agency_support")}</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm">{t("support.client_support")}</Link></li>
            </ul>
            <div className="mt-6 flex gap-4">
              <Image 
                src="/ferroque-badge.svg" 
                alt={t("images.badge_alt")}
                width={70} 
                height={70}
                className="object-contain"
              />
              <Image 
                src="/ferroque-chart.svg" 
                alt={t("images.chart_alt")}
                width={70} 
                height={70}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="text-gray-400 mr-4">Topai.agency</Link>
            <span className="text-gray-600 text-sm">{t("copyright", { year: 2025 })}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">{t("terms")}</Link>
            <Link href="#" className="text-gray-400 hover:text-white">{t("privacy")}</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
}
