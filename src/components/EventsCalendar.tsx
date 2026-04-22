import React from 'react';
import { useTranslation } from 'react-i18next';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import rrulePlugin from '@fullcalendar/rrule'
import FullCalendar from '@fullcalendar/react';
import dune from '../assets/dune-cover.jpg';
import kanban from '../assets/kanban-cover.jpg';
import noThanks from '../assets/nothanks.webp';
import austria from '../assets/austria.jpg';
import istanbul from '../assets/istanbul.webp';
import balance from '../assets/balance.jpg'


const EventsCalendar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const events = [
      {
      title: `${t('events_calendar.game_evening')}`,
      start: '2026-02-11T18:00:00',
      end: '2026-02-05T22:00:00',
      extendedProps: {
        description: `
          <img src="${noThanks}" alt="No Thanks" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${dune}" alt="Dune: Uprising" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${kanban}" alt="Kanban" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <strong>No Thanks!</strong> friendly opening tournament<br/>
          Dune: Uprising, Kanban, Marco Polo, and any other games could be played later<br/>
          ☕ Hot drinks included<br/>
          🍪🥐🥨 Snacks provided<br/>
          📍 Kivimurru tn 34 - 6, 11411 Tallinn<br/>
        `
      }
    },
    {
      title: `${t('events_calendar.game_evening')}`,
      start: '2026-03-21T16:00:00',
      end: '2026-03-21T23:59:00',
      extendedProps: {
        description: `
          <img src="${austria}" alt="Austria" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${istanbul}" alt="Istanbul" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <img src="${dune}" alt="Dune: Uprising" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;"/>
          <strong>Grand Austria Hotel</strong>, Dune: Uprising, Istanbul.<br/>
          Register in <a href="https://t.me/undercovervibe" className="hover:text-sage-green transition-colors" aria-label="Telegram"><u>Telegram</u></a> or suggest your games<br/>
          ☕ Hot drinks included<br/>
          🍪🥐🥨 Snacks provided<br/>
          📍 Kivimurru tn 34 - 6, 11411 Tallinn<br/>
        `
      }
    },
    {
      title: `${t('events_calendar.game_evening')}`,
      start: '2026-03-28T16:00:00',
      end: '2026-03-28T23:59:00',
      extendedProps: {
        description: `
          Register in <a href="https://t.me/undercovervibe" className="hover:text-sage-green transition-colors" aria-label="Telegram"><u>Telegram</u></a> or suggest your games<br/>
          ☕ Hot drinks included<br/>
          🍪🥐🥨 Snacks provided<br/>
          📍 Kivimurru tn 34 - 6, 11411 Tallinn<br/>
        `
      }
    },
    {
      title: `🕵️ Private Event (Balance Tallinn)`,
      date: '2026-02-07',
      startTime: '14:00',
      endTime: '20:00',
      rrule: {
        freq: 'weekly',
        byweekday: ['su'],
        dtstart: '2026-02-07T14:00:00'
      },
      extendedProps: {
        description: `<div style="clear: both; padding-top: 0.5rem;"/>
          <img src="${balance}" alt="Balance" style="height: 8rem;margin-right: 1rem;margin-bottom: 0.5rem;float:left;width:50px;height:50px;"/>
          Сообщество любителей настольных игр: от лёгких филлеров до хардкорных стратегий. Регулярные встречи, честная конкуренция и хорошая компания.
        `
      },
      duration: '04:00'
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
