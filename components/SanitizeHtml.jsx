import React from 'react';
import sanitizeHtml from 'sanitize-html';

export default function SanitizeHtml({ html, options, ...rest }) {
  const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href']
    },
    allowedIframeHostnames: ['www.youtube.com']
  };

  const sanitize = (dirty, options) => ({
    __html: sanitizeHtml(dirty, { ...defaultOptions, ...options })
  });
  return <div dangerouslySetInnerHTML={sanitize(html, options)} {...rest} />;
}
