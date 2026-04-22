import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import i18n from '../i18n';

/**
 * Redirects locale-prefixed URLs (e.g. /en/pricing, /ru/about) to the
 * unprefixed equivalent (/pricing, /about) while switching the active
 * i18next language to match the prefix.
 *
 * Why this exists: until URL-based locale routing is properly wired up,
 * any link shared as undercover.ee/en/... lands on a blank SPA shell
 * because React Router has no matching route. This component prevents
 * that broken-page experience.
 *
 * Long-term: replace this with locale-prefixed routes that render
 * actual pages at /en/pricing, /ru/about, etc. (see DEV_PLAN.md, P1).
 */
export const LocaleRedirect: React.FC<{ lang: 'en' | 'et' | 'ru' }> = ({ lang }) => {
  const location = useLocation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  // Strip the leading /en, /et, or /ru segment.
  // /en/pricing  -> /pricing
  // /en          -> /
  // /en/         -> /
  const stripped = location.pathname.replace(/^\/(en|et|ru)(?=\/|$)/, '') || '/';
  const target = stripped + location.search + location.hash;

  return <Navigate to={target} replace />;
};

export default LocaleRedirect;
