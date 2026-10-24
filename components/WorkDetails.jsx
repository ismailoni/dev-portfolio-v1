'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { BsArrowUpRight, BsGithub } from 'react-icons/bs'
import { projects } from '@/lib/data'
import { ui, useUI } from '@/lib/store'

const chip = 'rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-accent hover:bg-accent hover:text-primary'

// Dense text (responsibilities, full-size screenshots) lives in the DOM where it's easiest to read,
// select and navigate. The 3D "Details" button / screenshot click opens it.
export default function WorkDetails() {
  const { project: index } = useUI()
  const project = index === null ? null : projects[index]
  const [lightbox, setLightbox] = useState(null) // { index }
  const closeRef = useRef(null)

  const close = useCallback(() => {
    setLightbox(null)
    ui.set({ project: null })
  }, [])

  // Keyboard: Esc closes (lightbox first), arrows page through the lightbox
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        lightbox ? setLightbox(null) : close()
      } else if (lightbox && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault()
        const n = project.gallery.length
        const d = e.key === 'ArrowRight' ? 1 : -1
        setLightbox((cur) => ({ index: (cur.index + d + n) % n }))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, lightbox, close])

  useEffect(() => {
    if (project) closeRef.current?.focus()
  }, [project])

  // don't re-open a stale drawer when the visitor travels back to this station
  useEffect(() => () => ui.set({ project: null }), [])

  const shot = project && lightbox ? project.gallery[lightbox.index] : null

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            key="backdrop"
            className="pointer-events-auto fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} details`}
              className="absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden border-l border-white/10 bg-[#0b1020]/95 shadow-2xl md:w-[560px]"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
              exit={{ x: 80, opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent">
                    {project.num} · {project.category}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold leading-tight">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{project.role}</p>
                </div>
                <button ref={closeRef} type="button" onClick={close} className={chip}>
                  Close
                </button>
              </div>

              <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
                <p className="text-white/70">{project.description}</p>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/45">What I did</p>
                  <ul className="space-y-2 text-sm text-white/75">
                    {project.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/85">
                      {s}
                    </li>
                  ))}
                </ul>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/45">Screenshots · {project.gallery.length}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((g, gi) => (
                      <button
                        key={g.src}
                        type="button"
                        onClick={() => setLightbox({ index: gi })}
                        className="group relative h-28 overflow-hidden rounded-xl border border-white/10 bg-black/30"
                        aria-label={`Open screenshot: ${g.alt}`}
                      >
                        <Image
                          src={g.src}
                          alt={g.alt}
                          fill
                          sizes="260px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: g.focus }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-white/10 px-6 py-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-accent-hover"
                >
                  Live project <BsArrowUpRight />
                </a>
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${chip} flex items-center gap-2`}>
                    <BsGithub /> GitHub
                  </a>
                ) : (
                  <span className="text-sm text-white/45">Repository is private</span>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {shot && (
        <div
          className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} preview`}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0e1221] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Preview</p>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              </div>
              <button type="button" onClick={() => setLightbox(null)} className={chip}>
                Close
              </button>
            </div>

            <div className="relative h-[70vh] w-full bg-black/30">
              <Image src={shot.src} fill sizes="100vw" className="object-contain" alt={shot.alt} priority />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">{shot.label}</p>
                <p className="text-sm text-white/70">{shot.alt}</p>
              </div>
              <div className="flex items-center gap-3">
                {[
                  ['Prev', -1],
                  ['Next', 1],
                ].map(([label, d]) => (
                  <button
                    key={label}
                    type="button"
                    className={chip}
                    onClick={() => {
                      const n = project.gallery.length
                      setLightbox((cur) => ({ index: (cur.index + d + n) % n }))
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
