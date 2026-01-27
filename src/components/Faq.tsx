import React from 'react';
import { useTranslation } from 'react-i18next';

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const parseFaq = (markdown: string) => {
    const sections = markdown.split('\n# ').filter(Boolean); // Split by "# " and remove empty strings
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const question = lines[0].startsWith('#') ? lines[0].substring(1).trim() : lines[0].trim();
      const answer = lines.slice(1).join('\n').replace(/(?:\r\n|\r|\n)/g, '<br>').trim();
      return (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{question}</h2>
          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      );
    });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t('faq.title')}</h1>
      <div className='py-4'>
        {parseFaq(t('faq.content'))}
      </div>
    </section>
  );
};

export default Faq;
