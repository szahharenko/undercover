/**
 * SEO metadata for each route, keyed by path.
 * Each entry contains i18n keys for title and description.
 * Fallback values (English) are provided for pre-rendering.
 */
export const seoConfig: Record<string, { titleKey: string; descriptionKey: string; titleFallback: string; descriptionFallback: string }> = {
  '/': {
    titleKey: 'seo.home.title',
    descriptionKey: 'seo.home.description',
    titleFallback: 'Undercover Vibe - Coworking & Board Game Club in Tallinn',
    descriptionFallback: 'Cozy coworking space by day, VIP board game club by night. Ergonomic workspace, fast WiFi, meeting rooms, and 200+ board games in Tallinn, Estonia.',
  },
  '/about': {
    titleKey: 'seo.about.title',
    descriptionKey: 'seo.about.description',
    titleFallback: 'About Us - Undercover Vibe',
    descriptionFallback: 'Our story: how a coworking space became Tallinn\'s favorite board game club. Meet the team behind Undercover Vibe.',
  },
  '/pricing': {
    titleKey: 'seo.pricing.title',
    descriptionKey: 'seo.pricing.description',
    titleFallback: 'Pricing - Undercover Vibe Coworking Tallinn',
    descriptionFallback: 'Flexible coworking plans from €25/day. Monthly desks, day passes, free trial, and private meeting rooms in Tallinn.',
  },
  '/boardgames': {
    titleKey: 'seo.boardgames.title',
    descriptionKey: 'seo.boardgames.description',
    titleFallback: 'Board Games - Undercover Vibe Game Club Tallinn',
    descriptionFallback: 'Board games, VIP gaming lounge, themed game nights. Book your table at Tallinn\'s coziest board game club.',
  },
  '/events': {
    titleKey: 'seo.events.title',
    descriptionKey: 'seo.events.description',
    titleFallback: 'Events - Undercover Vibe Tallinn',
    descriptionFallback: 'Upcoming game nights, Mafia, D&D, workshops, and community events. Check the calendar and join us at Undercover Vibe!',
  },
  '/events-and-trainings': {
    titleKey: 'seo.eventsTrainings.title',
    descriptionKey: 'seo.eventsTrainings.description',
    titleFallback: 'Events & Trainings - Undercover Vibe Tallinn',
    descriptionFallback: 'Host your corporate event, training, or team building at Undercover Vibe. Flexible space rental in Tallinn with full amenities.',
  },
  '/free-trial': {
    titleKey: 'seo.freeTrial.title',
    descriptionKey: 'seo.freeTrial.description',
    titleFallback: 'Free Trial Day - Undercover Vibe Coworking Tallinn',
    descriptionFallback: 'Try Tallinn\'s coziest coworking space for free. Full workspace access, specialty coffee, fast WiFi, and board games in the evening.',
  },
};
