"use client";

import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Steve's Trees"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <a href="#services" className="hover:text-gold transition">Services</a>
          <a href="#work" className="hover:text-gold transition">Work</a>
          <a
            href="tel:5406426612"
            className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full font-bold hover:bg-pine transition"
          >
            <Phone size={16} />
            Call (540) 642-6612
          </a>
        </div>

        <button
          className="md:hidden text-forest"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-forest/10 px-6 py-4">
          <a href="#services" className="block py-2 font-semibold" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#work" className="block py-2 font-semibold" onClick={() => setMobileOpen(false)}>Work</a>
          <a
            href="tel:5406426612"
            className="inline-flex items-center gap-2 mt-3 bg-forest text-cream px-5 py-3 rounded-full font-bold"
          >
            <Phone size={16} />
            Call (540) 642-6612
          </a>
        </div>
      )}
    </nav>
  );
}
