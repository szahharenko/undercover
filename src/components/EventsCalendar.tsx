import React from 'react';
import { useTranslation } from 'react-i18next';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import FullCalendar from '@fullcalendar/react';

const EventsCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{t('events_calendar.title')}</h1>
      <FullCalendar
        plugins={[listPlugin, timeGridPlugin, dayGridPlugin, rrulePlugin]}
        initialView="listMonth"
        locale={i18n.language}
        events={[
          {
            title: `18:00 - 22:00 ${t('events_calendar.game_evening')}`,
            date: '2026-02-05',
            rrule: {
              freq: 'weekly',
              byweekday: ['we'],
              dtstart: '2026-02-05T18:00:00'
            },
            duration: '05:00'
          },

          {
            title: `12:00 - 21:00 ${t('events_calendar.game_weekend')}`,
            date: '2026-02-05',
            startTime: '12:00',
            endTime: '22:00',
            rrule: {
              freq: 'weekly',
              byweekday: ['sa', 'su'],
              dtstart: '2026-02-05T12:00:00'
            },
            duration: '09:00'
          },
        ]}
      />
    </section>
  );
};

export default EventsCalendar;
