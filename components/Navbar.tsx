'use client'
import { useState, useEffect } from 'react'
import { DISCOVERY_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Pourquoi automatiser', href: '#why' },
  { label: 'Services',             href: '#services' },
  { label: 'Comment ça marche',   href: '#how' },
  { label: 'À propos',            href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4">

      {/* ── Pill navbar ── */}
      <nav
        className={`w-full max-w-[1100px] rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-se-navy/[0.97] backdrop-blur-[14px] shadow-[0_4px_24px_rgba(13,27,62,0.28)] border border-white/[0.08]'
            : 'bg-white/90 backdrop-blur-[12px] shadow-[0_2px_16px_rgba(0,0,0,0.08)] border border-gray-200/70'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-[64px]">

          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scrolled ? '/logo-blanc.png' : '/logo-noir.png'}
              alt="SalesExperienz"
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-[14px] px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-black/[0.06] ${
                  scrolled
                    ? 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                    : 'text-se-navy/80 hover:text-se-navy'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-flex items-center justify-center rounded-full px-5 py-2 text-[14px] font-medium font-body transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap ${
              scrolled
                ? 'bg-se-orange text-white hover:bg-se-orange-h hover:shadow-[0_6px_16px_rgba(232,98,26,0.4)]'
                : 'bg-se-navy text-white hover:bg-se-navy/80 hover:shadow-[0_6px_16px_rgba(13,27,62,0.25)]'
            }`}
          >
            Je veux accélérer ma croissance
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-se-navy'} ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-se-navy'} ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-se-navy'} ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — sous la pill */}
      <div
        className={`w-full max-w-[1100px] mt-2 overflow-hidden transition-all duration-300 rounded-2xl ${
          mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        } bg-se-navy/[0.98] backdrop-blur-[14px] border border-white/[0.08] shadow-[0_4px_24px_rgba(13,27,62,0.28)]`}
      >
        <div className="flex flex-col px-5 py-4 gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-body text-[15px] text-white/70 hover:text-white transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-se-orange text-white rounded-full px-6 py-3 text-[15px] font-medium font-body mt-1 hover:bg-se-orange-h"
          >
            Je veux accélérer ma croissance
          </a>
        </div>
      </div>

    </div>
  )
}
