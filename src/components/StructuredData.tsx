import React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD <script> tag for structured data.
 * Use one per page to add schema.org markup beyond the global LocalBusiness in index.html.
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
