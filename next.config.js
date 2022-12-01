/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cloudflare-ipfs.com',
      'pbs.twimg.com',
      'c1-na.altogic.com',
      'cdnntr1.img.sputniknews.com',
      'media-exp1.licdn.com',
      'minervastrategies.com',
      'lh3.googleusercontent.com',
      'scontent-ord5-1.xx.fbcdn.net',
      'scontent-ord5-1.xx.fbcdn.net',
      'avatars.githubusercontent.com'
    ]
  },
  env: {
    appName: 'Acme',
    url: 'acme.com'
  }
};
const { withSuperjson } = require('next-superjson');

module.exports = withSuperjson()(nextConfig);
