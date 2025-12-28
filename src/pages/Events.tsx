import React from 'react';

const Events: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Events</h1>
      <p>
        We host a variety of events throughout the month, from tournaments and learn-to-play sessions to themed game
        nights. Check out our calendar to see what's coming up!
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <ul className="list-disc pl-5">
          <li>
            <span className="font-bold">January 10th:</span> Catan Tournament
          </li>
          <li>
            <span className="font-bold">January 17th:</span> Learn to Play: Wingspan
          </li>
          <li>
            <span className="font-bold">January 24th:</span> Cooperative Game Night
          </li>
          <li>
            <span className="font-bold">January 31st:</span> Social Deduction Saturday
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Events;
