"use client";

import { useLanguage } from "@/components/language-provider";

interface UrlSkills {
  name: string;
  url: string;
}


const skills: UrlSkills[] = [
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
  },
  {
    name: "React",
    url: "https://react.dev/learn",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/docs",
  },
  {
    name: "HTML/CSS",
    url: "https://developer.mozilla.org/docs/Web",
  },
  {
    name: "Postgres",
    url: "https://www.postgresql.org/docs/",
  },
  {
    name: "Docker",
    url: "https://docs.docker.com/get-started/docker-overview/",
  },
  {
    name: "Express",
    url: "https://expressjs.com/en/5x/starter/hello-world/",
  },
  {
    name: "Git",
    url: "https://git-scm.com/about",
  },
  {
    name: "Angular",
    url: "https://angular.dev/overview",
  },
  {
    name: "Python",
    url: "https://www.python.org/doc/",
  },
  {
    name: "Kotlin",
    url: "https://kotlinlang.org/docs/home.html",
  },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 scroll-mt-24">
      <div className="max-w-3xl mx-auto liquid-glass p-8 md:p-12 rounded-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-4">
          <span className="text-primary font-mono text-2xl">//</span> {t.about.title}
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-muted-foreground mb-12">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            {t.about.techTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <a
                key={skill.name}
                href={skill.url}
                className="px-3 py-1 text-sm hover:scale-110 transition duration-200 ease-in-out font-mono text-primary bg-primary/10 border border-primary/20 rounded-full"
              >
                {skill.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
