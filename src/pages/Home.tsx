import React from 'react';
import HeroSection from '../components/HeroSection';
import CoworkingExperience from '../components/CoworkingExperience';
import BoardGameClub from '../components/BoardGameClub';
import RegistrationForm from '../components/RegistrationForm';
import { logEvent } from '../servises/analytics';
import GalleryByFolder from '../components/GalleryByFolder';
import { useTranslation } from 'react-i18next';
import GoogleReviews from '../components/Review';
import { useSEO } from '../hooks/useSEO';

const Home: React.FC = () => {
  const { t } = useTranslation();
  useSEO({ title: t('seo.home.title'), description: t('seo.home.description'), path: '/' });

  logEvent({ category: 'page_view', action: 'view_home_page', label: 'User viewed the home page' });

  const urlParams = new URLSearchParams(window.location.search);
  const camp = urlParams.get('camp');
  if (camp) {
    logEvent({ category: 'campaign', action: 'campaign_parameter_detected', label: `Campaign parameter detected: ${camp}` });
  }

  const mainImagesGlob = import.meta.glob(`../assets/office/*.{jpg,jpeg,png,webp}`, { eager: true, import: 'default' });
  const thumbsGlob = import.meta.glob(`../assets/office/thumbs/*.{jpg,jpeg,png,webp}`, { eager: true, import: 'default' });


  return (
    <>
      <HeroSection />
      <CoworkingExperience />
      <BoardGameClub />
      <GalleryByFolder mainImagesGlob={mainImagesGlob} thumbsGlob={thumbsGlob} title={t('atmosphere_gallery.title')} description={t('atmosphere_gallery.description')} />
      <RegistrationForm />
      <GoogleReviews />
    </>
  );
};

export default Home;
