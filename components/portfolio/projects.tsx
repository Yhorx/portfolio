"use client";

import { ExternalLink, Github, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import { useState } from "react";

const projectTech = [
  ["Python", "Tkinter", "Ollama"],
  ["TypesScript", "Angular", "GIPHY API"],
  ["Kotlin", "Docker", "Render"],
];

export function Projects() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 px-6 bg-card/10 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 flex items-center gap-4 px-6 md:px-0">
          <span className="text-primary font-mono text-2xl">//</span> {t.projects.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 px-6 md:px-0">
          {t.projects.items.map((project, index) => (
            <div
              key={index}
              className="liquid-glass rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                {project.description}
              </p>
              <div
                className="relative z-10 w-full h-48 sm:h-56 mb-6 rounded-xl overflow-hidden border border-border bg-black/5 dark:bg-white/5 shadow-lg shadow-black/20 group-hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex items-center justify-between mt-auto mb-6">
                <div className="flex flex-wrap gap-2">
                  {projectTech[index]?.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 liquid-glass rounded-full"
                    aria-label={`${project.title} GitHub`}
                  >
                    <Github className="h-6 w-6 pointer-events-none" />
                  </Link>
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-2 liquid-glass rounded-full"
                      aria-label={`${project.title} demo`}
                    >
                      <ExternalLink className="h-6 w-6 pointer-events-none" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
            <button
              className="absolute -top-12 right-0 md:-right-12 md:top-0 z-110 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Cerrar imagen"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt="Vista ampliada"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
