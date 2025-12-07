'use client';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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

function TopTen() {
    const router = useRouter();
    const { setFilmSubject, clearAllFilms } = useFilmStore();
    const { setCategorySubject, removeCategorySubject } = useCategoryStore();
    const { setSavedSubject } = useSavedStore
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
        { id: 1, title: 'Slide 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 1 },
        { id: 2, title: 'Slide 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 2 },
        { id: 3, title: 'Slide 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 3 },
        { id: 4, title: 'Slide 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 4 },
        { id: 5, title: 'Slide 5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 5 },
        { id: 6, title: 'Slide 6', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 6 },
        { id: 7, title: 'Slide 7', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 7 },
        { id: 8, title: 'Slide 8', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', image: '/statik.jpg', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', rank: 8 },
    ].sort((a, b) => a.rank - b.rank);

    const category = {
        type_content: 'Films',
        type_genre: 'Top 10 Films'
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
                <h1 className="text-xl sm:text-[22px] md:text-2xl lg:text-3xl font-bold">{StatikContent.top_films}</h1>
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
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },
                    1400: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className="w-full mx-auto px-4 h-[500px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative h-full rounded-3xl overflow-hidden" tabIndex={0}>
                        <div onClick={() => handleNavigate(slide)} className="block w-full h-full focus:outline cursor-pointer focus:outline-amber-500">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover rounded-lg hover:scale-110 hover:brightness-75 transition-transform duration-300"
                                onError={(e) => (e.target.src = 'https://via.placeholder.com/800x450')}
                            />
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    SaveFilm(slide);
                                }}
                                className="cursor-pointer absolute top-8 right-5 p-2 -mr-2 -mt-2 hover:bg-white/20 rounded-full transition-colors"
                                title="Saqlash"
                            >
                                <FaRegBookmark className='text-[24px] text-white drop-shadow-lg' />
                            </div>
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-sans text-lg sm:text-4xl border-2 p-6 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                                {slide.rank}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TopTen;