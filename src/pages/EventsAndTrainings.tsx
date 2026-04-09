import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSectionEventsTrainings from '../components/HeroSectionEventsTrainings';
import { logEvent } from '../servises/analytics';
import { SocialIcons } from '../components/SocialIcons';
import { SocialContacts } from '../components/SocialContacts';
import { useSEO } from '../hooks/useSEO';
import StructuredData from '../components/StructuredData';
import BreadcrumbSchema from '../components/BreadcrumbSchema';

const EventsAndTrainings: React.FC = () => {
  const { t } = useTranslation();
  useSEO({ title: t('seo.eventsTrainings.title'), description: t('seo.eventsTrainings.description'), path: '/events-and-trainings' });
  logEvent({ category: 'page_view', action: 'view_events_trainings_page', label: 'User viewed the events and trainings page' });

  return (
    <>
      <BreadcrumbSchema items={[{ name: t('home'), path: '/' }, { name: t('events_and_trainings'), path: '/events-and-trainings' }]} />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Undercover Vibe Event & Training Space',
        'description': t('seo.eventsTrainings.description'),
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Undercover Vibe',
          'url': 'https://undercover.ee',
        },
        'areaServed': {
          '@type': 'City',
          'name': 'Tallinn',
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': t('events_trainings_page.pricing.title'),
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': t('events_trainings_page.pricing.whole_space.title'),
                'description': t('events_trainings_page.pricing.whole_space.description'),
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': t('events_trainings_page.pricing.training_room.title'),
                'description': t('events_trainings_page.pricing.training_room.description'),
              },
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': t('events_trainings_page.pricing.team_building.title'),
                'description': t('events_trainings_page.pricing.team_building.description'),
              },
            },
          ],
        },
      }} />
      <HeroSectionEventsTrainings />

      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('events_trainings_page.pricing.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('events_trainings_page.pricing.whole_space.title')}</h2>
            <p>{t('events_trainings_page.pricing.whole_space.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('events_trainings_page.pricing.training_room.title')}</h2>
            <p>{t('events_trainings_page.pricing.training_room.description')}</p>
          </div>
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{t('events_trainings_page.pricing.team_building.title')}</h2>
            <p>{t('events_trainings_page.pricing.team_building.description')}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('events_trainings_page.includes.title')}</h1>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>{t('events_trainings_page.includes.item1')}</li>
          <li>{t('events_trainings_page.includes.item2')}</li>
          <li>{t('events_trainings_page.includes.item3')}</li>
          <li>{t('events_trainings_page.includes.item4')}</li>
          <li>{t('events_trainings_page.includes.item5')}</li>
        </ul>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('events_trainings_page.booking.title')}</h1>
        <p className="mt-4">{t('events_trainings_page.booking.description')}</p>
        <div className='flex flex-col p-2 w-full md:w-[50%]'>
          <div className="flex p-4 space-x-6">
            <SocialIcons/>
          </div>
          <SocialContacts/>
        </div>
      </div>
    </>
  );
};

export default EventsAndTrainings;
