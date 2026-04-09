import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSectionPricing from '../components/HeroSectionPricing';
import Faq from '../components/Faq';
import { logEvent } from '../servises/analytics';
import { useSEO } from '../hooks/useSEO';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  useSEO({ title: t('seo.pricing.title'), description: t('seo.pricing.description'), path: '/pricing' });
  logEvent({ category: 'page_view', action: 'view_pricing_page', label: 'User viewed the pricing page' });
  return (
    <>
      <HeroSectionPricing />
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t('pricing_page.coworking.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.monthly_desk.title')}</h2>
            <p>{t('pricing_page.monthly_desk.subtitle')}</p>
            <p className="text-4xl font-bold">€250 + km</p>
            <p>{t('pricing_page.monthly_desk.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.day_pass.title')}</h2>
            <p className="text-4xl font-bold mb-4">€25 + km</p>
            <p>{t('pricing_page.day_pass.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.free_trial.title')}</h2>
            <p className="text-4xl font-bold mb-4">€0</p>
            <p>{t('pricing_page.free_trial.description')}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <Faq/>
      </div>
    </>
  );
};

export default Pricing;
