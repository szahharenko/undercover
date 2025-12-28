import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Our Pricing</h1>
      <p className="text-lg text-center mb-12">
        We offer flexible pricing options to suit your needs. Whether you're here for a day of work or a month of productivity, we have a plan for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Day Pass</h2>
          <p className="text-4xl font-bold mb-4">€15</p>
          <p>Perfect for a day of focused work. Includes access to all common areas and amenities.</p>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Monthly Desk</h2>
          <p className="text-4xl font-bold mb-4">€200</p>
          <p>Your own dedicated desk for the month. Includes 24/7 access and all the perks of our community.</p>
        </div>
        <div className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Meeting Room</h2>
          <p className="text-4xl font-bold mb-4">€25/hour</p>
          <p>A private, fully-equipped room for your meetings and presentations. Seats up to 8 people.</p>
        </div>
      </div>
      <div className="mt-12 text-center bg-sage-green text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">Big Brain USP!</h2>
        <p className="text-xl mt-2">
          For all our coworking residents, board games are <span className="font-bold">completely free</span> in the evening!
        </p>
      </div>
    </div>
  );
};

export default Pricing;
