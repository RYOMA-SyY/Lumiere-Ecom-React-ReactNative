import { Link, useLocation } from "wouter";
import { useStore } from "../../lib/store";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Menu, Search, User as UserIcon, Globe } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { useState } from "react";

export function Header() {
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const cart = useStore((state) => state.cart);
  const setLanguage = useStore((state) => state.setLanguage);
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLanguageChange = (lang: 'en' | 'fr' | 'ar') => {
    setLanguage(lang);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("categories") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight text-primary flex items-center gap-2">
            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-serif italic">L</span>
            Lumiere
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
                {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground rtl:right-2.5 rtl:left-auto" />
          <Input 
            type="search" 
            placeholder={t("search")} 
            className="pl-9 bg-muted/50 border-none focus-visible:ring-1 rtl:pr-9 rtl:pl-3"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary" data-testid="button-cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary">
              <UserIcon className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
