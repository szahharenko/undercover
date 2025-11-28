import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-neutral-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-charcoal">CO/PLAY</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-charcoal hover:text-sage-green transition-colors">Home</a>
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
