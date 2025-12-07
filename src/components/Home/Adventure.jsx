'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { FaAngleDoubleRight, FaRegBookmark } from "react-icons/fa";
import useFilmStore from '../store/useFilmStore';
import { useRouter } from 'next/navigation';
import useCategoryStore from '../store/useCategoryStore';
import useSavedStore from '../store/useSavedStore';
import HomeJson from '../Base_json/Home'
import { useApp } from '../Language';
import AOS from "aos";
import "aos/dist/aos.css";

function Adventure() {
  const router = useRouter();
  const { setFilmSubject, clearAllFilms } = useFilmStore();
  const { setCategorySubject, removeCategorySubject } = useCategoryStore();
  const { setSavedSubject } = useSavedStore();
  const { til } = useApp()

  const getContent = () => {
    try {
      switch (til) {
        case "ru":
          return HomeJson.ru
        case "uz":
          return HomeJson.uz
        default:
          return HomeJson.en
      }
    } catch (error) {
      console.error("Error loading country data:", error);
      return [];
    }
  };

  const StatikContent = getContent()

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
    type_genre: 'Recently Posted films'
  }

  const handleNavigate = (film) => {
    clearAllFilms();
    setFilmSubject(film);
    setCategorySubject(category)
    router.push('/content');
  };

  const handleAllNavigate = () => {
    clearAllFilms();
    slides.forEach(film => setFilmSubject(film));
    setCategorySubject(category)
    router.push('/content');
  };

  const SaveFilm = (film) => {
    setSavedSubject(film);
  }

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

  return (
    <div className="pt-5 flex flex-col items-center space-y-5">
      <div data-aos="fade-left" data-aos-duration="500" className="flex flex-row items-center text-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
        <h1 className="text-xl sm:text-[22px] md:text-2xl lg:text-3xl font-bold">{StatikContent.adventure}</h1>
        <button onClick={handleAllNavigate}>
          <FaAngleDoubleRight className="text-xl sm:text-[22px] md:text-2xl lg:text-3xl mt-2" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination, A11y]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 15,
          }
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="w-full mx-auto px-4 h-72"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full rounded-lg overflow-hidden">
            <div
              onClick={() => handleNavigate(slide)}
              className="block w-full h-full group cursor-pointer relative"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-85 contrast-125 brightness-90 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-50 rounded-lg"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450')}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex flex-col justify-end items-start p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className='flex flex-row w-full justify-between items-start'>
                  <div>
                    <h2 className="text-white text-lg font-bold mb-2">{slide.title}</h2>
                    <h2 className="text-white text-sm font-bold mb-2">{slide.genre} ({slide.year})</h2>
                    <p className="text-white text-sm">{slide.description}</p>
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      SaveFilm(slide);
                    }}
                    className="cursor-pointer p-2 -mr-2 -mt-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Saqlash"
                  >
                    <FaRegBookmark className='text-[24px] text-white drop-shadow-lg' />
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

export default Adventure;