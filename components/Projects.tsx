'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Images, Star, X } from 'lucide-react'
import { projects, type Project } from '@/lib/projects'
import { SectionTitle } from './About'
import { useLanguage } from '@/lib/LanguageContext'
import { ui, type Lang } from '@/lib/i18n'
import { assetPath } from '@/lib/assetPath'

type ImageMap = Record<string, string[]>

const ALL = '__all__'

export default function Projects({ images }: { images: ImageMap }) {
  const { lang } = useLanguage()
  const t = ui[lang].projects
  const [filter, setFilter] = useState(ALL)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Featured first, then the rest, keeping the data file's order inside each group
  const ordered = useMemo(
    () => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
    []
  )
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [])
  const visible = filter === ALL ? ordered : ordered.filter((p) => p.category === filter)
  const openProject = projects.find((p) => p.slug === openSlug) ?? null

  const open = (slug: string, el: HTMLElement) => {
    triggerRef.current = el
    setOpenSlug(slug)
  }
  const close = useCallback(() => {
    setOpenSlug(null)
    // Give focus back to the card that opened the dialog
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <section id="projects" className="section-alt py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle label={t.label} title={t.title} />
        <p className="text-slate-400 text-sm mt-3">
          {lang === 'fr'
            ? `${projects.length} projets · cliquez sur une carte pour voir les captures et le détail`
            : `${projects.length} projects · click a card to see screenshots and details`}
        </p>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-2 mt-8"
          role="group"
          aria-label={lang === 'fr' ? 'Filtrer par catégorie' : 'Filter by category'}
        >
          {[ALL, ...categories].map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`relative isolate min-h-[40px] px-4 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? 'text-white border-violet-400/60'
                    : 'text-slate-300 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-violet-600/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {c === ALL ? (lang === 'fr' ? 'Tous' : 'All') : c}
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={p} images={images[p.slug] ?? []} lang={lang} onOpen={open} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="text-center mt-14">
          <a
            href="https://github.com/SHRaton"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <GitHubIcon className="w-4 h-4" />
            {lang === 'fr' ? 'Voir tous mes repos GitHub' : 'View all my GitHub repos'}
          </a>
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectDialog
            key={openProject.slug}
            project={openProject}
            images={images[openProject.slug] ?? []}
            lang={lang}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─── Card ─────────────────────────────────────────────────────────────────── */

function ProjectCard({
  project: p,
  images,
  lang,
  onOpen,
}: {
  project: Project
  images: string[]
  lang: Lang
  onOpen: (slug: string, el: HTMLElement) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [frame, setFrame] = useState(0)
  const reduceMotion = useReducedMotion()

  // Flip through the screenshots while the card is hovered
  useEffect(() => {
    if (!hovered || images.length < 2 || reduceMotion) {
      setFrame(0)
      return
    }
    const id = window.setInterval(() => setFrame((f) => (f + 1) % images.length), 1100)
    return () => window.clearInterval(id)
  }, [hovered, images.length, reduceMotion])

  const description = lang === 'fr' ? p.description : p.descriptionEn

  return (
    <button
      type="button"
      onClick={(e) => onOpen(p.slug, e.currentTarget)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-haspopup="dialog"
      className="spotlight group w-full h-full text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-violet-400/40 transition-colors flex flex-col"
    >
      <motion.span layoutId={`cover-${p.slug}`} className="relative block w-full aspect-video overflow-hidden">
        {images.length > 0 ? (
          images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={assetPath(src)}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 group-hover:scale-[1.04] ${
                i === frame ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : (
          <CoverFallback project={p} />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-[#0e0e1a] via-transparent to-transparent" />

        {p.featured && (
          <span className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-black/50 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded-full font-mono backdrop-blur-sm">
            <Star className="w-3 h-3 fill-current" aria-hidden />
            Featured
          </span>
        )}
        {images.length > 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-xs bg-black/50 border border-white/15 text-slate-200 px-2 py-0.5 rounded-full font-mono backdrop-blur-sm">
            <Images className="w-3 h-3" aria-hidden />
            {images.length}
          </span>
        )}
        {images.length > 1 && (
          <span
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden
          >
            {images.map((src, i) => (
              <span key={src} className={`h-1 rounded-full transition-all ${i === frame ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} />
            ))}
          </span>
        )}
      </motion.span>

      <span className="relative z-[2] flex flex-col gap-2 p-5 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-white leading-tight">{p.title}</span>
          <span className="text-xs font-mono tracking-wider uppercase shrink-0" style={{ color: p.languageColor }}>
            {p.category}
          </span>
        </span>
        <span className="text-sm text-slate-300 leading-relaxed line-clamp-2">{description}</span>
        <span className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {p.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-mono bg-white/[0.07] border border-white/10 text-slate-300">
              {tag}
            </span>
          ))}
          {p.tags.length > 3 && <span className="text-xs text-slate-400 self-center">+{p.tags.length - 3}</span>}
        </span>
      </span>
    </button>
  )
}

