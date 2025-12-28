import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Gamepad2, Users } from 'lucide-react';

const Events: React.FC = () => {
  const { t } = useTranslation();
  const events = [
    {
      date: t('events_page.events.mafia.date'),
      title: t('events_page.events.mafia.title'),
      description: t('events_page.events.mafia.description'),
      icon: Users,
    },
    {
      date: t('events_page.events.dnd.date'),
      title: t('events_page.events.dnd.title'),
      description: t('events_page.events.dnd.description'),
      icon: Gamepad2,
    },
    {
      date: t('events_page.events.catan.date'),
      title: t('events_page.events.catan.title'),
      description: t('events_page.events.catan.description'),
      icon: Gamepad2,
    },
    {
      date: t('events_page.events.cozy.date'),
      title: t('events_page.events.cozy.title'),
      description: t('events_page.events.cozy.description'),
      icon: Calendar,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-charcoal mb-6">{t('events_page.title')}</h1>
      <p className="text-xl text-center text-charcoal/80 max-w-2xl mx-auto mb-16">
        {t('events_page.subtitle')}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div key={index} className="bg-cream p-8 rounded-2xl shadow-lg flex items-start space-x-6">
            <div className="bg-coffee text-cream p-4 rounded-xl">
              <event.icon size={32} />
            </div>
            <div>
              <p className="text-charcoal/80 font-semibold">{event.date}</p>
              <h3 className="text-2xl font-bold text-charcoal mt-1 mb-2">{event.title}</h3>
              <p className="text-charcoal/80">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
