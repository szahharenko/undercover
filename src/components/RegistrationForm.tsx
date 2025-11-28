import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will get back to you shortly.');
    // Here you would typically send data to a backend
  };

  return (
    <section className="py-20 bg-beige">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          Come say hi. Your first day is on us.
        </motion.h2>

        <motion.form
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="bg-cream p-8 rounded-2xl shadow-lg border border-coffee/20 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-charcoal text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-charcoal text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@example.com"
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-charcoal text-lg font-medium mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
            />
          </div>
          <div className="relative">
            <label htmlFor="date" className="block text-charcoal text-lg font-medium mb-2">Preferred Visit Date</label>
            <input
              type="date" // Using type="date" for a native date picker
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none pr-10"
              required
            />
            <CalendarDays className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-coffee" size={24} />
          </div>
          <div>
            <label htmlFor="interest" className="block text-charcoal text-lg font-medium mb-2">I'm interested in...</label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none"
              required
            >
              <option value="">Select an option</option>
              <option value="coworking">Coworking</option>
              <option value="games">Board Games</option>
              <option value="both">Both</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RegistrationForm;