/** Shown until real screenshots are added to public/projects/<slug>/ */
function CoverFallback({ project: p, large = false }: { project: Project; large?: boolean }) {
  const Icon = p.icon
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at 75% 20%, ${p.languageColor}45 0%, transparent 55%),
                     radial-gradient(ellipse at 20% 85%, ${p.languageColor}28 0%, transparent 50%),
                     #0b0b16`,
      }}
    >
      <span
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <span
        className={`relative flex items-center justify-center rounded-3xl border border-white/10 ${large ? 'w-28 h-28' : 'w-20 h-20'}`}
        style={{ background: `${p.languageColor}22`, color: p.languageColor }}
      >
        <Icon className={large ? 'w-14 h-14' : 'w-10 h-10'} strokeWidth={1.5} aria-hidden />
      </span>
    </span>
  )
}

/* ─── Dialog ───────────────────────────────────────────────────────────────── */

function ProjectDialog({
  project: p,
  images,
  lang,
  onClose,
}: {
  project: Project
  images: string[]
  lang: Lang
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const n = images.length

  const go = useCallback(
    (delta: number) => {
      if (n < 2) return
      setDirection(delta)
      setIndex((i) => (i + delta + n) % n)
    },
    [n]
  )

  // Scroll lock + initial focus
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Esc closes, arrows browse, Tab stays inside the dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  const longDesc = lang === 'fr' ? p.longDesc : p.longDescEn
  const titleId = `project-${p.slug}-title`

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#0d0d18] shadow-2xl shadow-violet-950/50"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-slate-200 hover:text-white hover:border-violet-400/60 transition-colors"
        >
          <X className="w-5 h-5" aria-hidden />
        </button>

        {/* Gallery */}
        <motion.div layoutId={`cover-${p.slug}`} className="relative aspect-video bg-black overflow-hidden rounded-t-3xl">
          {n > 0 ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={images[index]}
                src={assetPath(images[index])}
                alt={`${p.title} — ${lang === 'fr' ? 'capture' : 'screenshot'} ${index + 1}/${n}`}
                className="absolute inset-0 w-full h-full object-contain"
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? '12%' : '-12%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? '-12%' : '12%', opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={n > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
              />
            </AnimatePresence>
          ) : (
            <>
              <CoverFallback project={p} large />
              <span className="absolute bottom-4 inset-x-0 text-center text-sm text-slate-300">
                {lang === 'fr' ? 'Captures bientôt disponibles' : 'Screenshots coming soon'}
              </span>
            </>
          )}

          {n > 1 && (
            <>
              <GalleryArrow side="left" label={lang === 'fr' ? 'Image précédente' : 'Previous image'} onClick={() => go(-1)} />
              <GalleryArrow side="right" label={lang === 'fr' ? 'Image suivante' : 'Next image'} onClick={() => go(1)} />
              <span
                className="absolute bottom-3 right-3 z-10 text-xs font-mono bg-black/60 border border-white/15 text-slate-200 px-2 py-0.5 rounded-full"
                aria-live="polite"
              >
                {index + 1} / {n}
              </span>
            </>
          )}
        </motion.div>

        {/* Thumbnails */}
        {n > 1 && (
          <div className="flex gap-2 px-5 sm:px-8 pt-4 overflow-x-auto" role="group" aria-label={lang === 'fr' ? 'Miniatures' : 'Thumbnails'}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Image ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`relative shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  i === index ? 'border-violet-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assetPath(src)} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="p-5 sm:p-8 grid md:grid-cols-[1fr_auto] gap-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 id={titleId} className="text-2xl sm:text-3xl font-bold text-white">
                {p.title}
              </h3>
              <span
                className="text-xs font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border"
                style={{ color: p.languageColor, borderColor: `${p.languageColor}66` }}
              >
                {p.category}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed mt-4">{longDesc}</p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {p.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/[0.07] border border-white/10 text-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex md:flex-col gap-3 md:min-w-[200px] flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-mono w-full">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.languageColor }} aria-hidden />
              {p.language}
            </div>
            {p.homepageUrl && (
              <a href={p.homepageUrl} target="_blank" rel="noopener noreferrer" className="btn-glow justify-center">
                <ExternalLink className="w-4 h-4" aria-hidden />
                {lang === 'fr' ? 'Voir le site' : 'Visit site'}
              </a>
            )}
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <GitHubIcon className="w-4 h-4" />
              {lang === 'fr' ? 'Code source' : 'Source code'}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function GalleryArrow({ side, label, onClick }: { side: 'left' | 'right'; label: string; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-3' : 'right-3'} z-10 w-11 h-11 rounded-full bg-black/55 border border-white/15 flex items-center justify-center text-white hover:bg-violet-600/60 hover:border-violet-400/60 transition-colors`}
    >
      <Icon className="w-5 h-5" aria-hidden />
    </button>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
