import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Pricing from './pages/Pricing';
import BoardGames from './pages/BoardGames';
import Events from './pages/Events';
import EventsAndTrainings from './pages/EventsAndTrainings';
import FacebookCampaign from './pages/FacebookCampaign';
import LocaleRedirect from './components/LocaleRedirect';
import { RegistrationModalProvider } from './components/RegistrationModal';
import ReactGA from "react-ga4";

const CAMPAIGN_ROUTES = ['/free-trial'];

const AppContent: React.FC = () => {
  const location = useLocation();
  const isCampaignPage = CAMPAIGN_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-100 text-charcoal">
      {!isCampaignPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/boardgames" element={<BoardGames />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events-and-trainings" element={<EventsAndTrainings />} />
        <Route path="/free-trial" element={<FacebookCampaign />} />
        <Route path="/en/*" element={<LocaleRedirect lang="en" />} />
        <Route path="/et/*" element={<LocaleRedirect lang="et" />} />
        <Route path="/ru/*" element={<LocaleRedirect lang="ru" />} />
      </Routes>
      {!isCampaignPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
  return (
    <Router>
      <RegistrationModalProvider>
        <AppContent />
      </RegistrationModalProvider>
    </Router>
  );
};

export default App;