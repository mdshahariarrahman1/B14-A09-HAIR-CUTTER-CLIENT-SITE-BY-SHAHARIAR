import { AboutVideoSection } from '@/components/HomePage_components/AboutVideoSection';
import FooterSection from '@/components/HomePage_components/FooterSection';
import HeroSection from '@/components/HomePage_components/HeroSection';
import Navbar from '@/components/HomePage_components/Navbar';
import PriceTable from '@/components/HomePage_components/PriceTable';
import ServicesSixPage from '@/components/HomePage_components/ServicesSix';
import { ServiceUiCards } from '@/components/HomePage_components/ServiceUiCards';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServiceUiCards />
      <AboutVideoSection />
      <ServicesSixPage/>
      <PriceTable />
      <FooterSection />
    </div>
  );
};

export default HomePage;