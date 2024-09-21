import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Heading, Button } from '@chakra-ui/react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoryCards from '../components/CategoryCards';
import BottomNavigation from '../components/BottomNavigation';
import WhyChooseUs from '../components/WhyChooseUs';
import AdditionalSection from '../components/AdditionalSection';
import Footer from '../components/Footer';

const Home = () => {
  return(
    <>
      <Header />
      <HeroSection />
      <CategoryCards />
      <BottomNavigation />
      <WhyChooseUs />
      <AdditionalSection />
      <Footer />
      </>
  );
};

export default Home;
