import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../vectors/logo';
import HomeSvg from '../vectors/homeIcon';
import SearchIcon from '../vectors/searchIcon';
import FeaturedIcon from '../vectors/featuredIcon';
import InstagramIcon from '../vectors/instagramIcon';
import TiktokIcon from '../vectors/tiktokIcon';
import YoutubeIcon from '../vectors/youtubeIcon';

const Sidebar = () => {
  const location = useLocation();
  
  const routes = [
    { route: '/', icon: <HomeSvg />, isExternal: false },
    { route: '/search', icon: <SearchIcon />, isExternal: false },
    { route: '/featured', icon: <FeaturedIcon />, isExternal: false },
    {
      route: 'https://www.instagram.com/',
      icon: <InstagramIcon />,
      isExternal: true,
    },
    {
      route: 'https://www.tiktok.com/explore',
      icon: <TiktokIcon />,
      isExternal: true,
    },
    {
      route: 'https://www.youtube.com',
      icon: <YoutubeIcon />,
      isExternal: true,
    },
  ];

  return (
    <aside className="w-22 p-4 border-r border-r-[#191919] sticky top-0 h-screen">
      <nav className="w-full">
        <Logo />
        <ul className="mt-10 w-full flex flex-col items-center gap-5">
          {routes.map((route, index) => (
            <li 
              key={index} 
              className={`w-full flex justify-center cursor-pointer ${
                !route.isExternal && location.pathname === route.route
                  ? 'text-white'
                  : 'text-gray-600 hover:text-white'
              }`}
            >
              {route.isExternal ? (
                <a href={route.route} target="_blank" rel="noopener noreferrer">
                  {route.icon}
                </a>
              ) : (
                <Link to={route.route}>
                  {route.icon}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
