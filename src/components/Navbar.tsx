import React from 'react';
import { Link } from 'react-router-dom';
import cat from '../assets/cat-left.png'
import dog from '../assets/dog-right.png'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-neutral-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className='flex items-center'>
          <img src={cat} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
          <div className='flex text-center flex-col'>
            <span className='text-3xl font-bold text-charcoal uppercase'>Undercover Vibe</span>
            <span className='text-sm text-charcoal/70 -mt-1'>Coworking & Board Games</span>
          </div>
          <img src={dog} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-charcoal hover:text-sage-green transition-colors">About Us</Link>
          <Link to="/pricing" className="text-charcoal hover:text-sage-green transition-colors">Pricing</Link>
          <Link to="/boardgames" className="text-charcoal hover:text-sage-green transition-colors">Board Games</Link>
          <Link to="/events" className="text-charcoal hover:text-sage-green transition-colors">Events</Link>
        </div>
        <button className="px-6 py-2 bg-coffee text-cream rounded-xl hover:bg-opacity-90 transition-colors hidden md:block">
          Book a Visit
        </button>
        {/* Mobile menu button will go here later */}
      </div>
    </nav>
  );
};

export default Navbar;
