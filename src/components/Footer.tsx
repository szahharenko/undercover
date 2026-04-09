import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import cat from '../assets/cat-left.png';
import dog from '../assets/dog-right.png';
import { SocialIcons } from './SocialIcons';
import { SocialContacts } from './SocialContacts';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-charcoal text-cream p-10 py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="">
          <div className='flex items-center w-full justify-between max-w-[700px] mx-auto'>
            <img src={cat} alt="Undercover Vibe mascot cat illustration" className='max-h-[150px] h-auto'/>
            <div className='flex flex-col md:flex-row w-full items-center'>
              <div className='flex text-center flex-col p-2 w-full md:w-[50%]'>
                <h3 className="text-xl font-bold mb-4">{t('footer.social_title')}</h3>
                <div className="flex justify-center p-4 space-x-6">
                  <SocialIcons/>
                </div>
              </div>
              <div className='flex flex-col w-full md:w-[50%]'>
                <h3 className="text-xl font-bold mb-4">{t('footer.location_title')}</h3>
                <SocialContacts/>
              </div>
            </div>
            <img src={dog} alt="Undercover Vibe mascot dog illustration" className='max-h-[150px] h-auto'/>
          </div>
        </div>

        <div className="pt-8 text-sm">
          &copy; {new Date().getFullYear()} Undercover Vibe. {t('footer.rights_reserved')}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
