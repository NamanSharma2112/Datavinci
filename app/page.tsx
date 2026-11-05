import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Platforms } from "@/components/sections/platforms";
import { RealNumber } from "@/components/sections/real-number";
import { Ask } from "@/components/sections/ask";
import { Features } from "@/components/sections/features";
import { Agencies } from "@/components/sections/agencies";
import { Proof } from "@/components/sections/proof";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Platforms />
        <RealNumber />
        <Ask />
        <Features />
        <Agencies />
        <Proof />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
