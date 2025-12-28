import React from 'react';
import { Calendar, Gamepad2, Users } from 'lucide-react';

const events = [
  {
    date: 'Friday, 19:00',
    title: 'Mafia Night',
    description: 'A night of deception, deduction, and fun. Can you survive?',
    icon: Users,
  },
  {
    date: 'Wednesday, 18:30',
    title: 'D&D for Beginners',
    description: 'New to Dungeons & Dragons? Join our introductory session and start your adventure.',
    icon: Gamepad2,
  },
  {
    date: 'Saturday, 14:00',
    title: 'Catan Tournament',
    description: 'Compete with other settlers for the lordship of Catan. Prizes for the winner!',
    icon: Gamepad2,
  },
  {
    date: 'Monday, 19:00',
    title: 'Cozy Game Night',
    description: 'A relaxed evening with a selection of light and fun board games.',
    icon: Calendar,
  },
];

const Events: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-charcoal mb-6">Upcoming Events</h1>
      <p className="text-xl text-center text-charcoal/80 max-w-2xl mx-auto mb-16">
        Join our community for a variety of exciting events, from epic tournaments to casual game nights. There's always something happening at Undercover Vibe!
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
