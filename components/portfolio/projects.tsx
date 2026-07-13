"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const projectTech = [
  ["Python", "Tkinter", "Ollama", "WhatsApp Web"],
  ["JavaScript", "React", "GIPHY API"],
  ["Kotlin", "Android", "yt-dlp", "Docker", "Render"],
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 bg-card/10">
      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-foreground mb-8">
          <span className="text-primary font-mono">//</span> {t.projects.title}
        </h2>
        <div className="space-y-6">
          {t.projects.items.map((project, index) => (
            <div
              key={project.title}
              className="p-5 rounded-lg liquid-glass transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)] dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  <Link
                    href="https://github.com/Yhorx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${project.title} GitHub`}
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                  {index < 2 && (
                    <Link
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${project.title} demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projectTech[index]?.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
