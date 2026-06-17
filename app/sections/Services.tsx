import Image from "next/image";
import { Phone, Scissors, TreeDeciduous, HardHat, Hammer, BadgeDollarSign } from "lucide-react";

const services = [
  {
    title: "Tree Removal",
    body: "Dangerous, dead, or unwanted trees taken down safely — clean yard, no stump left behind.",
    icon: TreeDeciduous,
  },
  {
    title: "Tree Trimming",
    body: "Pruning and crown cleanup that keeps trees healthy, your property safe, and views clear.",
    icon: Scissors,
  },
  {
    title: "Stump Grinding",
    body: "Stumps ground below grade so you can replant, pave, or simply mow over them.",
    icon: HardHat,
  },
  {
    title: "Hardscaping",
    body: "Patios, retaining walls, walkways, and outdoor stone work built to last in Virginia weather.",
    icon: Hammer,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-[#F5E6C8] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#1A4A32] sm:text-4xl">
            Services for every outdoor job
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-[#1A4A32]/10 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#2E7D4A]/10 p-3 text-[#1A4A32]">
                <s.icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#1A4A32]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#1A4A32]/75">{s.body}</p>
            </div>
          ))}
        </div>

        {/* Discount CTA */}
        <div className="mt-16 rounded-3xl bg-[#1A4A32] p-8 text-center text-[#F5E6C8] sm:p-12">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-4 py-1.5 text-xs font-bold text-[#1A4A32]">
            <BadgeDollarSign size={14} />
            Limited-Time Offer
          </div>
          <h3 className="text-2xl font-extrabold sm:text-3xl">
            $100 off your next tree service
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm opacity-90">
            Or ask about our 10% military and referral discount. Just mention it when you call.
          </p>
          <a
            href="tel:5406426612"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5E6C8] px-7 py-3.5 text-sm font-bold text-[#1A4A32] transition hover:bg-white active:scale-95"
          >
            <Phone size={18} />
            Call (540) 642-6612
          </a>
        </div>
      </div>
    </section>
  );
}
