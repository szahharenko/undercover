import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Handshake, Target } from 'lucide-react';

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
      className="p-6 rounded-2xl flex flex-col items-center text-center"
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
      icon: () => <ShieldCheck className="w-16 h-16 mb-4 text-coffee" strokeWidth={1.5} />,
      title: t('coworking_experience.features.comfort.title'),
      description: t('coworking_experience.features.comfort.description'),
    },
    {
      icon: () => <Handshake className="w-16 h-16 mb-4 text-coffee" strokeWidth={1.5} />,
      title: t('coworking_experience.features.coffee.title'),
      description: t('coworking_experience.features.coffee.description'),
    },
    {
      icon: () => <Target className="w-16 h-16 mb-4 text-coffee" strokeWidth={1.5} />,
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

        <div className="grid lg:grid-cols-3 gap-8 max-w-[1500px] mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoworkingExperience;