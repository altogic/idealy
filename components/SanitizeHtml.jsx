import React from 'react';

export default function SanitizeHtml({ html, options, ...rest }) {
  return <p dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
