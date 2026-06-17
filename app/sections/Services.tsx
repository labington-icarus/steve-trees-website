"use client";

import { TreeDeciduous, Scissors, CircleDot, Hammer } from "lucide-react";

const services = [
  {
    icon: TreeDeciduous,
    title: "Tree Removal",
    description:
      "Dangerous, dead, or unwanted trees taken down safely with the right equipment and experienced crew.",
  },
  {
    icon: Scissors,
    title: "Tree Trimming",
    description:
      "Pruning and crown cleanup that improves tree health, clears sightlines, and keeps your property safe.",
  },
  {
    icon: CircleDot,
    title: "Stump Grinding",
    description:
      "Stumps ground below grade so you can mow, plant, pave, or build where the tree used to be.",
  },
  {
    icon: Hammer,
    title: "Hardscaping",
    description:
      "Retaining walls, patios, walkways, and outdoor stone work built to handle Virginia weather.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-pine mb-3">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-forest">
            Everything your property needs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-forest text-white p-8 hover:-translate-y-1 transition duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-lime text-ink flex items-center justify-center mb-6">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/80 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
