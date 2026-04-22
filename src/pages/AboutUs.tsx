import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSectionAbout from '../components/HeroSectionAbout';
import { logEvent } from '../servises/analytics';
import { useSEO } from '../hooks/useSEO';
import BreadcrumbSchema from '../components/BreadcrumbSchema';

const Section: React.FC<{ title: string; children: React.ReactNode; tone?: 'cream' | 'neutral' }> = ({
  title,
  children,
  tone = 'neutral',
}) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className={tone === 'cream' ? 'bg-cream py-16 md:py-24' : 'bg-neutral-100 py-16 md:py-24'}
  >
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6 text-center">{title}</h2>
      <div className="text-lg leading-relaxed text-charcoal/85 space-y-5">{children}</div>
    </div>
  </motion.section>
);

const AboutUs: React.FC = () => {
  const { t } = useTranslation();
  useSEO({ title: t('seo.about.title'), description: t('seo.about.description'), path: '/about' });
  logEvent({ category: 'page_view', action: 'view_about_us_page', label: 'User viewed the about us page' });

  return (
    <>
      <BreadcrumbSchema items={[{ name: t('home'), path: '/' }, { name: t('about_us'), path: '/about' }]} />
      <HeroSectionAbout />

      <Section title={t('about_us_page.story_title')}>
        <p>{t('about_us_page.story_text')}</p>
      </Section>

      <Section title={t('about_us_page.craft_title')} tone="cream">
        <p>{t('about_us_page.craft_text')}</p>
      </Section>

      <Section title={t('about_us_page.community_title')}>
        <p>{t('about_us_page.community_text')}</p>
      </Section>

      <Section title={t('about_us_page.mission_title')} tone="cream">
        <p>{t('about_us_page.mission_text')}</p>
      </Section>

      <Section title={t('about_us_page.boardgames_note_title')}>
        <p>{t('about_us_page.boardgames_note_text')}</p>
      </Section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="bg-charcoal text-cream py-16 md:py-24"
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{t('about_us_page.invitation_title')}</h2>
          <p className="text-lg leading-relaxed mb-8">{t('about_us_page.invitation_text')}</p>
          <Link
            to="/#registration-form"
            className="inline-block px-8 py-3 bg-cream text-charcoal rounded-full font-bold hover:bg-white transition-colors"
          >
            {t('hero.reserve_button')}
          </Link>
        </div>
      </motion.section>
    </>
  );
};

export default AboutUs;
