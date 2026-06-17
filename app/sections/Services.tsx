"use client";

import { TreeDeciduous, Scissors, CircleDot, Hammer } from "lucide-react";

const services = [
  {
    icon: TreeDeciduous,
    title: "Tree Removal",
    description:
      "Dangerous, dead, or unwanted trees taken down safely — clean yard, no stump left behind.",
  },
  {
    icon: Scissors,
    title: "Tree Trimming",
    description:
      "Pruning and crown cleanup that keeps trees healthy, your property safe, and views clear.",
  },
  {
    icon: CircleDot,
    title: "Stump Grinding",
    description:
      "Stumps ground below grade so you can replant, pave, or simply mow over them.",
  },
  {
    icon: Hammer,
    title: "Hardscaping",
    description:
      "Patios, retaining walls, walkways, and outdoor stone work built to last in Virginia weather.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">What we do</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Services for every outdoor job</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white/60 border border-forest/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-pine/10 flex items-center justify-center text-forest mb-4">
                <service.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-forest/75 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
