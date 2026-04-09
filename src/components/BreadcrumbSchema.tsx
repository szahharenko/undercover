import React from 'react';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BASE_URL = 'https://undercover.ee';

/**
 * Renders a BreadcrumbList JSON-LD schema.
 * Google uses this to display breadcrumb trails in search results.
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: 'Home', path: '/' },
 *     { name: 'Pricing', path: '/pricing' },
 *   ]} />
 */
const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${BASE_URL}${item.path}`,
    })),
  };

  return <StructuredData data={data} />;
};

export default BreadcrumbSchema;
