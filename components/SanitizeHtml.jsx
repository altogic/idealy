import React from 'react';

export default function SanitizeHtml({ html, options, id, ...rest }) {
  return <p id={id} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
