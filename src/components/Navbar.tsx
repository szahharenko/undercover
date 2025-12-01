import React from 'react';
import cat from '../assets/cat-left.png'
import dog from '../assets/dog-right.png'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-neutral-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex items-center'>
          <img src={cat} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
          <div className='flex text-center flex-col'>
            <span className='text-3xl font-bold text-charcoal uppercase'>Undercover Vibe</span>
            <span className='text-sm text-charcoal/70 -mt-1'>Coworking & Board Games</span>
          </div>
          <img src={dog} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-charcoal hover:text-sage-green transition-colors">Coworking</a>
          <a href="#" className="text-charcoal hover:text-sage-green transition-colors">Board Games</a>
          <a href="#" className="text-charcoal hover:text-sage-green transition-colors">Contact</a>
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
