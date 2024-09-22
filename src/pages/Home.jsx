import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import BottomNavigation from '../components/BottomNavigation';
import WhyChooseUs from '../components/WhyChooseUs';
import AdditionalSection from '../components/AdditionalSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header and Content */}
      <Box flex="1">
        <Header />
        <HeroSection />
        <CategoryCards />
        <BottomNavigation />
        <WhyChooseUs />
        <AdditionalSection />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
