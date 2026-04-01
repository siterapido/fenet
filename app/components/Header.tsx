"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/noticias", label: "Notícias" },
  { href: "/sobre", label: "Sobre" },
  { href: "/agenda", label: "Agenda" },
  { href: "/documentos", label: "Documentos" },
  { href: "/diretoria", label: "Diretoria" },
  { href: "/contato", label: "Contato" },
];

const Header = memo(function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/88 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-[#E0E0E0]/60"
            : "bg-white border-b border-[#E0E0E0]"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-fenet-horizontal.png"
              alt="FENET"
              width={140}
              height={48}
              className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm font-medium text-[#555555] hover:text-[#1A1A1A] transition-colors duration-150 group"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F4141A] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#F4141A]/25 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className="hidden md:inline-flex items-center bg-[#F4141A] hover:bg-[#C01015] text-white text-[13px] font-bold px-5 py-2.5 rounded transition-all duration-200 hover:shadow-[0_4px_14px_rgba(244,20,26,0.35)] hover:-translate-y-px active:translate-y-0 tracking-wide uppercase"
            >
              Filie-se
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block w-[22px] h-[2px] bg-[#1A1A1A] rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-[22px] h-[2px] bg-[#1A1A1A] rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block w-[22px] h-[2px] bg-[#1A1A1A] rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm md:hidden"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.8 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-[68px] border-b border-[#E0E0E0]">
                <Image
                  src="/logo-fenet-horizontal.png"
                  alt="FENET"
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#999999] hover:text-[#1A1A1A] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col px-3 py-5 gap-0.5 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.12, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors duration-150 ${
                          isActive
                            ? "bg-[#FFF0F0] text-[#F4141A] font-semibold"
                            : "text-[#555555] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="px-5 pb-8 pt-3">
                <Link
                  href="/contato"
                  className="block w-full text-center bg-[#F4141A] hover:bg-[#C01015] text-white font-bold py-3.5 rounded transition-colors duration-200 tracking-wide uppercase text-sm"
                >
                  Filie-se
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Header;
