// eslint-disable-next-line import/prefer-default-export
import { Archive, Bug, CircleCheck, Eye, Merge, Thumbtack } from '@/components/icons';
import { compareDates } from '../utils';

export const BREAKPOINT = {
  TABLET_SIZE: 1024,
  DESKTOP_SIZE: 1270
};

export const ROLE = [
  { id: 1, name: 'Admin', isGuest: false },
  { id: 2, name: 'Moderator', isGuest: false },
  { id: 2, name: 'Guest', isGuest: true }
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
  { id: 9, name: 'User Segments', roles: ['Owner', 'Admin'] },
  { id: 20, name: 'Roadmaps', roles: ['Owner', 'Admin'] },
  { id: 12, name: 'Privacy', roles: ['Owner', 'Admin'] },
  { id: 13, name: 'White Labeling', roles: ['Owner', 'Admin'] },
  { id: 14, name: 'Authentication', roles: ['Owner', 'Admin'] },
  { id: 15, name: 'Miscellaneous', roles: ['Owner', 'Admin'] },
  { id: 16, name: 'Access Requests', roles: ['Owner', 'Admin'] }
];
export const IDEA_SORT_TYPES = [
  { name: 'Trending', url: 'trending', query: 'trendingScore:desc' },
  { name: 'Top', url: 'top', query: 'voteCount:desc' },
  { name: 'Newest', url: 'newest', query: 'createdAt:desc' },
  { name: 'Status Changed', url: 'status_changed', query: 'statusUpdatedAt:desc' },
  { name: 'Priority', url: 'priority', query: 'priorityScore:desc', isAdmin: true }
];

export const SESSION_COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60,
  path: '/',
  sameSite: 'lax',
  domain: process.env.NEXT_PUBLIC_DOMAIN
};
// TODO: change default value if needed

export const PRIORITY_VALUES = [
  {
    id: 1,
    fibonacci: 2,
    tshirt: 'XS',
    default: 3
  },
  {
    id: 2,
    fibonacci: 3,
    tshirt: 'S',
    default: 5
  },
  {
    id: 3,
    fibonacci: 5,
    tshirt: 'M',
    default: 8
  },
  {
    id: 4,
    fibonacci: 8,
    tshirt: 'L',
    default: 14
  },
  {
    id: 5,
    fibonacci: 13,
    tshirt: 'XL',
    default: 20
  },
  {
    id: 6,
    fibonacci: 21,
    tshirt: 'XXL',
    default: 32
  }
];
export const PRIORITY_TYPES = [
  { id: 1, name: 'Fibonacci', value: 'fibonacci' },
  { id: 2, name: 'T-Shirt', value: 'tshirt' }
];
export const WEIGHT_BENEFIT = 0.3;
export const WEIGHT_VOTE = 0.7;
export const WEIGHT_COST = 0.3;
export const PRIORITY_SCALE = 6;

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
    color: 'rose',
    field: 'isBug'
  },
  {
    name: 'Need Approval',
    icon: CircleCheck,
    color: 'pink',
    field: 'isApproved'
  },
  {
    name: 'Merged',
    icon: Merge,
    color: 'orange',
    field: 'isMerged'
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
export const DATA_RANGE = [
  { id: 1, name: 'Posts' },
  { id: 2, name: 'Votes' }
];

export const DATE_RANGES = [
  {
    label: 'Today',
    range: () => ({
      startDate: new Date(),
      endDate: new Date()
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'Yesterday',
    range: () => ({
      startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() - 1))
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'This Week',
    range: () => ({
      startDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
      endDate: new Date()
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'Last Week',
    range: () => ({
      startDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7)),
      endDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 1))
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: new Date(new Date().setDate(1)),
      endDate: new Date()
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'Last Month',
    range: () => ({
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1, 1)),
      endDate: new Date(new Date().setDate(0))
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'This Year',
    range: () => ({
      startDate: new Date(new Date().setMonth(0, 1)),
      endDate: new Date()
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'Last Year',
    range: () => ({
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1, 0, 1)),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1, 11, 31))
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  },
  {
    label: 'All Time',
    range: () => ({
      startDate: new Date(0),
      endDate: new Date()
    }),
    isSelected(dateRange) {
      return (
        compareDates(dateRange.startDate, this.range().startDate) &&
        compareDates(dateRange.endDate, this.range().endDate)
      );
    }
  }
];
export const REACTION_TYPES = [
  {
    id: 1,
    type: 'like',
    symbol: '✨'
  },
  {
    id: 2,
    type: 'love',
    symbol: '😍'
  },
  {
    id: 3,
    type: 'fire',
    symbol: '🔥'
  },
  {
    id: 4,
    type: 'clap',
    symbol: '👏'
  },
  {
    id: 5,
    type: 'sad',
    symbol: '😢'
  }
];
