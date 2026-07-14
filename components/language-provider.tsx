"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "es" | "en";

const date = new Date()

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
      p1: "Soy estudiante de Ingeniería de Sistemas en la Universidad Privada del Norte. Me enfoco en desarrollar aplicaciones web y Android, buscando siempre mejorar mis conocimientos en arquitectura frontend y backend.",
      p2: "He trabajado con Python, Kotlin, Node.js y bases de datos, desarrollando soluciones que integran IA local y APIs REST.",
      techTitle: "Tecnologías con las que trabajo:",
    },
    projects: {
      title: "Proyectos",
      items: [
        {
          title: "Nexus IA",
          description: "Asistente de escritorio en Python. Permite comandos de voz, uso de WhatsApp Web y consultas a un modelo local usando Ollama.",
          code: "https://github.com/Yhorx/nexus-ia",
          image: "/images/nexus.png"
        },
        {
          title: "Buscador de GIFs",
          description: "Aplicación web para visualizar y buscar GIFs consumiendo la API de GIPHY.",
          code: "https://github.com/Yhorx/GifApp",
          url: "https://gif-app-orpin.vercel.app/",
          image: "/images/gifapp.png"
        },
        {
          title: "Witube",
          description: "Aplicación de Android para descargar videos y audios de YouTube usando yt-dlp.",
          code: "https://github.com/Yhorx/Witube",
          image: "/images/witube.png"
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
      p1: "I'm a Systems Engineering student at Universidad Privada del Norte. I focus on developing web and Android applications, always looking to improve my frontend and backend architecture skills.",
      p2: "I have worked with Python, Kotlin, Node.js, and databases, developing solutions that integrate local AI and REST APIs.",
      techTitle: "Technologies I work with:",
    },
    projects: {
      title: "Projects",
      items: [
        {
          title: "Nexus",
          description: "Desktop assistant in Python. Allows voice commands, WhatsApp Web usage, and queries to a local model using Ollama.",
          code: "https://github.com/Yhorx/nexus-ia",
          image: "/images/nexus.png"
        },
        {
          title: "GifApp",
          description: "Web application to view and search GIFs consuming the GIPHY API.",
          code: "https://github.com/Yhorx/GifApp",
          url: "https://gif-app-orpin.vercel.app/",
          image: "/images/gifapp.png"
        },
        {
          title: "Witube",
          description: "Android application to download YouTube videos and audio using yt-dlp.",
          code: "https://github.com/Yhorx/Witube",
          image: "/images/witube.png"
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
