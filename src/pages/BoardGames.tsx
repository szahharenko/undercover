import React from 'react';
import { useTranslation } from 'react-i18next';
import BoardGameClub from '../components/BoardGameClub';
import HeroSectionBgs from '../components/HeroSectionBoardgames';
import BgsGallery from '../components/BgsGallery';
import EventsCalendar from '../components/EventsCalendar';
import { logEvent } from '../servises/analytics';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  logEvent({ category: 'page_view', action: 'view_boardgames_page', label: 'User viewed the boardgames page' });
  // scroll to #events-calendar on load if hash is present
  React.useEffect(() => {
    if (window.location.hash === '#events-calendar') {
      const element = document.getElementById('events-calendar');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  return (
    <>
      <HeroSectionBgs />
      <BgsGallery />
      <BoardGameClub />
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('pricing_page.bg.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_club.title')}</h2>
            <p className="text-4xl font-bold">€150</p>
            <p>{t('pricing_page.boardgames_event_club.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_table.title')}</h2>
            <p className="text-4xl font-bold">€50</p>
            <p>{t('pricing_page.boardgames_event_table.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_daily.title')}</h2>
            <p className="text-4xl font-bold">€10</p>
            <p>{t('pricing_page.boardgames_event_daily.description')}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('pricing_page.bg.includes')}</h1>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>{t('pricing_page.bg.includes_item1')}</li>
          <li>{t('pricing_page.bg.includes_item2')}</li>
          <li>{t('pricing_page.bg.includes_item3')}</li>
          <li>{t('pricing_page.bg.includes_item4')}</li>
          <li>{t('pricing_page.bg.includes_item5')}</li>
        </ul>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('pricing_page.bg.booking')}</h1>
        <p className="mt-4">{t('pricing_page.bg.booking_description')}</p>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto" id="events-calendar">
        <EventsCalendar />
      </div>

    </>
  );
};

export default Pricing;
