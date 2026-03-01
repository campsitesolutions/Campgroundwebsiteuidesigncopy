import { Header } from '../components/layout/Header';
import { TopBar } from '../components/layout/TopBar';
import { Footer } from '../components/sections/Footer';
import { Hero } from '../components/sections/Hero';
import { TrailersGrid } from '../components/sections/TrailersGrid';
import { Reviews } from '../components/sections/Reviews';
import { AmenitiesGrid } from '../components/sections/AmenitiesGrid';
import { SeasonalBenefits } from '../components/sections/SeasonalBenefits';
import { CTABanner } from '../components/sections/CTABanner';
import { ContactSection } from '../components/sections/ContactSection';

export function TemplateTrailers() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main>
        <Hero variant="trailers" />
        <TrailersGrid />
        <Reviews />
        <AmenitiesGrid />
        <SeasonalBenefits />
        <CTABanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
