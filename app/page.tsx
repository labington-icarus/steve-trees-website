import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Gallery from "./sections/Gallery";
import WhyUs from "./sections/WhyUs";
import ServiceArea from "./sections/ServiceArea";
import CallCta from "./sections/CallCta";
import Footer from "./sections/Footer";
import StickyCallBar from "./sections/StickyCallBar";

export default function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <Navbar />
      <Hero />
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
