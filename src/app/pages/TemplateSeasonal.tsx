import { Header } from '../components/layout/Header';
import { TopBar } from '../components/layout/TopBar';
import { Footer } from '../components/sections/Footer';
import { HeroWeather } from '../components/sections/HeroWeather';
import { StayTypeCards } from '../components/sections/StayTypeCards';
import { SeasonalBenefits } from '../components/sections/SeasonalBenefits';
import { AmenitiesGrid } from '../components/sections/AmenitiesGrid';
import { TrailersGrid } from '../components/sections/TrailersGrid';
import { Reviews } from '../components/sections/Reviews';
import { CTABanner } from '../components/sections/CTABanner';
import { ContactSection } from '../components/sections/ContactSection';

export function TemplateSeasonal() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      
      <main>
        <HeroWeather />
        <StayTypeCards />
        <SeasonalBenefits />
        <AmenitiesGrid />
        <TrailersGrid />
        <Reviews />
        <CTABanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
