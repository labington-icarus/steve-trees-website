"use client";

import { Phone, ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc("/job5.jpg")}
          alt="Tree removal crew working over a house in Fredericksburg, VA"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-lime text-ink px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>$100 Off Tree Services — Mention This Site</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            Professional Tree Care in Fredericksburg
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-xl">
            Tree removal, trimming, stump grinding, and hardscaping done safe, clean, and on time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="tel:5406426612"
              className="inline-flex items-center justify-center gap-2 bg-lime text-ink px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition"
            >
              <Phone size={20} />
              Call (540) 642-6612
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition"
            >
              Get a Free Estimate
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-white/80">
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
      </div>
    </section>
  );
}
