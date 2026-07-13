"use client";

import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-6 px-6 border-t border-border">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs text-muted-foreground">
          {t.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
