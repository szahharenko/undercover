import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import bggs from '../assets/bggs.jpg';
import { useNavigate } from "react-router-dom";
import { t } from 'i18next';


const BGGUrl = 'https://boardgamegeek.com/collection/user/acrashik?sort=rank&sortdir=asc&rankobjecttype=subtype&rankobjectid=1&columns=title%7Cthumbnail%7Cstatus%7Crank%7Crating%7Cbggrating%7Cplays%7Ccomment&geekranks=Board%20Game%20Rank&excludesubtype=boardgameexpansion&own=1&objecttype=thing&ff=1&subtype=boardgame';

interface GameFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: () => void;
}

const GameFeatureCard: React.FC<GameFeatureCardProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-2xl shadow-lg  flex flex-col items-center text-center text-cream"
      style={{background: '#3f3a60c9'}}
    >
      <Icon className="w-12 h-12 text-sage-green mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-cream/80">{description}</p>
      {action && (
        <button onClick={action} className="mt-4 px-4 py-2 text-white transparent underline transition">
          {t('learn_more')}
        </button>
      )}
    </motion.div>
  );
};

const BoardGameClub: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const eventsAction = () => {
    const element = document.getElementById('events-calendar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/boardgames#events-calendar');
    }
  }
  const features = [
    {
      icon: () => <img src="https://boardgamegeek.com/favicon.ico" alt="BGG Icon" className="w-12 h-12 mb-4" />,
      title: t('board_game_club.features.tables.title'),
      description: t('board_game_club.features.tables.description'),
    },
    {
      icon: () => <img src="https://boardgamegeek.com/favicon.ico" alt="BGG Icon" className="w-12 h-12 mb-4" />,
      title: t('board_game_club.features.tournaments.title'),
      description: t('board_game_club.features.tournaments.description'),
      action: eventsAction
    },
    {
      icon: () => <img src="https://boardgamegeek.com/favicon.ico" alt="BGG Icon" className="w-12 h-12 mb-4" />,
      title: t('board_game_club.features.collection.title'),
      description: t('board_game_club.features.collection.description'),
    },
  ];


    return     <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="main-hero relative bg-cream min-h-[70vh] flex items-center justify-center text-center p-8 overflow-hidden"
    >
      {/* Background elements for warm lighting and armchairs - implied via styling/color */}
      <div className="absolute w-full h-full z-1">
        <img src={bggs} alt="Undercover workspace" className="w-full h-full object-cover" />
      </div>
      <div className="absolute w-full h-full z-2 opacity-80 bg-charcoal"/>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4"
        >
          {t('board_game_club.title')}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-2xl text-white max-w-2xl mx-auto"
        >
          {t('board_game_club.subtitle')}
        </motion.p>
        <section className="p-20 text-cream">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <GameFeatureCard key={index} {...feature} />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center p-20">
              <motion.button
                onClick={() => window.open(BGGUrl, '_blank')}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="px-8 py-3 text-cream rounded-2xl text-lg font-semibold shadow-lg hover:bg-opacity-90 transition-all duration-300"
                style={{background: '#ff5100'}}
              >
                {t('board_game_club.bgg_link')}
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </motion.section>
};

export default BoardGameClub;
