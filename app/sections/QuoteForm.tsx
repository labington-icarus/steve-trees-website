"use client";

import { useState } from "react";
import { Phone, Send, CheckCircle, Loader2 } from "lucide-react";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // Placeholder: no backend yet. Simulate.
    await new Promise((r) => setTimeout(r, 1000));
    setBusy(false);
    setSent(true);
  };

  if (sent) {
    return (
      <section id="quote" className="relative bg-[#1A4A32] px-6 py-24 text-[#F5E6C8] sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <CheckCircle className="mx-auto mb-4 text-[#C9A227]" size={48} />
          <h2 className="text-2xl font-extrabold sm:text-3xl">Thanks, we'll be in touch soon.</h2>
          <p className="mt-3 opacity-90">
            Steve usually replies same day. If it's urgent, call now.
          </p>
          <a
            href="tel:5406426612"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5E6C8] px-7 py-3.5 text-sm font-bold text-[#1A4A32] transition hover:bg-white"
          >
            <Phone size={18} />
            Call (540) 642-6612
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="relative bg-[#1A4A32] px-6 py-24 text-[#F5E6C8] sm:py-32">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
            Free estimate
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Get your free quote
          </h2>
          <p className="mt-3 text-sm opacity-90">
            Tell us what you need. We'll call back with a fast, honest estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-[#F5E6C8]/20 bg-[#F5E6C8]/10 px-4 py-3 text-sm text-[#F5E6C8] placeholder:text-[#F5E6C8]/50 focus:border-[#C9A227] focus:outline-none"
            />
            <input
              required
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-[#F5E6C8]/20 bg-[#F5E6C8]/10 px-4 py-3 text-sm text-[#F5E6C8] placeholder:text-[#F5E6C8]/50 focus:border-[#C9A227] focus:outline-none"
            />
          </div>

          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-[#F5E6C8]/20 bg-[#F5E6C8]/10 px-4 py-3 text-sm text-[#F5E6C8] placeholder:text-[#F5E6C8]/50 focus:border-[#C9A227] focus:outline-none"
          />

          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full rounded-xl border border-[#F5E6C8]/20 bg-[#F5E6C8]/10 px-4 py-3 text-sm text-[#F5E6C8] focus:border-[#C9A227] focus:outline-none"
          >
            <option value="" className="bg-[#1A4A32] text-[#F5E6C8]">What service do you need?</option>
            <option value="removal" className="bg-[#1A4A32]">Tree Removal</option>
            <option value="trimming" className="bg-[#1A4A32]">Tree Trimming</option>
            <option value="stump" className="bg-[#1A4A32]">Stump Grinding</option>
            <option value="hardscape" className="bg-[#1A4A32]">Hardscaping</option>
            <option value="other" className="bg-[#1A4A32]">Other</option>
          </select>

          <textarea
            rows={4}
            placeholder="Describe your job..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-xl border border-[#F5E6C8]/20 bg-[#F5E6C8]/10 px-4 py-3 text-sm text-[#F5E6C8] placeholder:text-[#F5E6C8]/50 focus:border-[#C9A227] focus:outline-none"
          />

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A227] px-7 py-3.5 text-sm font-bold text-[#1A4A32] transition hover:bg-[#F5E6C8] disabled:opacity-70"
          >
            {busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            {busy ? "Sending..." : "Request Quote"}
          </button>
        </form>
      </div>
    </section>
  );
}
