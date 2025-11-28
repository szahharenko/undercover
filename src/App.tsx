import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoworkingExperience from './components/CoworkingExperience';
import BoardGameClub from './components/BoardGameClub';
import AtmosphereGallery from './components/AtmosphereGallery';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 text-charcoal">
      <Navbar />
      <HeroSection />
      <CoworkingExperience />
      <BoardGameClub />
      <AtmosphereGallery />
      <RegistrationForm />
      <Footer />
    </div>
  );
};

export default App;