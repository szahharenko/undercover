import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import kivimurru from '../assets/kivimurru-house.jpg';
import { EmailService, type EmailPayload } from '../servises/send-email';
import { FaTelegramPlane, FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaLocationArrow } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { logEvent } from '../servises/analytics';
import NativeDateInput from './DatePicker';

type Variant = 'inline' | 'modal';

interface Props {
  /** 'inline' = used inside the on-page section. 'modal' = used inside RegistrationModal. */
  variant?: Variant;
  /** Optional callback fired after a successful submission (e.g. to close the modal after a delay). */
  onSuccess?: () => void;
  /** Analytics label for where the form was opened from. */
  source?: string;
}

const RegistrationFormContent: React.FC<Props> = ({ variant = 'inline', onSuccess, source }) => {
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
    logEvent({
      category: 'user_interaction',
      action: 'change_registration_form_field',
      label: `User changed the ${e.target.name} field`,
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSending(true);
    const emailData: EmailPayload = {
      email: formData.email,
      name: formData.name,
      data: { ...formData, source: source ?? variant },
      type: 'trial',
      message: formData.message,
    };
    logEvent({
      category: 'user_interaction',
      action: 'submit_registration_form',
      label: `User submitted the registration form (${source ?? variant})`,
    });
    const result = await EmailService.send(emailData);

    if (result.status === 'success') {
      logEvent({
        category: 'form_submission',
        action: 'submit_registration_form_success',
        label: `User submitted the registration form successfully (${source ?? variant})`,
      });
      setEmailSend(true);
      setEmailSending(false);
      setEmailSendingError(null);
      onSuccess?.();
    } else {
      logEvent({
        category: 'form_submission',
        action: 'submit_registration_form_error',
        label: `User encountered an error submitting the registration form (${source ?? variant})`,
      });
      setEmailSending(false);
      setEmailSendingError(result.message);
    }
  };

  const sectionAnim =
    variant === 'inline'
      ? {
          initial: { y: -20, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6 },
        }
      : { initial: false, animate: { y: 0, opacity: 1 } };

  const formAnim =
    variant === 'inline'
      ? {
          initial: { y: 50, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7 },
        }
      : { initial: false, animate: { y: 0, opacity: 1 } };

  const wrapperClass =
    variant === 'inline'
      ? 'mx-auto max-w-6xl flex flex-col md:flex-row gap-10 md:gap-12 items-start justify-center'
      : 'w-full';

  const formColClass =
    variant === 'inline'
      ? 'w-full md:flex-1 md:max-w-xl mx-auto'
      : 'w-full';

  const formTitleClass =
    variant === 'inline'
      ? 'text-3xl md:text-4xl font-extrabold text-charcoal text-center mb-8'
      : 'text-2xl md:text-3xl font-extrabold text-charcoal text-center mb-6';

  return (
    <div className={wrapperClass}>
      <div className={formColClass}>
        <motion.h2 {...sectionAnim} className={formTitleClass}>
          {t('form.title')}
        </motion.h2>
        {emailSend ? (
          <div className="bg-cream p-8 rounded-2xl shadow-lg border border-coffee/20 space-y-6 text-center">
            <motion.h2
              {...sectionAnim}
              className="text-3xl md:text-4xl font-extrabold text-charcoal text-center mb-6"
            >
              {t('form.thank_you_title')}
            </motion.h2>
            <motion.p {...formAnim} className="text-charcoal text-center">
              {t('form.thank_you_message')}
            </motion.p>
            <button
              onClick={() => setEmailSend(false)}
              className="mt-6 px-6 py-3 bg-sage-green text-white rounded-xl hover:bg-sage-green-dark transition"
            >
              {t('form.send_another')}
            </button>
          </div>
        ) : (
          <motion.form
            {...formAnim}
            onSubmit={handleSubmit}
            className="bg-cream p-6 md:p-8 rounded-2xl shadow-lg border border-coffee/20 space-y-5"
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
              <label htmlFor="phone" className="block text-charcoal text-lg font-medium mb-2">
                {t('form.phone')} <span className="text-charcoal/50 text-sm font-normal">({t('form.optional')})</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('form.phone_placeholder')}
                className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all"
              />
            </div>
            <div className="relative">
              <label htmlFor="date" className="block text-charcoal text-lg font-medium mb-2">{t('form.date')}</label>
              <NativeDateInput
                value={formData.date}
                minDateValue={minDate}
                inputName="date"
                onChange={handleChange}
                className="w-full p-3 border border-coffee/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 transition-all appearance-none pr-10"
                required={true}
                disableWeekends={true}
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
                placeholder={t('form.message_placeholder')}
              />
            </div>
            <motion.button
              disabled={emailSending}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-coffee text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60"
            >
              {t('form.submit_button')}
            </motion.button>
            {emailSendingError && (
              <p className="text-red-600 text-center mt-4">
                {t('form.error_message')}: {emailSendingError}
              </p>
            )}
          </motion.form>
        )}
      </div>

      {variant === 'inline' && (
        <div className="w-full md:flex-1 md:max-w-xl mx-auto">
          <motion.h2
            {...sectionAnim}
            className="text-3xl md:text-4xl font-extrabold text-charcoal text-center mb-8"
          >
            {t('form.contact_us')}
          </motion.h2>
          <motion.div {...formAnim} className="text-charcoal text-center">
            <div>
              <a href="mailto:info@undercover.ee" className="text-coffee hover:underline ml-2">
                <MdMailOutline size={16} style={{ display: 'inline' }} /> info@undercover.ee
              </a>
              <br />
              <a href="tel:+3725154369" className="text-coffee hover:underline ml-2">
                <FaPhone size={16} style={{ display: 'inline' }} /> +372 5154369
              </a>
            </div>
            <div className="mt-2"></div>
            <div>
              <a href="https://t.me/acrashik" className="text-coffee hover:underline ml-2">
                <FaTelegramPlane style={{ display: 'inline' }} size={16} /> Telegram
              </a>{' '}
              |
              <a href="https://wa.me/3725154369" className="text-coffee hover:underline ml-2">
                <FaWhatsapp style={{ display: 'inline' }} size={16} /> WhatsApp
              </a>{' '}
              |
              <a href="https://www.facebook.com/undercovervibe" className="text-coffee hover:underline ml-2">
                <FaFacebook style={{ display: 'inline' }} size={16} /> Facebook
              </a>
              <a href="https://www.instagram.com/undercovertallinn" className="text-coffee hover:underline ml-2">
                <FaInstagram style={{ display: 'inline' }} size={16} /> Instagram
              </a>
            </div>
            <br />
            <div>
              <span className="ml-2">
                <FaLocationArrow style={{ display: 'inline' }} size={16} /> Kivimurru 34 - 6, Tallinn, Estonia
              </span>
            </div>
            <img src={kivimurru} alt="Kivimurru Address" className="mx-auto my-4 rounded-lg" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RegistrationFormContent;
