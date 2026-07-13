import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ParticlesBackground } from "@/components/portfolio/particles-background";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen">
      <ParticlesBackground />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
