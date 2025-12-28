import React from 'react';
import { useTranslation } from 'react-i18next';

const founders = [
  {
    name: 'John Doe',
    role: 'Co-Founder & Board Game Guru',
    bio: 'John is a lifelong board game enthusiast with a passion for creating community spaces. He loves nothing more than introducing new players to the hobby and seeing the joy it brings.',
    image: 'https://source.unsplash.com/random/400x400/?portrait,man',
  },
  {
    name: 'Jane Doe',
    role: 'Co-Founder & Coworking Champion',
    bio: 'Jane believes that a great workspace can inspire great work. She is dedicated to creating a comfortable, productive, and welcoming environment for all our members.',
    image: 'https://source.unsplash.com/random/400x400/?portrait,woman',
  },
];

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center text-charcoal mb-6">{t('about_us_page.title')}</h1>
      <p className="text-xl text-center text-charcoal/80 max-w-3xl mx-auto mb-16">
        {t('about_us_page.subtitle')}
      </p>

      <div className="bg-cream p-12 rounded-2xl shadow-lg mb-16">
        <h2 className="text-4xl font-bold text-charcoal mb-4">{t('about_us_page.mission_title')}</h2>
        <p className="text-lg text-charcoal/80">
          {t('about_us_page.mission_text')}
        </p>
      </div>

      <div>
        <h2 className="text-4xl font-bold text-center text-charcoal mb-12">{t('about_us_page.team_title')}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="text-center">
              <img src={founder.image} alt={founder.name} className="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg" />
              <h3 className="text-2xl font-bold text-charcoal">{founder.name}</h3>
              <p className="text-sage-green font-semibold mb-2">{founder.role}</p>
              <p className="text-charcoal/80 max-w-sm mx-auto">{founder.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
