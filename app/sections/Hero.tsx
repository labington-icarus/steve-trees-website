"use client";

import { Phone, Shield, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-24 pb-32">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">
            Tree Removal & Hardscaping · Fredericksburg, VA
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Big trees.
            <br />
            <span className="text-pine">Safe</span> removal.
            <br />
            Clean yard.
          </h1>
          <p className="text-lg md:text-xl text-forest/80 max-w-lg mb-8 leading-relaxed">
            Steve's crew handles tree trimming, removals, stump grinding, and hardscaping across Fredericksburg and surrounding areas.
          </p>

          <a
            href="tel:5406426612"
            className="inline-flex justify-center items-center gap-2 bg-gold text-ink px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition"
          >
            <Phone size={20} />
            Call (540) 642-6612
          </a>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-forest/70 mt-8">
            <span className="inline-flex items-center gap-1.5">
              <Shield size={16} /> Insured
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} /> Fast Response
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} /> Free Estimates
            </span>
          </div>
        </div>

        <div className="relative hidden lg:block h-[70vh]">
          <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src="/job5.jpg"
              alt="Tree removal over a house in Fredericksburg, VA"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-forest/10">
            <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">Limited-Time Offer</p>
            <p className="text-xl font-extrabold text-forest">$100 Off Tree Services</p>
            <p className="text-sm text-forest/70">
              Mention this site when you call. Military & referral discounts also available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
