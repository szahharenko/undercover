import React from 'react';
import { useTranslation } from 'react-i18next';

const BoardGames: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{t('board_games_page.title')}</h1>
      <p>
        {t('board_games_page.description_1')}
      </p>
      <p>
        {t('board_games_page.description_2')}
      </p>
    </div>
  );
};

export default BoardGames;
