"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const name = "Jorge Jara";

const socialLinks = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Name Section - Full Screen */}
      <section className="min-h-screen flex select-none items-center justify-center px-6">
        <div className="liquid-glass p-12 md:p-24 rounded-[3rem] text-center shadow-2xl">
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter"
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
        </div>
      </section>

      {/* Intro Details Section */}
      <section className="min-h-[50vh] flex select-none items-center justify-center px-6 pb-24">
      </section>
    </div>
  );
}
