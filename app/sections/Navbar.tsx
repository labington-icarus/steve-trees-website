"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center relative">
        <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          <a href="#services" className="hover:text-pine transition">Services</a>
          <a href="#work" className="hover:text-pine transition">Our Work</a>
          <a href="#why" className="hover:text-pine transition">Why Steve's</a>
          <a href="#area" className="hover:text-pine transition">Service Area</a>
          <a
            href="tel:5406426612"
            className="inline-flex items-center gap-2 bg-lime text-ink px-5 py-2.5 rounded-full font-bold hover:brightness-110 transition"
          >
            <Phone size={16} />
            (540) 642-6612
          </a>
        </div>

        <button
          className="lg:hidden text-forest absolute right-0 top-1/2 -translate-y-1/2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 absolute left-0 right-0 shadow-lg">
          <div className="flex flex-col gap-4 font-semibold">
            <a href="#services" onClick={() => setOpen(false)} className="hover:text-pine">Services</a>
            <a href="#work" onClick={() => setOpen(false)} className="hover:text-pine">Our Work</a>
            <a href="#why" onClick={() => setOpen(false)} className="hover:text-pine">Why Steve's</a>
            <a href="#area" onClick={() => setOpen(false)} className="hover:text-pine">Service Area</a>
            <a
              href="tel:5406426612"
              className="inline-flex items-center justify-center gap-2 bg-lime text-ink px-5 py-3 rounded-full font-bold"
            >
              <Phone size={16} />
              Call (540) 642-6612
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
