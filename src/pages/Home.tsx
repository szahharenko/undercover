import React from 'react';
import HeroSection from '../components/HeroSection';
import CoworkingExperience from '../components/CoworkingExperience';
import BoardGameClub from '../components/BoardGameClub';
import AtmosphereGallery from '../components/AtmosphereGallery';
import RegistrationForm from '../components/RegistrationForm';
import { logEvent } from '../servises/analytics';

const Home: React.FC = () => {
  logEvent({ category: 'page_view', action: 'view_home_page', label: 'User viewed the home page' });
  return (
    <>
      <HeroSection />
      <CoworkingExperience />
      <BoardGameClub />
      <AtmosphereGallery />
      <RegistrationForm />
    </>
  );
};

export default Home;
