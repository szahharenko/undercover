import React from 'react';
import RegistrationFormContent from './RegistrationFormContent';

/**
 * Inline registration section for the homepage. Renders the same form
 * markup as the modal (form-only there) plus the contact details column,
 * wrapped in a section with the #registration-form anchor for legacy
 * in-page links and scroll behavior.
 */
const RegistrationForm: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4" id="registration-form">
      <RegistrationFormContent variant="inline" source="inline_section" />
    </section>
  );
};

export default RegistrationForm;
