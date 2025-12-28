import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Coffee, Wifi, Armchair, MoonStar } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-cream p-6 rounded-2xl shadow-lg border border-coffee/20 flex flex-col items-center text-center"
    >
      <Icon className="w-12 h-12 text-coffee mb-4" />
      <h3 className="text-xl font-bold text-charcoal mb-2">{title}</h3>
      <p className="text-charcoal/80">{description}</p>
    </motion.div>
  );
};

const CoworkingExperience: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: Armchair,
      title: t('coworking_experience.features.comfort.title'),
      description: t('coworking_experience.features.comfort.description'),
    },
    {
      icon: Wifi,
      title: t('coworking_experience.features.wifi.title'),
      description: t('coworking_experience.features.wifi.description'),
    },
    {
      icon: Coffee,
      title: t('coworking_experience.features.coffee.title'),
      description: t('coworking_experience.features.coffee.description'),
    },
    {
      icon: MoonStar,
      title: t('coworking_experience.features.atmosphere.title'),
      description: t('coworking_experience.features.atmosphere.description'),
    },
  ];

  return (
    <section className="p-20 bg-beige">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-charcoal text-center mb-12"
        >
          {t('coworking_experience.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoworkingExperience;