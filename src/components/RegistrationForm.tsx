import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarDays } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t('form.submit_alert'));
    // Here you would typically send data to a backend
  };

  return (
    <section className="p-20 bg-beige">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          {t('form.title')}
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
            <label htmlFor="name" className="block text-charcoal text-lg font-medium mb-2">{t('form.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('form.name_placeholder')}
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-charcoal text-lg font-medium mb-2">{t('form.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form.email_placeholder')}
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="date" className="block text-charcoal text-lg font-medium mb-2">{t('form.date')}</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none pr-10"
              required
            />
            <CalendarDays className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-coffee" size={24} />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
          >
            {t('form.submit_button')}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RegistrationForm;
