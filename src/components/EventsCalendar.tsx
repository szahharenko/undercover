import React from 'react';
import { useTranslation } from 'react-i18next';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import FullCalendar from '@fullcalendar/react';
import dune from '../assets/dune-cover.jpg';
import kanban from '../assets/kanban-cover.jpg';
import duneExp from '../assets/dune-bloodlines-cover.jpg';

const EventsCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const events = [
      {
      title: `${t('events_calendar.game_evening')}`,
      start: '2026-02-11T18:00:00',
      end: '2026-02-05T22:00:00',
      extendedProps: {
        description: `
          <img src="${dune}" alt="Dune: Uprising" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${duneExp}" alt="Dune: Bloodlines" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${kanban}" alt="Kanban" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          Dune: Uprising wtih Bloodlines, Kanban, Marco Polo, and other games...<br/>
          ☕ Hot drinks included<br/>
          🍪🥐🥨 Snacks provided<br/>
          📍 Kivimurru tn 34 - 6, 11411 Tallinn<br/>
        `
      }
    },
    {
      title: `${t('events_calendar.game_weekend')}`,
      date: '2026-02-07',
      startTime: '12:00',
      endTime: '22:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['sa', 'su'],
        dtstart: '2026-02-07T12:00:00'
      },
      duration: '09:00'
    },
  ];

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">{t('events_calendar.title')}</h1>
      <FullCalendar
        plugins={[listPlugin, timeGridPlugin, dayGridPlugin, rrulePlugin]}
        initialView="listMonth"
        locale={i18n.language}
        eventContent={(arg) => (
          <div>
            <div className="fc-event-title"><strong>{arg.event.title}</strong></div>
            <div
              className="fc-event-desc"
              dangerouslySetInnerHTML={{
                __html: arg.event.extendedProps.description
              }}
            />
          </div>
        )}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        events={events}
      />
    </section>
  );
};

export default EventsCalendar;
