import { Header } from '../components/layout/Header';
import { TopBar } from '../components/layout/TopBar';
import { Footer } from '../components/sections/Footer';
import { Hero } from '../components/sections/Hero';
import { StayTypeCards } from '../components/sections/StayTypeCards';
import { AmenitiesGrid } from '../components/sections/AmenitiesGrid';
import { GalleryGrid } from '../components/sections/GalleryGrid';
import { LocalAttractions } from '../components/sections/LocalAttractions';
import { Reviews } from '../components/sections/Reviews';
import { CTABanner } from '../components/sections/CTABanner';
import { ContactSection } from '../components/sections/ContactSection';

export function TemplateOvernight() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main>
        <Hero />
        <StayTypeCards />
        <AmenitiesGrid />
        <GalleryGrid />
        <LocalAttractions />
        <Reviews />
        <CTABanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
