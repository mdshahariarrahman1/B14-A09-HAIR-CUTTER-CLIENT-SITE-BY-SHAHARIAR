import { AboutVideoSection } from '@/components/HomePage_components/AboutVideoSection';
import FooterSection from '@/components/HomePage_components/FooterSection';
import HeroSection from '@/components/HomePage_components/HeroSection';
import Navbar from '@/components/HomePage_components/Navbar';
import { ServiceUiCards } from '@/components/HomePage_components/ServiceUiCards';

import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServiceUiCards />
      <AboutVideoSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;