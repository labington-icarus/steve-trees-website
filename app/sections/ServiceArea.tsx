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
    <section id="area" className="py-16 bg-forest text-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Service area</p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Serving Fredericksburg and surrounding areas</h2>

        <div className="flex flex-wrap justify-center gap-3">
          {towns.map((town) => (
            <span
              key={town}
              className="px-4 py-2 rounded-full border border-cream/20 text-sm font-medium"
            >
              {town}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
