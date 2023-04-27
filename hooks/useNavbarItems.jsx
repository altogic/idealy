import { useRouter } from 'next/router';
import { Announcements, Feedback, People, Roadmap } from '@/components/icons';

export default function useNavbarItems() {
  const router = useRouter();
  return [
    {
      icon: <Feedback className="w-6 h-6 icon-slate mr-3" />,
      title: 'Feedback',
      href: '/public-view',
      active: router.pathname === '/public-view' || router.pathname === '/dashboard'
    },
    {
      icon: <Roadmap className="w-6 h-6 icon-slate mr-3" />,
      title: 'Roadmap',
      href: '/roadmaps',
      active: router.pathname === '/roadmaps'
    },
    {
      icon: <Announcements className="w-6 h-6 icon-slate mr-3" />,
      title: 'Announcements',
      href: '/announcements',
      active: router.pathname.includes('/announcements')
    },
    {
      icon: <People className="w-6 h-6 icon-slate mr-3" />,
      title: 'Users',
      href: '/users',
      active: router.pathname === '/users'
    }
  ];
}
