"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#F5E6C8]/95 shadow-sm backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Steve's Trees"
              width={130}
              height={48}
              className="h-auto w-[110px] sm:w-[130px]"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 sm:flex">
            <a href="#services" className="text-sm font-semibold text-[#1A4A32] transition hover:text-[#C9A227]">
              Services
            </a>
            <a href="#gallery" className="text-sm font-semibold text-[#1A4A32] transition hover:text-[#C9A227]">
              Work
            </a>
            <a href="#quote" className="text-sm font-semibold text-[#1A4A32] transition hover:text-[#C9A227]">
              Quote
            </a>
            <a
              href="tel:5406426612"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A4A32] px-4 py-2 text-sm font-bold text-[#F5E6C8] transition hover:bg-[#2E7D4A]"
            >
              <Phone size={16} />
              (540) 642-6612
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="text-[#1A4A32] sm:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="absolute left-0 right-0 top-full border-t border-[#1A4A32]/10 bg-[#F5E6C8] px-6 py-5 shadow-lg sm:hidden">
            <div className="flex flex-col gap-4">
              <a href="#services" onClick={() => setOpen(false)} className="text-base font-semibold text-[#1A4A32]">
                Services
              </a>
              <a href="#gallery" onClick={() => setOpen(false)} className="text-base font-semibold text-[#1A4A32]">
                Work
              </a>
              <a href="#quote" onClick={() => setOpen(false)} className="text-base font-semibold text-[#1A4A32]">
                Quote
              </a>
              <a
                href="tel:5406426612"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A4A32] px-5 py-3 text-sm font-bold text-[#F5E6C8]"
              >
                <Phone size={18} />
                (540) 642-6612
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Sticky click-to-call bar (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A4A32] px-4 py-3 shadow-lg sm:hidden">
        <a
          href="tel:5406426612"
          className="flex items-center justify-center gap-2 rounded-full bg-[#F5E6C8] px-5 py-3 text-sm font-bold text-[#1A4A32]"
        >
          <Phone size={18} />
          Call Steve: (540) 642-6612
        </a>
      </div>
    </>
  );
}
