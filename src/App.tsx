import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LocaleRedirect from './components/LocaleRedirect';
import { RegistrationModalProvider } from './components/RegistrationModal';
import ReactGA from "react-ga4";

// Route-level code splitting — secondary pages load on demand so the
// initial bundle stays focused on the homepage. Home stays eager because
// it's the first-paint target and the most-visited route.
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Pricing = lazy(() => import('./pages/Pricing'));
const BoardGames = lazy(() => import('./pages/BoardGames'));
const Events = lazy(() => import('./pages/Events'));
const EventsAndTrainings = lazy(() => import('./pages/EventsAndTrainings'));
const FacebookCampaign = lazy(() => import('./pages/FacebookCampaign'));

const CAMPAIGN_ROUTES = ['/free-trial'];

/** Lightweight fallback shown while a lazy route chunk is loading. */
const RouteFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true" aria-live="polite">
    <div className="h-10 w-10 rounded-full border-4 border-coffee/20 border-t-coffee animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isCampaignPage = CAMPAIGN_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-100 text-charcoal">
      {!isCampaignPage && <Navbar />}
      <Suspense fallback={<RouteFallback />}>
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
      </Suspense>
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