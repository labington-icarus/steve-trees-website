"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { imgSrc } from "@/app/lib/imgSrc";

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <Image
              src={imgSrc("/logo-hero-t.png")}
              alt="Steve's Trees"
              width={256}
              height={100}
              className="h-16 w-auto mb-3 mx-auto md:mx-0"
            />
            <p className="text-white/60">
              Tree removal, trimming, stump grinding, and hardscaping in Fredericksburg, VA.
            </p>
          </div>

          <div className="text-center md:text-right">
            <a
              href="tel:5406426612"
              className="inline-flex items-center gap-2 text-xl font-bold hover:text-lime transition"
            >
              <Phone size={20} />
              (540) 642-6612
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center md:text-left text-sm text-white/50">
          © {new Date().getFullYear()} Steve's Trees. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
