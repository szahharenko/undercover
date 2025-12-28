import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Pricing from './pages/Pricing';
import BoardGames from './pages/BoardGames';
import Events from './pages/Events';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-100 text-charcoal">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/boardgames" element={<BoardGames />} />
          <Route path="/events" element={<Events />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;