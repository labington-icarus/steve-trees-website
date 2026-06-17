"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ChevronDown, BadgeCheck, Shield, MapPin, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<SVGSVGElement>(null);
  const trunkGroupRef = useRef<SVGGElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trunk = trunkGroupRef.current;
    const reveal = revealRef.current;
    const dust = dustRef.current;
    if (!section || !trunk || !reveal || !dust) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Tree fall animation
      tl.to(
        trunk,
        {
          rotation: 90,
          transformOrigin: "50% 100%",
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // Dust burst at impact (60-90% progress)
      tl.fromTo(
        dust,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" },
        0.65
      );
      tl.to(dust, { opacity: 0, scale: 1.2, duration: 0.25 }, 0.85);

      // Reveal logo/text after tree falls
      tl.fromTo(
        reveal,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5E6C8] via-[#efe2c3] to-[#e8dcc0]"
    >
      {/* Background texture hint */}
      <div className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 80%, rgba(46,125,74,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Tree SVG */}
      <svg
        ref={treeRef}
        viewBox="0 0 400 520"
        className="relative z-10 w-[260px] sm:w-[320px] md:w-[380px]"
        aria-label="Animated tree falling"
      >
        <g ref={trunkGroupRef} style={{ transformOrigin: "200px 500px" }}>
          {/* Trunk */}
          <path
            d="M185 500 L195 320 L205 320 L215 500 Z"
            fill="#5D4037"
          />
          {/* Root flare */}
          <path
            d="M170 500 Q185 470 195 500 L205 500 Q215 470 230 500 Z"
            fill="#4E342E"
          />
          {/* Foliage layers */}
          <g fill="#2E7D4A">
            <circle cx="200" cy="150" r="80" />
            <circle cx="150" cy="220" r="70" />
            <circle cx="250" cy="220" r="70" />
            <circle cx="200" cy="260" r="75" />
            <circle cx="130" cy="290" r="55" />
            <circle cx="270" cy="290" r="55" />
            <circle cx="200" cy="330" r="60" />
          </g>
          {/* Foliage detail */}
          <g fill="#1A4A32" opacity="0.35">
            <circle cx="185" cy="170" r="18" />
            <circle cx="225" cy="190" r="22" />
            <circle cx="200" cy="240" r="20" />
            <circle cx="160" cy="280" r="16" />
            <circle cx="240" cy="290" r="18" />
          </g>
        </g>
      </svg>

      {/* Ground line */}
      <div className="absolute bottom-[14vh] left-0 right-0 h-[2px] bg-[#2E7D4A]/30" />

      {/* Dust burst */}
      <div
        ref={dustRef}
        className="pointer-events-none absolute bottom-[10vh] left-1/2 z-20 w-40 -translate-x-1/2"
      >
        <svg viewBox="0 0 200 100" className="w-full" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={30 + Math.random() * 140}
              cy={50 + Math.random() * 40}
              r={4 + Math.random() * 10}
              fill="#C9A227"
              opacity={0.35 + Math.random() * 0.35}
            />
          ))}
        </svg>
      </div>

      {/* Revealed content */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="Steve's Trees logo"
            width={220}
            height={80}
            className="h-auto w-[180px] sm:w-[220px] md:w-[260px]"
            priority
          />
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227] sm:text-sm">
          Tree Removal & Hardscaping
        </p>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] text-[#1A4A32] sm:text-5xl md:text-6xl">
          Fredericksburg's trusted tree crew.
        </h1>

        <p className="mt-4 max-w-lg text-base text-[#1A4A32]/80 sm:text-lg">
          Tree trimming, removal, stump grinding, and hardscaping — done safe, done fast, done right.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="tel:5406426612"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1A4A32] px-7 py-3.5 text-sm font-bold text-[#F5E6C8] shadow-lg transition hover:bg-[#2E7D4A] active:scale-95"
          >
            <Phone size={18} />
            Call (540) 642-6612
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1A4A32] px-7 py-3.5 text-sm font-bold text-[#1A4A32] transition hover:bg-[#1A4A32] hover:text-[#F5E6C8]"
          >
            Free Quote
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#1A4A32]/70 sm:text-sm">
          <span className="inline-flex items-center gap-1">
            <Shield size={14} /> Insured
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} /> Local to Fredericksburg
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck size={14} /> Free Estimates
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-[#1A4A32]/50">
        <ChevronDown className="animate-bounce" size={24} />
      </div>
    </section>
  );
}
