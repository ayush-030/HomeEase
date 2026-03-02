import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HowItWorks from "../components/Howitworks";
import PlatformBenefits from "../components/PlatformBenefits.";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <PlatformBenefits/>
      <Footer />
    </>
  );
}

export default HomePage;