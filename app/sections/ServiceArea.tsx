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
    <section id="area" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm font-bold tracking-widest uppercase text-pine mb-3">Service Area</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-forest mb-10">
          Serving Fredericksburg <br className="hidden md:block" /> and surrounding areas
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {towns.map((town) => (
            <span
              key={town}
              className="px-5 py-3 rounded-full bg-cream text-forest font-semibold text-sm border border-gray-100"
            >
              {town}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
