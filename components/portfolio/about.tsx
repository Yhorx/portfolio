"use client";

import { useLanguage } from "@/components/language-provider";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "HTML/CSS",
  "Tailwind CSS",
  "Node.js",
  "Git",
  "Angular",
  "Firebase"
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
              <span
                key={skill}
                className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
