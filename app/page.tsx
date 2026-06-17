import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import TrustBar from "./sections/TrustBar";
import Services from "./sections/Services";
import Gallery from "./sections/Gallery";
import WhyUs from "./sections/WhyUs";
import ServiceArea from "./sections/ServiceArea";
import CallCta from "./sections/CallCta";
import Footer from "./sections/Footer";
import StickyCallBar from "./sections/StickyCallBar";

export default function Home() {
  return (
    <main className="pb-16 lg:pb-0">
      <Navbar />
      <Hero />
      <TrustBar />
      <Services />
      <Gallery />
      <WhyUs />
      <ServiceArea />
      <CallCta />
      <Footer />
      <StickyCallBar />
    </main>
  );
}
