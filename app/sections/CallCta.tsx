"use client";

import { Phone, ArrowRight } from "lucide-react";

export default function CallCta() {
  return (
    <section id="quote" className="py-24 bg-forest">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-lime mb-3">Ready for a Free Estimate?</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Call Steve today
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Same-week response in Fredericksburg and surrounding areas. Tell us what you need over the phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:5406426612"
            className="inline-flex items-center justify-center gap-2 bg-lime text-ink px-10 py-5 rounded-full font-bold text-xl hover:brightness-110 transition"
          >
            <Phone size={22} />
            (540) 642-6612
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition"
          >
            See Our Services
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
