"use client";

import Image from "next/image";

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
    <section id="work" className="py-24 bg-forest text-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Real work</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Proof we show up and get it done</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div
              key={item.src}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-forest/50"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center font-bold text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
