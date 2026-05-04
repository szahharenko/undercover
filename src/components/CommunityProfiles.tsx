import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';

interface Profile {
  role: string;
  description: string;
}

const CommunityProfiles: React.FC = () => {
  const { t } = useTranslation();
  const profiles = t('community_profiles.profiles', { returnObjects: true }) as Profile[];

  return (
    <section className="py-20 bg-charcoal text-cream">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-4"
        >
          {t('community_profiles.title')}
        </motion.h2>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-cream/70 max-w-2xl mx-auto mb-12"
        >
          {t('community_profiles.subtitle')}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-cream/10 rounded-2xl p-6 text-center"
            >
              <Briefcase className="w-8 h-8 text-coffee mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-bold text-lg mb-1">{profile.role}</h3>
              <p className="text-cream/60 text-sm">{profile.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityProfiles;
