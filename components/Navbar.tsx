'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const Navbar = () => {
  const [state, setState] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Add closing the navbar menu when navigating
    const handleState = () => {
      document.body.classList.remove('overflow-hidden');
      setState(false);
    };

    handleState();
  }, [pathname, searchParams]);

  const handleNavMenu = () => {
    setState(!state);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <header>
      <nav
        className={`bg-white w-full md:static md:text-sm ${
          state ? 'fixed z-10 h-full' : ''
        }`}
      >
        <div className="custom-screen items-center mx-auto md:flex">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/" className="flex items-center gap-3">
            <svg width="15vw" height="5vh" viewBox="0 0 1458 307" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M95.5286 103.405C132.203 103.405 136.156 108.456 136.156 154.354C136.156 200.251 132.203 205.302 95.5286 205.302C58.8544 205.302 54.9015 200.251 54.9015 154.354C54.9015 108.456 58.8544 103.405 95.5286 103.405ZM6.58818 154.354C6.58818 225.067 24.3763 242.635 95.5286 242.635C166.681 242.635 184.469 225.067 184.469 154.354C184.469 83.6405 166.681 66.072 95.5286 66.072C24.3763 66.072 6.58818 83.6405 6.58818 154.354ZM239.177 240L285.294 240L285.294 108.236L338.219 108.236L338.219 68.7073L186.691 68.7073L186.691 108.236L239.177 108.236L239.177 240ZM352.536 240L398.654 240L398.654 172.361L464.535 172.361L464.535 240L510.653 240L510.653 68.7073L464.535 68.7073L464.535 132.832L398.654 132.832L398.654 68.7073L352.536 68.7073L352.536 240ZM529.388 68.7073L529.388 240L670.375 240L670.375 200.471L575.505 200.471V171.922L661.151 171.922L661.151 134.589L575.505 134.589V108.236L669.936 108.236L669.936 68.7073L529.388 68.7073ZM784.882 68.7073L686.938 68.7073L686.938 240L733.055 240L733.055 179.608L767.314 179.608C791.251 179.608 793.667 181.585 793.667 200.471L793.667 240L841.98 240L841.98 197.836C841.98 175.875 830.341 165.773 807.502 163.357C831.439 160.063 841.98 146.667 841.98 118.338C841.98 78.5895 830.56 68.7073 784.882 68.7073ZM733.055 144.471V106.04L773.024 106.04C793.667 106.04 795.863 108.017 795.863 124.926C795.863 142.495 793.667 144.471 773.024 144.471L733.055 144.471ZM861.722 68.7073L861.722 240L991.29 240L991.29 200.471L907.839 200.471L907.839 68.7073L861.722 68.7073ZM1007.66 240L1053.77 240L1053.77 68.7073L1007.66 68.7073L1007.66 240ZM1075.64 68.7073L1075.64 240L1121.76 240L1121.76 178.51L1207.4 178.51V138.981L1121.76 138.981V108.236L1216.19 108.236V68.7073L1075.64 68.7073ZM1231.66 68.7073L1231.66 240L1372.65 240V200.471L1277.78 200.471L1277.78 171.922L1363.43 171.922V134.589L1277.78 134.589V108.236L1372.21 108.236V68.7073L1231.66 68.7073Z" fill="CurrentColor"></path>
              <ellipse cx="1420.99" cy="80.8249" rx="23.7421" ry="23.237" fill="CurrentColor"></ellipse>
              <circle cx="1449.28" cy="56.0729" r="8.58757" fill="CurrentColor"></circle>
            </svg>
            </Link>
            <div className="md:hidden">
              <button
                role="button"
                aria-label="Open the menu"
                className="text-gray-500 hover:text-gray-800"
                onClick={handleNavMenu}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
