import React from 'react';
import HeroSection from '../components/HeroSection';
import CoworkingExperience from '../components/CoworkingExperience';
import BoardGameClub from '../components/BoardGameClub';
import AtmosphereGallery from '../components/AtmosphereGallery';
import RegistrationForm from '../components/RegistrationForm';
import { logEvent } from '../servises/analytics';

const Home: React.FC = () => {
  logEvent({ category: 'page_view', action: 'view_home_page', label: 'User viewed the home page' });
  // get url paprameters check for camp and log event if present
  const urlParams = new URLSearchParams(window.location.search);
  const camp = urlParams.get('camp');
  if (camp) {
    
    logEvent({ category: 'campaign', action: 'campaign_parameter_detected', label: `Campaign parameter detected: ${camp}` });
  }

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
