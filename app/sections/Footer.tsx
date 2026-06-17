"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Image
            src={imgSrc("/logo.png")}
            alt="Steve's Trees"
            width={192}
            height={48}
            className="h-12 w-auto mb-3 mx-auto md:mx-0"
          />
          <p className="text-sm text-cream/70">
            Tree removal, trimming, stump grinding, and hardscaping in Fredericksburg, VA.
          </p>
        </div>

        <div className="text-center md:text-right">
          <a
            href="tel:5406426612"
            className="inline-flex items-center gap-2 text-xl font-bold hover:text-gold transition"
          >
            <Phone size={20} />
            (540) 642-6612
          </a>
          <p className="text-sm text-cream/50 mt-2">© 2026 Steve's Trees. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
