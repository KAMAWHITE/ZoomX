'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMenu, IoSearch, IoClose } from "react-icons/io5";
import NavbarJson from "../components/Base_json/Navbar";
import { useApp } from './Language';
import { CgProfile } from "react-icons/cg";
import { FaHome } from 'react-icons/fa';
import { PiFilmSlateBold } from "react-icons/pi";
import { HiMiniFilm } from "react-icons/hi2";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flag, setFlag] = useState('/usa.png');
  const [isMounted, setIsMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const pathname = usePathname();
  const { til, changeLanguage } = useApp();
  const menuRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const savedFlag = localStorage.getItem('flag');
    if (savedFlag) {
      setFlag(savedFlag);
    }
  }, [isMounted]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setShowMobileSearch(false);
      }
    };

    if (isMounted) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMounted]);

  if (!isMounted) {
    const defaultContent = NavbarJson.en;

    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colours duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' : 'bg-gray-900/80 backdrop-blur-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-white font-mono text-xl">
                ZoomX
              </Link>
              <Link href="/" className='p-2 rounded-lg bg-gray-800 ring-1 ring-gray-700'>
                <CgProfile className="text-xl text-white" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`text-lg font-medium ${pathname === '/' ? 'text-blue-400' : 'text-white'}`}>
                {defaultContent.home}
              </Link>
              <Link href="/films" className={`text-lg font-medium ${pathname === '/films' ? 'text-blue-400' : 'text-white'}`}>
                {defaultContent.films}
              </Link>
              <Link href="/serials" className={`text-lg font-medium ${pathname === '/serials' ? 'text-blue-400' : 'text-white'}`}>
                {defaultContent.serials}
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <button className="text-white p-2 rounded-lg bg-gray-800 md:hidden">
                <IoSearch className="w-5 h-5" />
              </button>

              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder={defaultContent.search_placeholder}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none ring-1 ring-gray-700 w-48"
                />
              </div>

              <button className="p-2 rounded-lg bg-gray-800 ring-1 ring-gray-700">
                <img src="/usa.png" alt="lang" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className='w-full h-1 bg-linear-to-r from-blue-900 via-blue-400 to-red-600' />
      </nav>
    );
  }

  const getContent = () => {
    switch (til) {
      case "uz": return NavbarJson.uz;
      case "ru": return NavbarJson.ru;
      default: return NavbarJson.en;
    }
  };

  const content = getContent();

  const navLinks = [
    { name: content.home, link: '/', icon: <FaHome /> },
    { name: content.films, link: '/films', icon: <PiFilmSlateBold />},
    { name: content.serials, link: '/serials', icon: <HiMiniFilm /> },
  ];

  const languages = [
    { name: 'English', value: 'en', link: '/usa.png' },
    { name: 'Русский', value: 'ru', link: '/russia.png' },
    { name: "O'zbekcha", value: 'uz', link: '/uzbekistan.png' },
  ];

  const handleLanguageChange = (item) => {
    changeLanguage(item.value);
    localStorage.setItem('lang', item.value);
    localStorage.setItem('flag', item.link);
    setFlag(item.link);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-2xl' : 'bg-gray-900'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            <div className="flex items-center space-x-3 md:space-x-4">
              <Link href="/" className="text-white font-bold text-xl md:text-2xl bg-linear-to-r">
                ZoomX
              </Link>

              <Link
                href="/profile"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                title="Profile"
              >
                <CgProfile className="text-xl text-white" />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.slice(0, 3).map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className={`text-lg font-medium transition-all duration-300 hover:text-blue-400 ${pathname === item.link ? 'text-blue-400' : 'text-white'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={content.search_placeholder}
                    className="px-4 py-2 pl-10 pr-4 text-white placeholder-gray-400 outline-none w-48 lg:w-64 rounded-lg bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                  />
                  <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => {
                  if (!isMenuOpen) {
                    setShowMobileSearch(true);
                    setIsMenuOpen(true);
                  } else {
                    setShowMobileSearch(!showMobileSearch);
                  }
                }}
                className="md:hidden p-2.5 duration-300 rounded-lg bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                {showMobileSearch ? (
                  <IoClose className="w-5 h-5 text-white" />
                ) : (
                  <IoSearch className="w-5 h-5 text-white" />
                )}
              </button>

              <div className="relative md:hidden" ref={menuRef}>
                <button
                  onClick={() => {
                    if (!showMobileSearch) {
                      setIsMenuOpen(v => !v);
                    }
                  }}
                  className={`p-2.5 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]`}
                  disabled={showMobileSearch}
                >
                  <IoMenu className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(v => !v)}
                  className="p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                >
                  <img src={flag} alt="flag" className="w-5 h-5" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-2xl border border-gray-800 z-50">
                    <ul className="py-2">
                      {languages.map(item => (
                        <li
                          key={item.value}
                          onClick={() => handleLanguageChange(item)}
                          className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-gray-800/50 cursor-pointer transition-all duration-300"
                        >
                          <img src={item.link} alt="" className="w-5 h-5" />
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-1 bg-linear-to-r from-blue-900 via-blue-400 to-red-600' />
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsMenuOpen(false);
              setShowMobileSearch(false);
            }}
          />

          <div className="absolute right-0 top-16 bottom-0 w-full max-w-sm bg-gray-900/95 backdrop-blur-xl shadow-2xl border-l border-gray-800 animate-slideIn">
            <div className="h-full overflow-y-auto">
              {showMobileSearch ? (
                <div className="p-6 border-b border-gray-800">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={content.search_placeholder}
                      className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 outline-none border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                      autoFocus
                    />
                    <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <button
                      onClick={() => setShowMobileSearch(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text">
                    Menu
                  </h3>
                  <div className="space-y-2">
                    {navLinks.map((item) => (
                      <Link
                        key={item.link}
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${pathname === item.link
                          ? 'bg-linear-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                          }`}
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-lg">{item.icon}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 md:h-20"></div>
    </>
  );
}