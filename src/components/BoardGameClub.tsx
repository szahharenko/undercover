import React from 'react';
import { motion } from 'framer-motion';
import { Dice5, Crown, CalendarDays } from 'lucide-react';

interface GameFeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const GameFeatureCard: React.FC<GameFeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="bg-coffee p-6 rounded-2xl shadow-lg border border-cream/20 flex flex-col items-center text-center text-cream"
    >
      <Icon className="w-12 h-12 text-sage-green mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-cream/80">{description}</p>
    </motion.div>
  );
};

const BoardGameClub: React.FC = () => {
  const features = [
    {
      icon: Dice5,
      title: "Curated Game Collection",
      description: "Explore a vast and unique collection of board games, from classic strategies to the latest releases.",
    },
    {
      icon: Crown,
      title: "Exclusive Private Tables",
      description: "Enjoy your game nights in privacy and comfort with dedicated tables for you and your friends.",
    },
    {
      icon: CalendarDays,
      title: "Thrilling Tournaments",
      description: "Test your skills in our regular tournaments and compete for glory and exciting prizes.",
    },
  ];

  return (
    <section className="py-20 bg-charcoal text-cream">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-cream text-center mb-12"
        >
          Unwind & Play: The VIP Board Game Club
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GameFeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardGameClub;
