'use client';

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useFilmStore from '../store/useFilmStore';
import { useRouter } from 'next/navigation';
import useCategoryStore from '../store/useCategoryStore';
import useSavedStore from '../store/useSavedStore';
import { FaRegBookmark } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";

function MainCarousel() {
  const router = useRouter();
  const { setCategorySubject, removeCategorySubject } = useCategoryStore();
  const { setFilmSubject, clearAllFilms } = useFilmStore();
  const { setSavedSubject } = useSavedStore();

  const slides = [
    { id: 1, title: 'Slide 1', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 2, title: 'Slide 2', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 3, title: 'Slide 3', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 4, title: 'Slide 4', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 5, title: 'Slide 5', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 6, title: 'Slide 6', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 7, title: 'Slide 7', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: 8, title: 'Slide 8', year: 2022, genre: "animation", description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  ];

  const category = {
    type_content: 'Films',
    type_genre: 'Most Popular at the Moment'
  };

  const handleNavigate = (film) => {
    clearAllFilms();
    setFilmSubject(film);
    setCategorySubject(category);
    router.push('/content');
  };

  const SaveFilm = (film) => {
    setSavedSubject(film);
  };

  useEffect(() => {
    clearAllFilms();
    removeCategorySubject();
  }, []);

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="py-3" data-aos="zoom-in" data-aos-duration="500">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 3, spaceBetween: 10 },
        }}
        className="px-4"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative group">
            <div className="relative h-72 rounded-2xl p-5">
              <div className="absolute inset-0 rounded-2xl" style={{ filter: 'blur(20px)' }} />
              <div className="relative h-full rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 
                   transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h1 className="text-2xl font-bold text-white drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-sm text-blue-300 font-medium">
                    {slide.genre} • {slide.year}
                  </p>
                  <p className="text-sm text-gray-200 mt-1 line-clamp-2">
                    {slide.description}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <button
                      onClick={() => handleNavigate(slide)}
                      className="px-6 py-2.5 bg-orange-500 hover:bg-orange-400 text-white 
                       font-semibold rounded-full shadow-lg hover:shadow-orange-500/50 
                       transition-all duration-300"
                    >
                      Tomosha qilish
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); SaveFilm(slide); }}
                      className="p-3 bg-white/10 backdrop-blur rounded-full 
                       hover:bg-white/20 border border-white/30 
                       transition-all duration-300"
                    >
                      <FaRegBookmark className="text-2xl text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainCarousel;