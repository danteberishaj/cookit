import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../vectors/logo';
import HomeSvg from '../vectors/homeIcon';
import SearchIcon from '../vectors/searchIcon';
import FeaturedIcon from '../vectors/featuredIcon';
import InstagramIcon from '../vectors/instagramIcon';
import TiktokIcon from '../vectors/tiktokIcon';
import YoutubeIcon from '../vectors/youtubeIcon';
import HamburgerIcon from '../vectors/hamburgerIcon';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-black z-50 px-4 py-3 flex items-center justify-between border-b border-[#191919]">
        <Logo />
        <button
          onClick={toggleMobileMenu}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
          fixed md:sticky top-0 h-screen bg-black z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-34 md:w-22 p-4 border-r border-r-[#191919]
        `}
      >
        <nav className="w-full">
          <div className="md:block hidden">
            <Logo />
          </div>
          <ul className="mt-16 md:mt-10 w-full flex flex-col items-center gap-5">
            {routes.map((route, index) => (
              <li 
                key={index} 
                className={`w-full flex justify-center cursor-pointer ${
                  !route.isExternal && location.pathname === route.route
                    ? 'text-white'
                    : 'text-gray-600 hover:text-white'
                }`}
                onClick={closeMobileMenu}
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

      {/* Content Padding for Mobile Header */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default Sidebar;
