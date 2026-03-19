'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Adds/removes CSS class 'visible' on elements with class 'reveal'.
 * No heavy libraries — pure browser API.
 */
export function useScrollReveal(options?: IntersectionObserverInit) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Once revealed, unobserve for performance
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    )

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [options])
}

/**
 * Single element ref-based reveal.
 */
export function useRevealRef<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return ref
}
