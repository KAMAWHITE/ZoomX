'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import NavbarJson from "../components/Base_json/Navbar"
import { useApp } from './Language';
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('En');
  const [flag, setFlag] = useState('/usa.png');
  const pathname = usePathname();
  const { til, changeLanguage } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem('lang');
      const savedFlag = localStorage.getItem('flag');

      if (savedLang) setLang(savedLang);
      if (savedFlag) setFlag(savedFlag);
    }
  }, []);

  const getContent = () => {
    switch (til) {
      case "uz":
        return NavbarJson.uz;
      case "ru":
        return NavbarJson.ru;
      default:
        return NavbarJson.en;
    }
  }

  const StatikContent = getContent()

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const MenuDropdown = () => setIsMenuOpen(prev => !prev);

  const Languages = [
    { name: StatikContent.home, link: '/' },
    { name: StatikContent.films, link: '/films' },
    { name: StatikContent.serials, link: '/serials' },
    { name: StatikContent.saved, link: '/saved' },
  ]

  const handleLanguageChange = (item) => {
    const Language = item.value;
    changeLanguage(Language)
    localStorage.setItem('lang', item.name)
    localStorage.setItem('flag', item.link)
    setLang(item.name)
    setFlag(item.link)
    setIsDropdownOpen(false)
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' : 'bg-gray-900/80 backdrop-blur-sm'
      }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row space-x-2 md:space-x-4 items-center justify-between h-20">

          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-17" />
          </Link>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-10">
            <Link href="/" className={`text-lg font-medium hover:text-blue-400 transition ${pathname === '/home' ? 'text-blue-400' : 'text-white'}`}>
              {StatikContent.home}
            </Link>
            <Link href="/films" className={`text-lg font-medium hover:text-blue-400 transition ${pathname === '/films' ? 'text-blue-400' : 'text-white'}`}>
              {StatikContent.films}
            </Link>
            <Link href="/serials" className={`text-lg font-medium hover:text-blue-400 transition ${pathname === '/serials' ? 'text-blue-400' : 'text-white'}`}>
              {StatikContent.serials}
            </Link>
            <Link href="/saved" className={`text-lg font-medium hover:text-blue-400 transition ${pathname === '/saved' ? 'text-blue-400' : 'text-white'}`}>
              {StatikContent.saved}
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative md:hidden">
              <button
                onClick={MenuDropdown}
                className="text-white px-3 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                <IoMenu />
              </button>

              {isMenuOpen && (
                <div className="absolute mt-2 right-0 w-32 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                  <ul className="py-2 flex flex-col space-y-0 justify-center items-center">
                    {Languages.map(item => (
                      <Link
                        key={item.name}
                        href={item.link}
                        className="text-white px-3 py-2 hover:bg-gray-700 cursor-pointer transition"
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder={StatikContent.search_placeholder}
              className="px-2 md:px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none ring-2 w-32 sm:w-48 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            />

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="grid grid-cols-2 items-center cursor-pointer text-white gap-x-1 sm:gap-x-2 md:gap-x-1 px-2 lg:px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                <img src={flag} alt="lang" className="w-6 h-6" />
                <div className='flex sm:justify-center'><span className="text-[12px] md:text-[13px] lg:text-[14px]">{lang}</span></div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                  <ul className="py-2">
                    {[
                      { name: 'En', value: 'en', link: '/usa.png' },
                      { name: 'Ру', value: 'ru', link: '/russia.png' },
                      { name: "O'z", value: 'uz', link: '/uzbekistan.png' },
                    ].map(item => (
                      <li
                        key={item.value}
                        onClick={() => handleLanguageChange(item)}
                        className="flex items-center text-white space-x-3 px-4 py-3 hover:bg-gray-700 cursor-pointer transition"
                      >
                        <img src={item.link} alt="" className="w-6 h-6" />
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button className="text-white p-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <CgProfile className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>
        </div>
      </div>
      <div className='w-full h-1 bg-linear-to-r from-blue-900 via-blue-400 to-red-600 bg-clip-border'>
        <hr />
      </div>
    </nav>
  );
}