import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import NextEncounterSection from "@/components/sections/NextEncounterSection";
import BlogPreview from "@/components/sections/BlogPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <NextEncounterSection />
      <BlogPreview />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
