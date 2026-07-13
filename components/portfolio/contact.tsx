"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6 ">
      <div className="max-w-md mx-auto text-center liquid-glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-foreground mb-4">
          <span className="text-primary font-mono">//</span> {t.contact.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {t.contact.description}
        </p>
        <Button
          asChild
          size="sm"
          className="gap-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
        >
          <a href="mailto:jorgeluisjhara@gmail.com">
            <Mail className="h-4 w-4" />
            {t.contact.button}
          </a>
        </Button>
      </div>
    </section>
  );
}
