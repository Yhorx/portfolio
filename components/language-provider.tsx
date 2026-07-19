"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "es" | "en";

const date = new Date();
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

type Translations = {
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    techTitle: string;
  };
  projects: {
    title: string;
    items: {
      title: string;
      description: string;
      code: string
      url?: string
      image: string
    }[];
  };
  contact: {
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    button: string;
    successToast: string;
    destination: string;
    captchaRequiredToast: string
  };
  footer: {
    madeWith: string;
  };
};

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, mi nombre es",
      role: "Desarrollador de Software",
      description: "Enfocado en aplicaciones web y Android. Integrando APIs REST, modelos de IA locales y despliegue con Docker.",
    },
    about: {
      title: "Sobre Mí",
      p1: "Soy un Desarrollador de Software enfocado en la creación de aplicaciones web y móviles robustas. Mi experiencia abarca desde el diseño de arquitecturas frontend fluidas hasta la implementación de servicios backend eficientes.",
      p2: "Me apasiona integrar tecnologías modernas en mis proyectos, desarrollando asistentes de escritorio impulsados por IA local (Ollama), aplicaciones Android (Kotlin) y plataformas web (TypeScript/Angular). Trabajo constantemente para escribir código escalable y optimizado.",
      techTitle: "Tecnologías con las que trabajo:",
    },
    projects: {
      title: "Proyectos",
      items: [
        {
          title: "Nexus",
          description: "Asistente de escritorio en Python. Permite comandos de voz, uso de WhatsApp Web y consultas a un modelo local usando Ollama.",
          code: "https://github.com/Yhorx/nexus-ia",
          image: `${basePath}/images/nexus.png`
        },
        {
          title: "GifApp",
          description: "Aplicación web para visualizar y buscar GIFs consumiendo la API de GIPHY.",
          code: "https://github.com/Yhorx/GifApp",
          url: "https://gif-app-orpin.vercel.app/",
          image: `${basePath}/images/gifapp.png`
        },
        {
          title: "Witube",
          description: "Aplicación de Android para descargar videos y audios de YouTube usando yt-dlp.",
          code: "https://github.com/Yhorx/Witube/releases/tag/v1.0.0-alpha",
          image: `${basePath}/images/witube.png`
        },
        {
          title: "Centinela",
          description: "Centinela es una aplicación diseñada para automatizar la gestión y el seguimiento de las finanzas personales a través de notificación push.(En desarrollo)",
          code: "https://github.com/Yhorx/Centinela",
          image: `${basePath}/images/centinela.png`
        },
      ],
    },
    contact: {
      title: "Contacto",
      description: "Actualmente busco seguir fortaleciendo mis conocimientos en frontend y backend. Si tienes algún proyecto o pregunta, no dudes en escribirme.",
      namePlaceholder: "Nombre",
      emailPlaceholder: "Email",
      messagePlaceholder: "Escribe tu mensaje",
      button: "Enviar",
      successToast: "Enviado",
      destination: "Destinatario",
      captchaRequiredToast: "Completa el captcha antes de enviar."
    },
    footer: {
      madeWith: `© ${date.getFullYear().toString()}`,
    },
  },
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, my name is",
      role: "Software Developer",
      description: "Focused on web and Android apps. Integrating REST APIs, local AI models, and Docker deployments.",
    },
    about: {
      title: "About Me",
      p1: "I am a Software Developer focused on building robust web and mobile applications. My experience ranges from designing smooth frontend architectures to implementing efficient backend services.",
      p2: "I am passionate about integrating modern technologies into my projects, developing desktop assistants powered by local AI (Ollama), Android applications (Kotlin), and web platforms (TypeScript/Angular). I constantly strive to write scalable and optimized code.",
      techTitle: "Technologies I work with:",
    },
    projects: {
      title: "Projects",
      items: [
        {
          title: "Nexus",
          description: "Desktop assistant in Python. Allows voice commands, WhatsApp Web usage, and queries to a local model using Ollama.",
          code: "https://github.com/Yhorx/nexus-ia",
          image: `${basePath}/images/nexus.png`
        },
        {
          title: "GifApp",
          description: "Web application to view and search GIFs consuming the GIPHY API.",
          code: "https://github.com/Yhorx/GifApp",
          url: "https://gif-app-orpin.vercel.app/",
          image: `${basePath}/images/gifapp.png`
        },
        {
          title: "Witube",
          description: "Android application to download YouTube videos and audio using yt-dlp.",
          code: "https://github.com/Yhorx/Witube/releases/tag/v1.0.0-alpha",
          image: `${basePath}/images/witube.png`
        },
        {
          title: "Centinela",
          description: "Centinela is a mobile application designed to automate the management and tracking of personal finances via push notifications.(in development)",
          code: "https://github.com/Yhorx/Centinela",
          image: `${basePath}/images/centinela.png`
        },
      ],
    },
    contact: {
      title: "Contact",
      description: "I'm currently looking to strengthen my frontend and backend skills. If you have a project or question, feel free to contact me.",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Write your message",
      button: "Send",
      successToast: "Sent",
      destination: "Destination",
      captchaRequiredToast: "Complete the captcha before submitting."
    },
    footer: {
      madeWith: `© ${date.getFullYear().toString()}`,
    },

  },
};

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      setLanguage(browserLang === "es" ? "es" : "en");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
