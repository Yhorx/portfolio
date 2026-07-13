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
    <section id="about" className="py-24 px-6">
      <div className="max-w-xl mx-auto liquid-glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-foreground mb-6">
          <span className="text-primary font-mono">//</span> {t.about.title}
        </h2>
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">{t.about.techTitle}</p>
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
