import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import kivimurru from '../assets/kivimurru-house.jpg';
import { EmailService, type EmailPayload } from '../servises/send-email';

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const [emailSend, setEmailSend] = useState<boolean>(false);
  const [emailSending, setEmailSending] = useState<boolean>(false);
  const [emailSendingError, setEmailSendingError] = useState<string | null>(null);
  const minDate = useMemo(() => new Date(new Date().getTime() + 86400000).toISOString().split('T')[0], []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailData: EmailPayload = {
      email: formData.email,
      name: formData.name,
      data: formData,
      type: 'trial',
      message: formData.message,
    };

    // 2. Call the service
    const result = await EmailService.send(emailData);

    // 3. Handle the result
    if (result.status === 'success') {
      setEmailSend(true);
      setEmailSending(false);
      setEmailSendingError(null);
    } else {

      setEmailSending(false);
      setEmailSendingError(result.message);
    }
  };
  return (
    // tablet and mobile responsive design
    <section className="p-20 md:flex " id="registration-form">
      <div className="container mx-auto px-4 mb-8 max-w-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          {t('form.title')}
        </motion.h2>
        { emailSend ?
            <div className="bg-cream p-8 rounded-2xl shadow-lg border border-coffee/20 space-y-6  text-center"
>              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-extrabold text-charcoal text-center mb-12"
              >
                {t('form.thank_you_title')}
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="text-charcoal text-center"
              >
                {t('form.thank_you_message')}
              </motion.p>
              <button onClick={() => setEmailSend(false)} className="mt-6 px-6 py-3 bg-sage-green text-white rounded-xl hover:bg-sage-green-dark transition">
                {t('form.send_another')}
              </button>
            </div>
            :
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
              <div>
                <label htmlFor="phone" className="block text-charcoal text-lg font-medium mb-2">{t('form.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('form.phone_placeholder')}
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
                  min={ minDate }
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none pr-10"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="message" className="block text-charcoal text-lg font-medium mb-2">{t('form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none pr-10"
                  placeholder={t('form.message_placeholder')}             />
              </div>
              <motion.button
                disabled={emailSending}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
              >
                {t('form.submit_button')}
              </motion.button>
              { emailSendingError && (
                <p className="text-red-600 text-center mt-4">{t('form.error_message')}: {emailSendingError}</p>
              ) }
            </motion.form>
        }
      </div>
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          {t('form.contact_us')}
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-charcoal text-center"
        >
          <p>
            <a href="mailto:info@undercover.ee" className="text-coffee hover:underline ml-2">
              info@undercover.ee
            </a><br/>
            <a href="tel:+37255512345" className="text-coffee hover:underline ml-2">
              +372 5154369
            </a>

          </p>
          <p className="mt-2">
          </p>
          <p>
            <a href="https://t.me/Acrashik" className="text-coffee hover:underline ml-2">Telegram</a> |
            <a href="https://wa.me/3725154369" className="text-coffee hover:underline ml-2">WhatsApp</a> |
            <a href="https://www.facebook.com/undercovervibe" className="text-coffee hover:underline ml-2">Facebook</a>
          </p>
          <br/>
          <p>
            <span className="ml-2">Kivimurru 34 - 6, Tallinn, Estonia</span>
          </p>
          <img src={kivimurru} alt="Kivimurru Address" className="mx-auto my-4 rounded-lg" />

        </motion.p>
      </div>
    </section>
  );
};

export default RegistrationForm;
