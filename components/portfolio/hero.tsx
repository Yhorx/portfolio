"use client";

import { ChevronsDown, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const name = "Jorge Jara";

const socialLinks = [
  {
    href: "https://github.com/Yhorx",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/jorge-luis-jara-rodriguez-9a2774410/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">

      {/* Name Section - Full Screen */}
      <section className="min-h-screen relative flex select-none items-center justify-center px-6">
        <div className="liquid-glass p-12 md:p-24 rounded-[3rem] text-center shadow-2xl flex flex-col items-center">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter mb-8"
            aria-label={name}
          >
            {name.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                className="hero-letter"
                style={{ animationDelay: `${0.18 + index * 0.08}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <div className="flex items-center justify-center gap-6 delayed-fade-in">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors p-3 liquid-glass rounded-full"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 delayed-fade-in">
          <Link 
            href="#about" 
            className="text-primary hover:text-primary/80 transition-colors p-2 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronsDown className="h-10 w-10 pointer-events-none" />
          </Link>
        </div>
      </section>
    </div>
  );
}
