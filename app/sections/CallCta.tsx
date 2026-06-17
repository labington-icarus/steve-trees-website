"use client";

import { Phone } from "lucide-react";

export default function CallCta() {
  return (
    <section id="quote" className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Ready?</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Call now for a free estimate</h2>
        <p className="text-lg text-forest/70 mb-8">
          Tell Steve what you need over the phone. Same-week response in Fredericksburg and surrounding areas.
        </p>

        <a
          href="tel:5406426612"
          className="inline-flex justify-center items-center gap-2 bg-gold text-ink px-10 py-5 rounded-full font-bold text-xl hover:brightness-110 transition"
        >
          <Phone size={22} />
          (540) 642-6612
        </a>

        <p className="text-sm text-forest/50 mt-6">Mon–Sat · Free estimates · Insured crew</p>
      </div>
    </section>
  );
}
