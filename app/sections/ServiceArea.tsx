import { MapPin } from "lucide-react";

const towns = [
  "Fredericksburg",
  "Spotsylvania",
  "Stafford",
  "Locust Grove",
  "Massaponax",
  "Thornburg",
  "Falmouth",
];

export default function ServiceArea() {
  return (
    <section id="area" className="relative bg-[#F5E6C8] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
          Service area
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-[#1A4A32] sm:text-4xl">
          Serving Fredericksburg and surrounding areas
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#1A4A32]/75">
          If you're nearby and need tree work, call. If it's within a reasonable drive, we'll come out.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {towns.map((town) => (
            <span
              key={town}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1A4A32]/15 bg-white/60 px-4 py-2 text-sm font-medium text-[#1A4A32]"
            >
              <MapPin size={14} />
              {town}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
