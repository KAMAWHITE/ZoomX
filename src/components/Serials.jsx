'use client';
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaFilter, FaHistory, FaRegSmile, FaSadTear } from "react-icons/fa";
import { MdAnimation, MdDensitySmall, MdFamilyRestroom, MdOutlineAttractions } from 'react-icons/md';
import { GiPikeman } from "react-icons/gi";
import { FaFaceDizzy, FaMagnifyingGlass, FaWandMagicSparkles } from "react-icons/fa6";
import useFilmStore from './store/useFilmStore';
import { useRouter } from 'next/navigation';
import useCategoryStore from './store/useCategoryStore';
import FilmsJson from './Base_json/Films'
import { useApp } from './Language';
import AOS from "aos";
import "aos/dist/aos.css";

const Films = () => {
  const router = useRouter();
  const { setFilmSubject, clearAllFilms } = useFilmStore();
  const { setCategorySubject, removeCategorySubject } = useCategoryStore();
  const { til } = useApp()

  const getContent = () => {
    try {
      switch (til) {
        case "ru":
          return FilmsJson.ru
        case "uz":
          return FilmsJson.uz
        default:
          return FilmsJson.en
      }
    } catch (error) {
      console.error("Error loading country data:", error);
      return [];
    }
  };

  const StatikContent = getContent()

  const handleNavigate = (film) => {
    clearAllFilms();
    setFilmSubject(film);
    const category = {
      type_content: 'Films',
      type_genre: film.genre + ' films'
    }
    setCategorySubject(category)
    router.push('/content');
  };

  useEffect(() => {
    clearAllFilms()
    removeCategorySubject();
  }, []);

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const slides = [
    {
      id: 1, title: 'Serial 1', year: 2022, serias: 5, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: [
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      ]
    },
    {
      id: 2, title: 'Serial 2', year: 2021, serias: 8, genre: "comedy", description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', image: '/statik.jpg', link: [
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { video_link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      ]
    }
  ];

  const [genreOpen, setGenreOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const genres = [
    { id: 1, name: StatikContent.all, value: "all", icon: <MdDensitySmall /> },
    { id: 2, name: StatikContent.action, value: "action", icon: <MdOutlineAttractions /> },
    { id: 3, name: StatikContent.adventure, value: "adventure", icon: <GiPikeman /> },
    { id: 4, name: StatikContent.animation, value: "animation", icon: <MdAnimation /> },
    { id: 5, name: StatikContent.comedy, value: "comedy", icon: <FaRegSmile /> },
    { id: 6, name: StatikContent.drama, value: "drama", icon: <FaSadTear /> },
    { id: 7, name: StatikContent.horror, value: "horror", icon: <FaFaceDizzy /> },
    { id: 8, name: StatikContent.detective, value: "detective", icon: <FaMagnifyingGlass /> },
    { id: 9, name: StatikContent.fantasy, value: "fantasy", icon: <FaWandMagicSparkles /> },
    { id: 10, name: StatikContent.family, value: "family", icon: <MdFamilyRestroom /> },
    { id: 11, name: StatikContent.historical, value: "historical", icon: <FaHistory /> },
  ];
  const years = [
    "all",
    "2025", "2024", "2023", "2022", "2021", "2020",
    "2019", "2018", "2017", "2016", "2015",
    "2014", "2013", "2012", "2011", "2010",
    StatikContent.another
  ];
  const filteredSlides = slides.filter(film => {
    const genreMatch = selectedGenre === "all" || film.genre === selectedGenre;
    const yearMatch =
      selectedYear === "all" ||
      selectedYear === StatikContent.another ||
      film.year === Number(selectedYear);

    return genreMatch && yearMatch;
  });

  return (
    <div className='flex flex-col min-h-[88.8vh] text-white px-5 bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 lg:px-10 pb-5 space-y-3 md:space-y-4 lg:space-y-5'>
      <h1 data-aos="fade-left" data-aos-duration="500" className='text-xl sm:text-[22px] md:text-2xl lg:text-3xl mt-5 font-bold'>{StatikContent.big_title}</h1>
      <p data-aos="fade-right" data-aos-duration="500" className='text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]'>{StatikContent.topic_1}</p>
      <p data-aos="fade-right" data-aos-duration="500" className='text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]'>{StatikContent.topic_2}</p>

      <div data-aos="fade-up" data-aos-duration="500" className='relative flex flex-row sm:items-center justify-between items-center gap-4 p-2 sm:p-3 md:p-4 lg:p-6 bg-gray-800 rounded-xl'>
        <div className='relative'>
          <button
            onClick={() => setGenreOpen(!genreOpen)}
            className='flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-3 lg:py-3 lg:px-6 bg-gray-900 rounded-lg hover:bg-gray-700 transition'
          >
            <span className='text-[13px] sm:text-[14px] md:text-[16px] lg:text-lg font-bold'>{StatikContent.genres}</span>
            <FaAngleDown className={`transition-transform text-[13px] sm:text-[14px] md:text-[16px] lg:text-lg ${genreOpen ? 'rotate-180' : ''}`} />
          </button>
          {genreOpen && (
            <div className='absolute md:w-[300px] lg:w-[400px] 2xl:w-[500px] top-full left-0 mt-2 bg-gray-900 rounded-lg shadow-2xl z-50 p-4 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3'>
              {genres.map(g => (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGenre(g.value);
                    setGenreOpen(false);
                  }}
                  className={`py-4 px-7 border-2 rounded-lg text-left capitalize transition ${selectedGenre === g.value
                    ? 'bg-blue-600 border-blue-600'
                    : 'hover:bg-gray-700 border-gray-700'
                    }`}
                >
                  <div className='flex flex-col space-y-2 items-center text-center'>
                    <span className='text-4xl'>{g.icon}</span>
                    <span className='text-[15px]'>{g.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center gap-3 sm:order-0'>
          <FaFilter className='text-xl sm:text-[22px] md:text-2xl lg:text-3xl' />
          <h1 className='text-xl sm:text-[22px] md:text-2xl lg:text-3xl font-bold'>{StatikContent.filter}</h1>
        </div>
        <div className='relative'>
          <button
            onClick={() => setYearOpen(!yearOpen)}
            className='flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-4 py-3 sm:px-4 sm:py-3 md:px-5 md:py-3 lg:py-3 lg:px-6 bg-gray-900 rounded-lg hover:bg-gray-700 transition'
          >
            <span className='text-[13px] sm:text-[14px] md:text-[16px] lg:text-lg font-bold'>{StatikContent.years}</span>
            <FaAngleDown className={`transition-transform text-[13px] sm:text-[14px] md:text-[16px] lg:text-lg ${yearOpen ? 'rotate-180' : ''}`} />
          </button>

          {yearOpen && (
            <div className='absolute grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-3 top-full right-0 mt-2 sm:w-[250px] md:w-[350px] lg:w-[400px] 2xl:w-[500px] bg-gray-900 rounded-lg shadow-2xl z-50 p-4'>
              {years.map(y => (
                // Yillar dropdowni ichida:
                <button
                  key={y}
                  onClick={() => {
                    setSelectedYear(y);
                    setYearOpen(false);
                  }}
                  className={`w-full flex flex-row items-center border-2 justify-center px-4 py-3 rounded-lg transition hover:bg-gray-700 ${selectedYear === y ? 'bg-blue-600 border-blue-600' : 'hover:bg-gray-700 border-gray-700'}`}
                >
                  <span className='text-lg'>{y === "all" ? "Barchasi" : y}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6'>
        {filteredSlides.map((s) => (
          <button data-aos="fade-up" data-aos-duration="500" key={s.id} onClick={() => handleNavigate(s)} className="relative block group overflow-hidden rounded-lg">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-64 object-cover opacity-85 contrast-125 brightness-90 transition-all duration-300 group-hover:scale-105 group-hover:brightness-50 rounded-lg"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/800x1200?text=No+Image')}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h1 className="text-lg font-bold text-white drop-shadow-lg">
                {s.title}
              </h1>
              <p className="text-sm text-white/90 font-medium mt-1">
                {s.year} • {s.genre}
              </p>
              <p className="text-xs text-white/80 mt-2 line-clamp-2">
                {s.description}
              </p>
            </div>
          </button>
        ))}
      </div>
      {filteredSlides.length === 0 && (
        <p className='text-center text-xl py-10'>Bu filter bo‘yicha film topilmadi.</p>
      )}
    </div>
  )
}

export default Films