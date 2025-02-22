import React from 'react';
import Logo from '../vectors/logo';
import HomeSvg from '../vectors/homeIcon';
import SearchIcon from '../vectors/searchIcon';
import FeaturedIcon from '../vectors/featuredIcon';
import InstagramIcon from '../vectors/instagramIcon';
import TiktokIcon from '../vectors/tiktokIcon';
import YoutubeIcon from '../vectors/youtubeIcon';

const Sidebar = () => {
  const routes = [
    { route: '/', icon: <HomeSvg />, target: '' },
    { route: '/', icon: <SearchIcon />, target: '' },
    { route: '/', icon: <FeaturedIcon />, target: '' },
    {
      route: 'https://www.instagram.com/',
      icon: <InstagramIcon />,
      target: '_blank',
    },
    {
      route: 'https://www.tiktok.com/explore',
      icon: <TiktokIcon />,
      target: '_blank',
    },
    {
      route: 'https://www.youtube.com',
      icon: <YoutubeIcon />,
      target: '_blank',
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
              className="w-full flex justify-center cursor-pointer"
            >
              <a href={route.route} target={route.target}>
                {route.icon}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
