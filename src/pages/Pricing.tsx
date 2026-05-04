import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';
import HeroSectionPricing from '../components/HeroSectionPricing';
import Faq from '../components/Faq';
import { logEvent } from '../servises/analytics';
import { useSEO } from '../hooks/useSEO';
import StructuredData from '../components/StructuredData';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { useRegistrationModal } from '../components/registrationModalContext';

const BenefitsList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-4 space-y-2 text-left">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-charcoal/85 text-sm">
        <FaCheck className="text-sage-green mt-1 flex-shrink-0" size={12} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const { openModal } = useRegistrationModal();
  useSEO({ title: t('seo.pricing.title'), description: t('seo.pricing.description'), path: '/pricing' });
  logEvent({ category: 'page_view', action: 'view_pricing_page', label: 'User viewed the pricing page' });

  const monthlyBenefits = t('pricing_page.monthly_desk.benefits', { returnObjects: true }) as string[];
  const dayPassBenefits = t('pricing_page.day_pass.benefits', { returnObjects: true }) as string[];
  const freeTrialBenefits = t('pricing_page.free_trial.benefits', { returnObjects: true }) as string[];
  return (
    <>
      <BreadcrumbSchema items={[{ name: t('home'), path: '/' }, { name: t('pricing'), path: '/pricing' }]} />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Undercover Vibe — Coworking for Entrepreneurs',
        'description': t('seo.pricing.description'),
        'brand': { '@type': 'Brand', 'name': 'Undercover Vibe' },
        'offers': [
          {
            '@type': 'Offer',
            'name': t('pricing_page.monthly_desk.title'),
            'price': '250',
            'priceCurrency': 'EUR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock',
            'url': 'https://undercover.ee/pricing',
          },
          {
            '@type': 'Offer',
            'name': t('pricing_page.day_pass.title'),
            'price': '25',
            'priceCurrency': 'EUR',
            'priceValidUntil': '2026-12-31',
            'availability': 'https://schema.org/InStock',
            'url': 'https://undercover.ee/pricing',
          },
          {
            '@type': 'Offer',
            'name': t('pricing_page.free_trial.title'),
            'price': '0',
            'priceCurrency': 'EUR',
            'availability': 'https://schema.org/InStock',
            'url': 'https://undercover.ee/pricing',
          },
        ],
      }} />
      <HeroSectionPricing />
      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t('pricing_page.coworking.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border-2 border-coffee p-6 rounded-lg shadow-lg flex flex-col bg-cream/30 relative">
            <div className="absolute -top-3 left-6 bg-coffee text-cream text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide" style={{top: 20, right: 20}}>
              {t('pricing_page.monthly_desk.subtitle')} *
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-2">{t('pricing_page.monthly_desk.title')}</h2>
            <p className="text-4xl font-bold mb-1">€250 <span className="text-base font-normal text-charcoal/60">+ km / {t('pricing_page.per_month')}</span></p>
            <p className="text-charcoal/80">{t('pricing_page.monthly_desk.description')}</p>
            <h3 className="mt-4 text-sm font-bold text-charcoal uppercase tracking-wide">{t('pricing_page.benefits_title')}</h3>
            <BenefitsList items={monthlyBenefits} />
          </div>
          <div className="border p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.day_pass.title')}</h2>
            <p className="text-4xl font-bold mb-1">€25 <span className="text-base font-normal text-charcoal/60">+ km / {t('pricing_page.per_day')}</span></p>
            <p className="text-charcoal/80">{t('pricing_page.day_pass.description')}</p>
            <h3 className="mt-4 text-sm font-bold text-charcoal uppercase tracking-wide">{t('pricing_page.benefits_title')}</h3>
            <BenefitsList items={dayPassBenefits} />
          </div>
          <div className="border p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{t('pricing_page.free_trial.title')}</h2>
            <p className="text-4xl font-bold mb-1">€0</p>
            <p className="text-charcoal/80">{t('pricing_page.free_trial.description')}</p>
            <h3 className="mt-4 text-sm font-bold text-charcoal uppercase tracking-wide">{t('pricing_page.benefits_title')}</h3>
            <BenefitsList items={freeTrialBenefits} />
            <br/>
            <div className='mt-4 pt-4'>
              <button
                type="button"
                onClick={() => openModal('pricing_free_trial')}
                className="mt-6 px-4 py-2 bg-coffee text-cream rounded-xl font-bold text-center hover:bg-opacity-90 transition-colors"
              >
                {t('hero.reserve_button')}
              </button>
            </div>
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
