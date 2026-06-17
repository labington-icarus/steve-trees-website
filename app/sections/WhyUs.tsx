"use client";

import { Shield, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Insured Crew",
    description: "Peace of mind knowing your property is protected while we work.",
  },
  {
    icon: Clock,
    title: "Fast, Local Response",
    description: "Same-week scheduling and quick turnaround on quotes. No out-of-town crews.",
  },
  {
    icon: Award,
    title: "Done Right",
    description: "Trees removed cleanly, stumps ground down, and yards left tidy.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Why Steve's</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Built on referrals, not flashy ads</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <div className="w-16 h-16 mx-auto rounded-full bg-pine/10 flex items-center justify-center text-forest mb-4">
                <reason.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-forest/75 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
