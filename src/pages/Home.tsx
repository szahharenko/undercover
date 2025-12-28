import React from 'react';
import HeroSection from '../components/HeroSection';
import CoworkingExperience from '../components/CoworkingExperience';
import BoardGameClub from '../components/BoardGameClub';
import AtmosphereGallery from '../components/AtmosphereGallery';
import RegistrationForm from '../components/RegistrationForm';

const Home: React.FC = () => {
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
