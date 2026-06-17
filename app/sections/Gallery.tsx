"use client";

import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

const gallery = [
  { src: "/job1.jpg", label: "Hauling" },
  { src: "/job2.jpg", label: "Removal" },
  { src: "/job4.jpg", label: "Trimming" },
  { src: "/job5.jpg", label: "Crane Work" },
  { src: "/job6.jpg", label: "Climbing" },
  { src: "/job3.jpg", label: "Site Work" },
  { src: "/job7.jpg", label: "Cleanup" },
  { src: "/job8.jpg", label: "Finished" },
];

export default function Gallery() {
  return (
    <section id="work" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-pine mb-3">Real Work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-forest">
            Proof we show up and get it done
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={imgSrc(item.src)}
                alt={item.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
