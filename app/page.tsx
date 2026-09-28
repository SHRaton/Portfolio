import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Timeline from '@/components/Timeline'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { projects } from '@/lib/projects'
import { getProjectImages } from '@/lib/projectImages'

export default function Home() {
  // Read at build time: every image in public/projects/<slug>/ becomes part of that project's gallery
  const projectImages = getProjectImages(projects.map((p) => p.slug))

  return (
    <main id="main" className="relative z-10 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects images={projectImages} />
      <Contact />
      <Footer />
    </main>
  )
}
