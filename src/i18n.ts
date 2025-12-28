import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          coworking_and_board_games: 'Coworking & Board Games',
          about_us: 'About Us',
          pricing: 'Pricing',
          board_games: 'Board Games',
          events: 'Events',
          book_a_visit: 'Book a Visit',
          form: {
            title: 'Book a Free Trial Day',
            name: 'Name',
            name_placeholder: 'Your Name',
            email: 'Email',
            email_placeholder: 'your@example.com',
            date: 'Preferred Visit Date',
            submit_button: 'Book My Free Day',
            submit_alert: 'Thank you for your interest! We will get back to you shortly.',
          },
          about_us_page: {
            title: 'About Us',
            subtitle: 'Welcome to our board game cafe! We are a cozy place for you to hang out with friends, family, or by yourself.',
            mission_title: 'Our Mission',
            mission_text: 'Our mission is to create a vibrant and inclusive community for board game enthusiasts. We believe in the power of board games to bring people together, foster creativity, and create lasting memories.',
            team_title: 'Meet the Founders',
          },
        }
      },
      et: {
        translation: {
          coworking_and_board_games: 'Coworking & Lauamängud',
          about_us: 'Meist',
          pricing: 'Hinnakiri',
          board_games: 'Lauamängud',
          events: 'Üritused',
          book_a_visit: 'Broneeri Külastus',
          form: {
            title: 'Broneeri Tasuta Proovipäev',
            name: 'Nimi',
            name_placeholder: 'Sinu Nimi',
            email: 'E-post',
            email_placeholder: 'sinu@näide.com',
            date: 'Eelistatud külastuse kuupäev',
            submit_button: 'Broneeri Minu Tasuta Päev',
            submit_alert: 'Täname huvi eest! Võtame teiega peagi ühendust.',
          },
          about_us_page: {
            title: 'Meist',
            subtitle: 'Tere tulemast meie lauamängukohvikusse! Oleme hubane koht, kus saate aega veeta sõprade, perega või üksi.',
            mission_title: 'Meie Missioon',
            mission_text: 'Meie missioon on luua elav ja kaasav kogukond lauamänguhuvilistele. Usume, et lauamängudel on jõud inimesi kokku tuua, loovust soodustada ja püsivaid mälestusi luua.',
            team_title: 'Tutvuge Asutajatega',
          },
        }
      },
      ru: {
        translation: {
          coworking_and_board_games: 'Коворкинг и настольные игры',
          about_us: 'О нас',
          pricing: 'Цены',
          board_games: 'Настольные игры',
          events: 'События',
          book_a_visit: 'Забронировать визит',
          form: {
            title: 'Забронировать бесплатный пробный день',
            name: 'Имя',
            name_placeholder: 'Ваше Имя',
            email: 'Электронная почта',
            email_placeholder: 'ваш@пример.com',
            date: 'Предпочтительная дата визита',
            submit_button: 'Забронировать мой бесплатный день',
            submit_alert: 'Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время.',
          },
          about_us_page: {
            title: 'О нас',
            subtitle: 'Добро пожаловать в наше кафе настольных игр! Мы - уютное место, где вы можете провести время с друзьями, семьей или в одиночестве.',
            mission_title: 'Наша миссия',
            mission_text: 'Наша миссия - создать живое и инклюзивное сообщество для любителей настольных игр. Мы верим в силу настольных игр, способных объединять людей, способствовать творчеству и создавать незабываемые воспоминания.',
            team_title: 'Познакомьтесь с основателями',
          },
        }
      }
    }
  });

export default i18n;
