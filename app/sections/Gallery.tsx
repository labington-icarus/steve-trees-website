import Image from "next/image";

const photos = [
  { src: "/job1.jpg", alt: "Tree removal job site" },
  { src: "/job2.jpg", alt: "Crew trimming large tree" },
  { src: "/job3.jpg", alt: "Tree service in progress" },
  { src: "/job4.jpg", alt: "Tree cutting work" },
  { src: "/job5.jpg", alt: "Hardscaping project" },
  { src: "/job6.jpg", alt: "Cleanup after tree removal" },
  { src: "/job7.jpg", alt: "Trimming and pruning" },
  { src: "/job8.jpg", alt: "Finished job site" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-[#F5E6C8] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Real work
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#1A4A32] sm:text-4xl">
            Proof we show up and get it done
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((p) => (
            <div
              key={p.src}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-[#1A4A32]/10"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
