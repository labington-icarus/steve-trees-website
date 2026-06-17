import { Shield, Clock, MapPin, Award } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Insured crew",
    body: "Peace of mind knowing your property is protected while we work.",
  },
  {
    icon: Clock,
    title: "Fast response",
    body: "Same-week scheduling and quick turnaround on quotes.",
  },
  {
    icon: MapPin,
    title: "Local to Fredericksburg",
    body: "We live here too — no out-of-town crews or surprise travel fees.",
  },
  {
    icon: Award,
    title: "Done right",
    body: "Trees removed cleanly, stumps ground down, and yards left tidy.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative bg-[#1A4A32] px-6 py-24 text-[#F5E6C8] sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Why Steve's
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Built on referrals, not flashy ads
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-[#2E7D4A]/30 p-4">
                <r.icon size={28} />
              </div>
              <h3 className="mb-2 text-lg font-bold">{r.title}</h3>
              <p className="text-sm leading-relaxed opacity-80">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
