import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSectionPricing from '../components/HeroSectionPricing';

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSectionPricing />
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t('pricing_page.coworking.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.monthly_desk.title')}</h2>
            <p>{t('pricing_page.monthly_desk.subtitle')}</p>
            <p className="text-4xl font-bold"><span className="font-medium line-through">€300</span> €200</p>
            <p>{t('pricing_page.monthly_desk.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.day_pass.title')}</h2>
            <p className="text-4xl font-bold mb-4">€30</p>
            <p>{t('pricing_page.day_pass.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.free_trial.title')}</h2>
            <p className="text-4xl font-bold mb-4">€0</p>
            <p>{t('pricing_page.free_trial.description')}</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('pricing_page.bg.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_club.title')}</h2>
            <p className="text-4xl font-bold">€180</p>
            <p>{t('pricing_page.boardgames_event_club.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_table.title')}</h2>
            <p className="text-4xl font-bold mb-4">€50</p>
            <p>{t('pricing_page.boardgames_event_table.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.boardgames_event_daily.title')}</h2>
            <p className="text-4xl font-bold mb-4">€10</p>
            <p>{t('pricing_page.boardgames_event_daily.description')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
