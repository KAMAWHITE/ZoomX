'use client'
import React, { useEffect, useState, useMemo } from 'react'
import useSavedStore from './store/useSavedStore'
import useFilmStore from './store/useFilmStore'
import useCategoryStore from './store/useCategoryStore'
import SavedJson from './Base_json/Saved'
import { useApp } from './Language'
import AOS from "aos";
import "aos/dist/aos.css";

const Saved = () => {
  const { getAllFilms } = useSavedStore();
  const { setFilmSubject, clearAllFilms } = useFilmStore();
  const { setCategorySubject } = useCategoryStore();

  const [Films, setFilms] = useState([]);
  const [Serials, setSerials] = useState([]);
  const { til } = useApp()

  const getContent = () => {
    try {
      switch (til) {
        case "ru":
          return SavedJson.ru
        case "uz":
          return SavedJson.uz
        default:
          return SavedJson.en
      }
    } catch (error) {
      console.error("Error loading country data:", error);
      return [];
    }
  };

  const StatikContent = getContent()

  const isArray = (value) =>
    Array.isArray(value);

  const savedFilms = useMemo(() => {
    return getAllFilms() || [];
  }, [getAllFilms]);

  const handleNavigate = (film) => {
    clearAllFilms();
    setFilmSubject(film);
    const category = {
      type_content: 'Films',
      type_genre: film.genre + ' films'
    };
    setCategorySubject(category);
  };

  useEffect(() => {
    if (!savedFilms.length) {
      setFilms([]);
      setSerials([]);
      return;
    }

    const films = savedFilms.filter(f => !Array.isArray(f.link));
    const serials = savedFilms.filter(f => Array.isArray(f.link));

    setFilms(films);
    setSerials(serials);
  }, [savedFilms]);

  if (!savedFilms.length) {
    return (
      <div className='flex flex-col justify-center bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 items-center h-[88.8vh]'>
        <h2 className='text-white text-2xl mb-4'>No saved films yet</h2>
      </div>
    );
  }

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="p-6 bg-linear-to-r min-h-[88.8vh] from-gray-900 via-blue-950 to-gray-900 text-center">
      <h2 data-aos="fade-up" data-aos-duration="500" className='text-white text-2xl sm:text-[26px] md:text-[28px] lg:text-3xl font-bold mb-4'>{StatikContent.saved}</h2>

      {Films.length > 0 && (
        <div data-aos="fade-up" data-aos-duration="500" className='mb-12 p-2 sm:p-3 md:p-4 lg:p-5 bg-gray-800 rounded-2xl'>
          <h3 data-aos="fade-left" data-aos-duration="500" className='text-white font-bold text-xl sm:text-[22px] md:text-2xl lg:text-[26px] mb-4'>{StatikContent.films}</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-2 sm:gap-x-3 md:gap-y-3 md:gap-x-4 lg:gap-x-5'>
            {Films.map((f) => (
              <button
                data-aos="fade-up"
                data-aos-duration="500"
                key={f.id}
                onClick={() => handleNavigate(f)}
                className="relative block group overflow-hidden rounded-lg"
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-64 object-cover opacity-85 contrast-125 brightness-90 transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 rounded-lg"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/800x1200?text=No+Image')}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h1 className="text-lg font-bold text-white drop-shadow-lg">{f.title}</h1>
                  <p className="text-sm text-white/90 font-medium mt-1">{f.year} • {f.genre}</p>
                  <p className="text-xs text-white/80 mt-2 line-clamp-2">{f.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {Serials.length > 0 && (
        <div data-aos="fade-up" data-aos-duration="500" className='p-2 sm:p-3 md:p-4 lg:p-5 bg-gray-800 rounded-2xl'>
          <h3 data-aos="fade-left" data-aos-duration="500" className='text-white font-bold text-xl sm:text-[22px] md:text-2xl lg:text-[26px] mb-4'>{StatikContent.serials}</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-2 sm:gap-x-3 md:gap-y-3 md:gap-x-4 lg:gap-x-5'>
            {Serials.map((s) => (
              <button
                data-aos="fade-up"
                data-aos-duration="500"
                key={s.id}
                onClick={() => handleNavigate(s)}
                className="relative block group overflow-hidden rounded-lg"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-64 object-cover opacity-85 contrast-125 brightness-90 transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 rounded-lg"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/800x1200?text=No+Image')}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h1 className="text-lg font-bold text-white drop-shadow-lg">{s.title}</h1>
                  <p className="text-sm text-white/90 font-medium mt-1">{s.year} • {s.genre}</p>
                  <p className="text-xs text-white/80 mt-2 line-clamp-2">{s.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Saved