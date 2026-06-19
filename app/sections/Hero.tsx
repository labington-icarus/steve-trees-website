"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Shield, Clock, MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

const FRAME_COUNT = 61;

function frameSrc(i: number) {
  return imgSrc(`/frames-scroll/frame_${String(i).padStart(3, "0")}.webp`);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readyCount, setReadyCount] = useState(0);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const readyRef = useRef(false);

  const MIN_READY = 15; // Start animating once first 15 frames are loaded

  // Preload frames into Image objects
  useEffect(() => {
    let mounted = true;
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onFrameLoad = () => {
      if (!mounted) return;
      loadedCount++;
      setReadyCount(loadedCount);
      if (loadedCount >= MIN_READY && !readyRef.current) {
        readyRef.current = true;
      }
      if (loadedCount >= FRAME_COUNT) {
        framesRef.current = frames;
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.decoding = i < MIN_READY ? "sync" : "async";
      img.loading = i < MIN_READY ? "eager" : "lazy";
      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      frames.push(img);
    }
    framesRef.current = frames;

    return () => {
      mounted = false;
    };
  }, []);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (canvas.width !== Math.floor(cssW * dpr) || canvas.height !== Math.floor(cssH * dpr)) {
        canvas.width = Math.floor(cssW * dpr);
        canvas.height = Math.floor(cssH * dpr);
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      const frameIndex = frameIndexRef.current;
      const img = framesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssW = canvas.clientWidth;
        const cssH = canvas.clientHeight;
        const cw = Math.floor(cssW * dpr);
        const ch = Math.floor(cssH * dpr);

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = cssW / cssH;

        let drawW, drawH, drawX, drawY;
        const isMobile = cssW < 768;

        if (isMobile) {
          // Mobile: fill screen, crop sides
          const targetAspect = cssW / cssH;
          if (imgAspect > targetAspect) {
            drawH = ch;
            drawW = Math.round(ch * imgAspect);
            drawX = Math.round((cw - drawW) / 2);
            drawY = 0;
          } else {
            drawW = cw;
            drawH = Math.round(cw / imgAspect);
            drawX = 0;
            drawY = Math.round((ch - drawH) / 2);
          }
        } else if (canvasAspect > imgAspect) {
          drawH = ch;
          drawW = Math.round(ch * imgAspect);
          drawX = Math.round((cw - drawW) / 2);
          drawY = 0;
        } else {
          drawW = cw;
          drawH = Math.round(cw / imgAspect);
          drawX = 0;
          drawY = Math.round((ch - drawH) / 2);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, drawY, drawW, drawH);
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [readyCount]);

  // Scroll handler
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const total = rect.height - viewportH;
        const raw = Math.min(1, Math.max(0, -rect.top / total));
        setScrollProgress(raw);
        frameIndexRef.current = Math.min(FRAME_COUNT - 1, Math.floor(raw * FRAME_COUNT));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Logo reveal curve
  const logoReveal = Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.55));
  const logoScale = 0.85 + logoReveal * 0.35;

  return (
    <>
      <section ref={sectionRef} className="relative h-[300vh] bg-forest">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black relative">
          {/* Poster image shown immediately while frames load */}
          <img
            src={imgSrc("/frame-poster.webp")}
            alt="Tree removal in progress"
            className="absolute inset-0 w-full h-full object-cover md:object-contain transition-opacity duration-500"
            style={{ opacity: readyRef.current ? 0 : 1, pointerEvents: "none" }}
            decoding="sync"
            loading="eager"
          />

          <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
          style={{ opacity: readyRef.current ? 1 : 0, pointerEvents: "none" }}
          />

          {/* Darkening gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest/30 via-transparent to-forest/70 pointer-events-none" />

          {/* Hidden eager images force browser to fetch critical frames in HTML parse, before JS mounts */}
          <div className="sr-only" aria-hidden="true">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <img
                key={i}
                src={frameSrc(i - 1)}
                alt=""
                loading="eager"
                decoding="async"
                width="1"
                height="1"
              />
            ))}
          </div>

          {/* Loading state */}
          {readyCount < MIN_READY && (
            <div className="absolute inset-0 flex items-center justify-center bg-forest/50 text-white/60 text-sm font-semibold pointer-events-none">
              Loading...
            </div>
          )}

          {/* Logo reveal */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: logoReveal,
              transform: `scale(${logoScale})`,
              transition: "none",
            }}
          >
            <div className="relative w-[72vw] max-w-[560px] md:max-w-[680px]">
              <Image
                src={imgSrc("/logo-hero-t.png")}
                alt="Steve's Trees"
                width={680}
                height={280}
                className="w-full h-auto drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/80 transition-opacity duration-500"
            style={{ opacity: scrollProgress > 0.15 ? 0 : 1 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              Scroll to see it fall
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </div>
        </div>
      </section>

      <section className="relative bg-forest py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Tree removal, trimming, stump grinding, and hardscaping in Fredericksburg and surrounding areas. Done safe, clean, and on time.
          </p>

          <div className="mb-10">
            <p className="text-3xl md:text-5xl font-extrabold text-lime tracking-tight">
              10% MILITARY & REFERRAL DISCOUNT
            </p>
          </div>
          <a
            href="tel:5406426612"
            className="inline-flex items-center justify-center gap-2 bg-lime text-ink px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition"
          >
            <Phone size={20} />
            Call (540) 642-6612
          </a>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm font-semibold text-white/80">
            <span className="inline-flex items-center gap-2">
              <Shield size={18} className="text-lime" /> Insured Crew
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={18} className="text-lime" /> Fast Response
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18} className="text-lime" /> Local to Fredericksburg
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
