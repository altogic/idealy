import useNavbarItems from '@/hooks/useNavbarItems';
import NavItem from './NavItem';

export default function Navbar() {
  const navbar = useNavbarItems();
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-2">
        {navbar.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            href={item.href}
            active={item.active}
          />
        ))}
      </ul>
    </nav>
  );
}
