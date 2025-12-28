import React from 'react';
import { useTranslation } from 'react-i18next';

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">{t('pricing_page.title')}</h1>
      <p className="text-lg text-center mb-12">
        {t('pricing_page.subtitle')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{t('pricing_page.day_pass.title')}</h2>
          <p className="text-4xl font-bold mb-4">€15</p>
          <p>{t('pricing_page.day_pass.description')}</p>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{t('pricing_page.monthly_desk.title')}</h2>
          <p className="text-4xl font-bold mb-4">€200</p>
          <p>{t('pricing_page.monthly_desk.description')}</p>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{t('pricing_page.meeting_room.title')}</h2>
          <p className="text-4xl font-bold mb-4">€25/hour</p>
          <p>{t('pricing_page.meeting_room.description')}</p>
        </div>
      </div>
      <div className="mt-12 text-center bg-sage-green text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">{t('pricing_page.usp.title')}</h2>
        <p className="text-xl mt-2">
          {t('pricing_page.usp.description')}
        </p>
      </div>
    </div>
  );
};

export default Pricing;
