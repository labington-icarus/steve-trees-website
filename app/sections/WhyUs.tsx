"use client";

import Image from "next/image";
import { Shield, Clock, ThumbsUp } from "lucide-react";
import { imgSrc } from "@/app/lib/imgSrc";

const reasons = [
  {
    icon: Shield,
    title: "Insured & Licensed",
    description: "Your property is protected from start to finish.",
  },
  {
    icon: Clock,
    title: "Fast, Local Response",
    description: "Same-week scheduling and quick quotes in the Fredericksburg area.",
  },
  {
    icon: ThumbsUp,
    title: "Clean, Professional Work",
    description: "Trees removed cleanly, stumps ground down, and yards left tidy.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="py-24 bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={imgSrc("/job4.jpg")}
              alt="Steve's Trees crew trimming a tree"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-lime mb-3">Why Steve's Trees</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Local experts who show up and get it done
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Steve's Trees serves homeowners and businesses across Fredericksburg with honest work, fair pricing, and a crew that shows up when promised. No surprises, no mess left behind.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-lime text-ink flex items-center justify-center shrink-0">
                    <reason.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{reason.title}</h3>
                    <p className="text-white/70">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
