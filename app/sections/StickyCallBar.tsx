"use client";

import { Phone } from "lucide-react";

export default function StickyCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-forest px-4 py-3 shadow-lg lg:hidden">
      <a
        href="tel:5406426612"
        className="flex items-center justify-center gap-2 bg-lime text-ink rounded-full px-5 py-3 font-bold text-sm"
      >
        <Phone size={18} />
        Call Steve: (540) 642-6612
      </a>
    </div>
  );
}
