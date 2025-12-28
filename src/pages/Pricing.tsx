import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p>
        We offer flexible pricing options to suit your needs. Whether you want to play for a few hours or become a
        regular member, we have a plan for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Hourly Play</h2>
          <p className="text-4xl font-bold mb-4">$5/hour</p>
          <p>Perfect for a quick gaming session. Drop by anytime and play as long as you like.</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Daily Pass</h2>
          <p className="text-4xl font-bold mb-4">$15/day</p>
          <p>Enjoy a full day of unlimited gaming. Come and go as you please.</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Monthly Membership</h2>
          <p className="text-4xl font-bold mb-4">$50/month</p>
          <p>Become a member and get unlimited access to our board game library, plus exclusive perks.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
