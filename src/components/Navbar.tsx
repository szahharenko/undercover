import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo-undercover.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent p-6 z-50 nav-bar">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className='flex items-center nav-logo'>
          <img src={logo} alt="Undercover vibe logo" className='max-h-[150px] h-auto '/>
        </Link>
        <div className="md:flex space-x-6 nav-links">
          <Link to="/" className="text-white">{t('home')}</Link>
          <Link to="/about" className="text-white">{t('about_us')}</Link>
          <Link to="/pricing" className="text-white">{t('pricing')}</Link>
          <Link to="/boardgames" className="text-white">{t('board_games')}</Link>
        </div>
        <div className="flex items-center">
          <div className="ml-4">
            <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language} className="bg-charcoal text-cream rounded-md p-1">
              <option value="en">EN</option>
              <option value="et">ET</option>
              <option value="ru">RU</option>
            </select>
          </div>
        </div>
        {/* Mobile menu button will go here later */}
      </div>
    </nav>
  );
};

export default Navbar;
