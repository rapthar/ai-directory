"use client";

import Link from "next/link";
import { Menu, GlobeIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 border-b border-gray-800 bg-[#0B1829]">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8">
          <Image
            src="/white.png"
            alt="Logo"
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="font-semibold text-xl text-white">Topai.agency</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="font-medium text-white">
          {t("navigation.home")}
        </Link>
        <Link href="/blog" className="font-medium text-white">
          {t("common.company.blog")}
        </Link>
        <Link href={`/${locale}/contact`} className="font-medium text-white">
          {t("common.company.contact")}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <Link href="/register" className="text-white hover:text-white transition-colors text-lg">
            Sign Up
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3B9A] to-[#4845FF]" />
          <Button
            variant={"outline"}
            asChild
            className="relative bg-[#0B1829] text-white rounded-full px-8 py-1.5 text-base font-normal hover:opacity-90 border-0 m-[1px]"
          >
            <Link href="/create" className="flex items-center gap-2">
              <span>{t("common.listAgency")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="hidden md:flex ml-4 items-center gap-2">
          <GlobeIcon className="h-4 w-4 text-white" />
          <LanguageSwitcher />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] bg-black text-white">
            <SheetTitle className="text-white">
              <VisuallyHidden>Navigation Menu</VisuallyHidden>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Main navigation menu for accessing different sections of the website
            </SheetDescription>
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="text-lg font-semibold hover:text-primary"
                onClick={handleLinkClick}
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/blog"
                className="text-lg font-semibold hover:text-primary"
                onClick={handleLinkClick}
              >
                {t("common.company.blog")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-lg font-semibold hover:text-primary"
                onClick={handleLinkClick}
              >
                {t("common.company.contact")}
              </Link>
              <Link
                href="/signin"
                className="text-lg font-semibold hover:text-primary"
                onClick={handleLinkClick}
              >
                {t("common.auth.signIn")}
              </Link>
              <div className="flex items-center gap-2 mt-4">
                <GlobeIcon className="h-4 w-4" />
                <LanguageSwitcher />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
