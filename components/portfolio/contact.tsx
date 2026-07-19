"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { toast } from "sonner";

declare global {
  interface Window {
    turnstile: any;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;

export function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Carga el script de Turnstile una sola vez y renderiza el widget
  useEffect(() => {
    const scriptId = "cf-turnstile-script";

    function renderWidget() {
      if (widgetRef.current && window.turnstile && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setCaptchaToken(token),
          "expired-callback": () => setCaptchaToken(""),
          "error-callback": () => setCaptchaToken(""),
        });
      }
    }

    if (document.getElementById(scriptId)) {
      // El script ya está cargado
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = renderWidget;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error(t.contact.captchaRequiredToast);
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = new URLSearchParams();
    data.append("name", formData.get("name") as string);
    data.append("email", formData.get("email") as string);
    data.append("message", formData.get("message") as string);
    data.append("cf-turnstile-response", captchaToken);

    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL as string;

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast.success(t.contact.successToast);
      form.reset();
    } catch (error) {
      toast.error("Ocurrió un error en la red.");
    } finally {
      setIsSubmitting(false);
      // Resetea el widget para generar un token nuevo en el próximo intento
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setCaptchaToken("");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 scroll-mt-24">
      <div className="max-w-md mx-auto text-center liquid-glass p-8 md:p-12 rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          <span className="text-primary font-mono text-2xl">//</span> {t.contact.title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          {t.contact.description}
          <br />
          <span className="text-base text-primary font-bold opacity-70">({t.contact.destination}: jorgeluisjhara@gmail.com)</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder={t.contact.namePlaceholder}
              className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder={t.contact.emailPlaceholder}
              className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          <div>
            <textarea
              name="message"
              required
              placeholder={t.contact.messagePlaceholder}
              rows={4}
              className="w-full px-4 py-2 rounded-md bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
            ></textarea>
          </div>

          <div ref={widgetRef} className="flex justify-center" />

          <Button
            type="submit"
            disabled={isSubmitting || !captchaToken}
            className="w-full gap-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "..." : t.contact.button}
          </Button>
        </form>
      </div>
    </section>
  );
}