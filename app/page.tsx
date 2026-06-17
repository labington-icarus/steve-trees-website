import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Gallery from "./sections/Gallery";
import WhyUs from "./sections/WhyUs";
import ServiceArea from "./sections/ServiceArea";
import QuoteForm from "./sections/QuoteForm";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <WhyUs />
        <ServiceArea />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
