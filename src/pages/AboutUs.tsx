import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSectionAbout from '../components/HeroSectionAbout';
import { logEvent } from '../servises/analytics';
import { useSEO } from '../hooks/useSEO';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  useSEO({ title: t('seo.about.title'), description: t('seo.about.description'), path: '/about' });
  logEvent({ category: 'page_view', action: 'view_about_us_page', label: 'User viewed the about us page' });
  return (
    <>
      <HeroSectionAbout />
      <div className="container mx-auto px-4 py-16">
        <div className="p-20 max-w-[700px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-4">{t('about_us_page.mission_title')}</h2>
          <p className="text-lg text-charcoal/80">
            {t('about_us_page.mission_text')}
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
