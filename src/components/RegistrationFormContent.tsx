import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EmailService, type EmailPayload } from '../servises/send-email';
import { logEvent } from '../servises/analytics';
import NativeDateInput from './DatePicker';

type Variant = 'inline' | 'modal';

interface Props {
  /** 'inline' = used inside the on-page section. 'modal' = used inside RegistrationModal (no in-view animations, no large title duplication). */
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

  // Animation props are conditional: only animate on inline (in-view) usage.
  // In a modal, framer-motion's whileInView won't trigger reliably, and it's not needed visually.
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

  const layoutClass = variant === 'inline' ? 'md:flex' : 'flex flex-col gap-8';

  return (
    <div className={layoutClass}>
      <div className={variant === 'inline' ? 'container mx-auto px-4 mb-8 max-w-2xl' : 'w-full'}>
        <motion.h2
          {...sectionAnim}
          className={
            variant === 'inline'
              ? 'text-4xl font-extrabold text-charcoal text-center mb-12'
              : 'text-2xl md:text-3xl font-extrabold text-charcoal text-center mb-6'
          }
        >
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
    </div>
  );
};

export default RegistrationFormContent;
