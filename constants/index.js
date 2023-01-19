// eslint-disable-next-line import/prefer-default-export
import { Archive, Bug, CircleCheck, Eye, Thumbtack } from '@/components/icons';

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
    color: 'green',
    field: 'isPinned'
  },
  {
    name: 'Archived',
    icon: Archive,
    color: 'yellow',
    field: 'isArchived'
  },
  {
    name: 'Private',
    icon: Eye,
    color: 'blue',
    field: 'isPrivate'
  },
  {
    name: 'Bug',
    icon: Bug,
    color: 'red',
    field: 'isBug'
  },
  {
    name: 'Need Approval',
    icon: CircleCheck,
    color: 'pink',
    field: 'isApproved'
  }
];

export const THEMES = [
  {
    id: 1,
    name: 'Light',
    value: 'light',
    image: './light.png'
  },
  {
    id: 2,
    name: 'Dark',
    value: 'dark',
    image: './dark.png'
  },
  {
    id: 3,
    name: 'Purple',
    value: 'theme-purple',
    image: './purple.png'
  }
];
