"use client";

import { Phone, Award, Calendar, MapPin } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="bg-cream py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-forest text-lime flex items-center justify-center">
              <Phone size={22} />
            </div>
            <p className="font-bold text-forest">Free Estimates</p>
            <p className="text-sm text-charcoal/60">Call or text anytime</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-forest text-lime flex items-center justify-center">
              <Award size={22} />
            </div>
            <p className="font-bold text-forest">Insured Crew</p>
            <p className="text-sm text-charcoal/60">Your property is protected</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-forest text-lime flex items-center justify-center">
              <Calendar size={22} />
            </div>
            <p className="font-bold text-forest">Same-Week Scheduling</p>
            <p className="text-sm text-charcoal/60">We show up when we say</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-forest text-lime flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <p className="font-bold text-forest">Local Business</p>
            <p className="text-sm text-charcoal/60">Fredericksburg area</p>
          </div>
        </div>
      </div>
    </section>
  );
}
