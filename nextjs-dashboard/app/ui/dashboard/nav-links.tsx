"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { fetchNavItem } from "@/app/lib/data";

// Sample data structure
const sample = (await fetchNavItem()) || [];

// Type definitions for the navigation links and submenu
interface Episode {
  episode_id: string;
  name: string;
}

interface Season {
  season_id: string;
  name: string;
  episodes: Episode[];
}

interface Series {
  series_id: string;
  name: string;
  seasons: Season[];
}

// Interface for submenu
interface Submenu {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  submenu?: Submenu[];
}

// Map the sample data to a suitable structure for navigation links
const links = sample.map((series: Series) => ({
  name: series.name,
  href: `/dashboard/series/${series.series_id}`,
  icon: DocumentDuplicateIcon,
  submenu: [
    ...series.seasons.map((season: Season) => ({
      name: season.name,
      href: `/dashboard/series/${series.series_id}/season/${season.season_id}`,
      icon: DocumentDuplicateIcon,
      submenu: [
        ...season.episodes.map((episode: Episode) => ({
          name: episode.name,
          href: `/dashboard/series/${series.series_id}/season/${season.season_id}/episode/${episode.episode_id}`,
        })),
        {
          name: "New Episode",
          href: `/dashboard/series/${series.series_id}/season/${season.season_id}/create`,
          icon: PlusIcon,
        },
      ],
    })),
    {
      name: "New Season",
      href: `/dashboard/series/${series.series_id}/create`,
      icon: PlusIcon,
    },
  ],
}));

// Adding a link for creating new series
const additionalLinks = [
  {
    name: "New Series",
    href: `/dashboard/series/create`,
    icon: PlusIcon,
  },
];

const allLinks = [...links, ...additionalLinks];

interface NavItemProps {
  link: Submenu;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ link, pathname }) => {
  const LinkIcon = link.icon;
  const isActive = pathname.startsWith(link.href);

  return (
    <div key={link.name}>
      <Link
        href={link.href}
        className={clsx(
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "bg-sky-100 text-blue-600": isActive,
          }
        )}
      >
        {LinkIcon && <LinkIcon className="w-6" />}
        <p className="hidden md:block">{link.name}</p>
      </Link>
      {link.submenu && isActive && (
        <div className="ml-6 mt-1 space-y-1">
          {link.submenu.map((sublink) => (
            <NavItem key={sublink.name} link={sublink} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
};

const NavLinks: React.FC = () => {
  const pathname = usePathname();
  return (
    <>
      {allLinks.map((link) => (
        <NavItem key={link.name} link={link} pathname={pathname} />
      ))}
    </>
  );
};

export default NavLinks;
