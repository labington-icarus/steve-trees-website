import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] px-6 py-12 text-[#F5E6C8]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <Image
              src="/logo.png"
              alt="Steve's Trees"
              width={160}
              height={60}
              className="mx-auto mb-3 h-auto w-[140px] sm:mx-0"
            />
            <p className="text-sm opacity-70">
              Tree removal, trimming, stump grinding, and hardscaping in Fredericksburg, VA.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-right">
            <a
              href="tel:5406426612"
              className="inline-flex items-center justify-center gap-2 text-lg font-bold transition hover:text-[#C9A227] sm:justify-end"
            >
              <Phone size={18} />
              (540) 642-6612
            </a>
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} Steve's Trees. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
