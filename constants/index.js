// eslint-disable-next-line import/prefer-default-export

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
export const IDEAS_PERMISSION_TYPE = ['Guests', 'Anonymous', 'Registered Users'];
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
