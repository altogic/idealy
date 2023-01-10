// eslint-disable-next-line import/prefer-default-export
import { Archive, Bug, Eye, Thumbtack } from '@/components/icons';

export const BREAKPOINT = {
  TABLET_SIZE: 1024,
  DESKTOP_SIZE: 1270
};

export const ROLE = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Moderator' }
];
export const SUBDOMAIN_REGEX = /^[a-z0-9-_]{3,20}$/;

export const COMPANY_VISIBILITY = ['Public', 'Private'];

export const DISPLAY_COMPANY_ASSETS = ['Show logo & company name', 'Show logo only'];

export const AUTHENTICATION_METHOD = [
  'Registered Users',
  'Guest Authentication',
  'Anonymous',
  'Custom'
];
export const IDEAS_PERMISSION_TYPE = ['Registered Users', 'Guest Authentication', 'Anonymous'];
export const PROFILE_TABS = [
  { id: 1, name: 'Profile' },
  { id: 2, name: 'Notifications' },
  { id: 3, name: 'Saved Filters' }
];
export const COMPANY_TABS = [
  { id: 1, name: 'General Settings', roles: ['Owner', 'Admin'] },
  { id: 2, name: 'Billing', roles: ['Owner'] },
  { id: 3, name: 'Upgrade', roles: ['Owner'] },
  { id: 4, name: 'Themes', roles: ['Owner', 'Admin'] },
  { id: 5, name: 'Invite Team', roles: ['Owner', 'Admin'] },
  { id: 6, name: 'Topics', roles: ['Owner', 'Admin'] },
  { id: 7, name: 'Status', roles: ['Owner', 'Admin'] },
  { id: 8, name: 'Categories', roles: ['Owner', 'Admin'] },
  { id: 9, name: 'Roadmaps', roles: ['Owner', 'Admin'] },
  { id: 10, name: 'Privacy', roles: ['Owner', 'Admin'] },
  { id: 11, name: 'White Labeling', roles: ['Owner', 'Admin'] },
  { id: 12, name: 'Authentication', roles: ['Owner', 'Admin'] },
  { id: 13, name: 'Miscellaneous', roles: ['Owner', 'Admin'] }
];
export const IDEA_SORT_TYPES = [
  { name: 'Trending', url: 'trending', query: 'trending' },
  { name: 'Top', url: 'top', query: 'voteCount:desc' },
  { name: 'Newest', url: 'newest', query: 'createdAt:desc' },
  { name: 'Status Changed', url: 'status_changed', query: 'statusUpdatedAt:desc' }
];
export const EDITOR_MODULES = {
  clipboard: {
    matchVisual: false
  },
  toolbar: {
    container: [['bold', 'italic', 'underline', 'strike', 'link']]
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

export const EDITOR_FORMATS = ['bold', 'italic', 'underline', 'align', 'strike'];
export const SESSION_COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
  sameSite: 'lax',
  domain: process.env.NEXT_PUBLIC_DOMAIN
};
export const PRIORITY_VALUES = {
  fibonacci: [2, 3, 5, 8, 13, 21],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
};
export const IDEA_BADGES = [
  {
    name: 'Pinned',
    icon: Thumbtack,
    className: 'text-orange-500 bg-orange-50',
    field: 'isPinned'
  },
  {
    name: 'Archived',
    icon: Archive,
    className: 'text-yellow-500 bg-yellow-50',
    field: 'isArchived'
  },
  {
    name: 'Private',
    icon: Eye,
    className: 'text-blue-500 bg-blue-50',
    field: 'isPrivate'
  },
  {
    name: 'Bug',
    icon: Bug,
    className: 'text-red-500 bg-red-50',
    field: 'isBug'
  }
];

export const ERROR_MESSAGES = {
  'Invalid or expired access token':
    'This email verification token has already been used or has expired.'
};
