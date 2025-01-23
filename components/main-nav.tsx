"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children, className, onClick }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => {
  const locale = useLocale();
  const localizedHref = href === '/' ? `/${locale}` : `/${locale}${href}`;
  const isRTL = locale === 'ar';
  
  return (
    <Link 
      href={localizedHref} 
      className={cn(
        "font-medium text-white hover:text-gray-300 transition-colors",
        isRTL && "font-arabic",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'blog', href: '/blog' },
    { key: 'contact', href: '/contact' }
  ];

  return (
    <nav className={cn(
      "flex items-center justify-between py-4 px-6 border-b border-gray-800 bg-[#0B1829] relative",
      isRTL && "flex-row-reverse"
    )}>
      <NavLink href="/" className={cn(isRTL && "ml-auto")} onClick={handleLinkClick}>
        <div className={cn(
          "flex items-center gap-2",
          isRTL && "flex-row-reverse"
        )}>
          <div className="w-8 h-8 relative">
            <Image
              src="/white.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className={cn(
            "font-semibold text-xl text-white whitespace-nowrap",
            isRTL && "font-arabic"
          )}>
            Topai.agency
          </span>
        </div>
      </NavLink>
      
      <div className={cn(
        "hidden md:flex items-center gap-8",
        isRTL && "flex-row-reverse"
      )}>
        {navItems.map(({ key, href }) => (
          <NavLink key={key} href={href} onClick={handleLinkClick}>
            {t(key)}
          </NavLink>
        ))}
        <Button
          asChild
          className="relative bg-transparent hover:bg-transparent text-white rounded-full px-8 py-3 group"
        >
          <Link href="/create" onClick={handleLinkClick}>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF3366] via-[#FF33FF] to-[#3366FF]" />
            <span className="absolute inset-[1.5px] rounded-full bg-[#0B1829] transition-all group-hover:bg-opacity-90" />
            <span className="relative flex items-center gap-2">
              List Your Agency
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16669 10H15.8334M15.8334 10L10 4.16669M15.8334 10L10 15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className={cn("md:hidden", isRTL && "mr-auto")}>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
            <VisuallyHidden>Toggle Menu</VisuallyHidden>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side={isRTL ? "left" : "right"} 
          className={cn(
            "w-[300px] sm:w-[400px] bg-[#0B1829] text-white",
            isRTL && "font-arabic"
          )}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map(({ key, href }) => (
              <NavLink key={key} href={href} onClick={handleLinkClick}>
                <span className="block px-2 py-1 text-lg">
                  {t(key)}
                </span>
              </NavLink>
            ))}
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
