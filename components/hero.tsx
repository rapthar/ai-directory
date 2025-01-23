"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="relative py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-white mb-6">
          {t("find")} <span className="text-gray-400">AI</span> {t("agency")}
        </h1>
        <div className="max-w-3xl">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t("search_placeholder")}
                className="w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white placeholder-gray-300 border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="relative w-64 flex-shrink-0">
              <select className="appearance-none w-full pl-4 pr-10 py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 hover:border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-colors">
                <option className="bg-black text-white">{t("any_location")}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg">
              {t("find_provider")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
