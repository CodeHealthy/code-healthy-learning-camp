export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Learning Paths",
    href: "/learn",
  },
  {
    label: "Visualizations",
    href: "/visualizations",
  },
  {
    label: "About",
    href: "/about",
  },
];