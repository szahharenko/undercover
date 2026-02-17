import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-undercover.png';
import enFlag from '../assets/gb.svg'; // Placeholder for English flag
import etFlag from '../assets/ee.svg'; // Placeholder for Estonian flag
import ruFlag from '../assets/ru.svg'; // Placeholder for Russian flag

// FlagIcon component moved outside Navbar to prevent re-creation on render
const FlagIcon: React.FC<{ lang: string; src: string; changeLanguage: (lng: string) => void; activeLang: string }> = ({ lang, src, changeLanguage, activeLang }) => (
  <img
    src={src}
    alt={`${lang} flag`}
    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-200 ${
      activeLang === lang ? 'border-cream scale-110' : 'border-transparent opacity-70 hover:opacity-100'
    }`}
    onClick={() => changeLanguage(lang)}
  />
);

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Close menu on language change
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent p-6 z-50 nav-bar">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className='flex items-center nav-logo z-50' onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="Undercover vibe logo" className='max-h-[100px] md:max-h-[150px] h-auto transition-all duration-300'/>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 nav-links items-center w-full justify-between">
          <div className="flex w-full items-center justify-center gap-4">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">{t('home')}</Link>
            <Link to="/pricing" className="text-white hover:text-gray-300 transition-colors">{t('pricing')}</Link>
            <Link to="/events-and-trainings" className="text-white hover:text-gray-300 transition-colors">{t('events_and_trainings')}</Link>
            <Link to="/boardgames" className="text-white hover:text-gray-300 transition-colors">{t('board_games')}</Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition-colors">{t('about_us')}</Link>
          </div>
          <div className="ml-4 flex space-x-2">
            <FlagIcon lang="en" src={enFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
            <FlagIcon lang="et" src={etFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
            <FlagIcon lang="ru" src={ruFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-50">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#333f33] z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
          <div className="flex flex-col space-y-8 text-center text-xl font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-300">{t('home')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-300">{t('about_us')}</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-300">{t('pricing')}</Link>
            <Link to="/events-and-trainings" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-300">{t('events_and_trainings')}</Link>
            <Link to="/boardgames" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gray-300">{t('board_games')}</Link>

            <div className="pt-4 flex justify-center space-x-4">
              <FlagIcon lang="en" src={enFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
              <FlagIcon lang="et" src={etFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
              <FlagIcon lang="ru" src={ruFlag} changeLanguage={changeLanguage} activeLang={i18n.language} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
