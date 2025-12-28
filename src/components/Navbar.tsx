import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cat from '../assets/cat-left.png';
import dog from '../assets/dog-right.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-neutral-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className='flex items-center'>
          <img src={cat} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
          <div className='flex text-center flex-col'>
            <span className='text-3xl font-bold text-charcoal uppercase'>Undercover Vibe</span>
            <span className='text-sm text-charcoal/70 -mt-1'>{t('coworking_and_board_games')}</span>
          </div>
          <img src={dog} alt="Undercover vibe logo" className='max-h-[150px] h-auto'/>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-charcoal hover:text-sage-green transition-colors">{t('about_us')}</Link>
          <Link to="/pricing" className="text-charcoal hover:text-sage-green transition-colors">{t('pricing')}</Link>
          <Link to="/boardgames" className="text-charcoal hover:text-sage-green transition-colors">{t('board_games')}</Link>
          <Link to="/events" className="text-charcoal hover:text-sage-green transition-colors">{t('events')}</Link>
        </div>
        <div className="flex items-center">
          <button className="px-6 py-2 bg-coffee text-cream rounded-xl hover:bg-opacity-90 transition-colors hidden md:block">
            {t('book_a_visit')}
          </button>
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
