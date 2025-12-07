'use client';

import React, { useState, useRef, useEffect } from 'react';
import useFilmStore from '@/components/store/useFilmStore';
import useCategoryStore from '@/components/store/useCategoryStore';
import useSavedStore from '@/components/store/useSavedStore';
import { FaPlay, FaPause, FaRegBookmark } from 'react-icons/fa';
import { MdVolumeUp, MdVolumeMute, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { IoMdSend } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContentPage() {
    const { getAllFilms } = useFilmStore();
    const { clearAllFilms, setFilmSubject } = useFilmStore();
    const { getCategorySubject, removeCategorySubject } = useCategoryStore();
    const { setSavedSubject } = useSavedStore();
    const categories = getCategorySubject();
    const films = getAllFilms();
    const router = useRouter()
    const resetFunksion = (f) => {
        clearAllFilms();
        setFilmSubject(film);
    }
    if (films.length === 0) {
    }
    useEffect(() => {
        if (films.length === 0) {
            removeCategorySubject();
            router.push('/');
        }
    }, [films.length, router]);
    if (films.length === 0) return null;
    const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
    const film = films[currentFilmIndex];
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const currentFilm = films[currentFilmIndex];
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const currentVideoUrl = currentFilm.link[currentEpisodeIndex]?.video_link || currentFilm.link || null;
    const formatTime = (sec) => {
        if (!sec) return "00:00";
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };
    const SaveFilm = (film) => {
        setSavedSubject(film);
    }
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = muted ? 0 : volume;
        }
    }, [volume, muted]);
    useEffect(() => {
        setIsPlaying(!videoRef.current?.paused);
    }, [currentFilmIndex]);
    const handleProgress = () => {
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(percent);
        setCurrentTime(videoRef.current.currentTime);
    };
    const handleSeek = (e) => {
        const pos = (e.nativeEvent.offsetX / e.target.offsetWidth) * videoRef.current.duration;
        videoRef.current.currentTime = pos;
    };
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current.parentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    const goToNext = () => {
        if (currentFilmIndex < films.length - 1) {
            setCurrentFilmIndex(currentFilmIndex + 1);
        }
    };
    const playEpisode = (index) => {
        setCurrentEpisodeIndex(index);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };
    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }, []);
    return (
        <div className="min-h-[88.8vh] pb-5 bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 text-white">
            {films.length > 1 ? (
                <div className='flex flex-col space-y-5'>
                    <div className='text-center'>
                        <h1 data-aos="fade-left" data-aos-duration="500" className="text-2xl font-bold pt-5">
                            {categories[0]?.type_content} • {categories[0]?.type_genre}
                        </h1>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-10'>
                        {films.map((f, i) => (
                            <button
                            data-aos="fade-up"
                            data-aos-duration="500"
                                key={i}
                                onClick={() => {
                                    clearAllFilms();
                                    setFilmSubject(f);
                                }}
                                className="group relative overflow-hidden rounded-lg shadow-lg"
                            >
                                <img
                                    src={f.image}
                                    alt={f.title}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <h3 className="text-lg font-bold">{f.title}</h3>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full mx-auto px-10 pt-5">
                    <div className="mb-8">
                        <h1 data-aos="fade-left" data-aos-duration="500" className="text-2xl font-bold">
                            {categories[0]?.type_content} <GoDotFill className="text-[15px] inline mx-2" /> {categories[0]?.type_genre} <GoDotFill className="inline text-[15px] mx-2" /> {currentFilm.title}
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
                        <div data-aos="fade-up" data-aos-duration="500" className="space-y-6">
                            <img src={currentFilm.image} alt={currentFilm.title} className="w-full h-64 rounded-lg bg-black/50 backdrop-blur-sm ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                            <div className="space-y-3">
                                <div className="flex justify-around">
                                    <span className="px-3 py-1 bg-gray-600 rounded-2xl text-sm">{currentFilm.genre}</span>
                                    <span className="px-3 py-1 bg-gray-600 rounded-2xl text-sm">{currentFilm.year}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{currentFilm.description}</p>
                                <div className='grid grid-cols-[5fr_1fr] gap-2'>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            SaveFilm(currentFilm);
                                        }}
                                        className='flex flex-row justify-center space-x-3 items-center cursor-pointer w-full p-3 bg-gray-700 rounded-2xl hover:bg-gray-500 hover:ring-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                                    >
                                        <span>Keyinroq tomosha qilish</span>
                                        <FaRegBookmark className='text-[20px] text-white drop-shadow-lg' />
                                    </div>
                                    <div
                                        className='flex flex-row cursor-pointer w-full justify-center items-center bg-gray-700 rounded-2xl hover:bg-gray-500 hover:ring-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]'
                                    >
                                        <IoMdSend className='text-[20px] text-white drop-shadow-lg' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-left" data-aos-duration="500" className="relative rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm ring-2 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                            <video
                                ref={videoRef}
                                src={currentVideoUrl}
                                poster={currentFilm.image}
                                className="w-full aspect-video"
                                onTimeUpdate={handleProgress}
                                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                                onClick={togglePlay}
                                autoPlay
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <div className="h-2 bg-white/30 rounded-full cursor-pointer mb-6" onClick={handleSeek}>
                                    <div className="h-full bg-red-600 rounded-full relative" style={{ width: `${progress}%` }}>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-white">
                                    <div className="flex items-center gap-6">
                                        <button onClick={togglePlay} className="text-4xl hover:scale-110 transition">
                                            {isPlaying ? <FaPause /> : <FaPlay />}
                                        </button>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setMuted(!muted)}>
                                                {muted || volume === 0 ? <MdVolumeMute className="text-2xl" /> : <MdVolumeUp className="text-2xl" />}
                                            </button>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.05"
                                                value={muted ? 0 : volume}
                                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                className="w-24 accent-red-600"
                                            />
                                        </div>
                                        <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                                    </div>
                                    <button onClick={toggleFullscreen} className="text-2xl hover:scale-110 transition">
                                        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        currentFilm.serias && (
                            <div className="mt-10">
                                <h2 data-aos="fade-left" data-aos-duration="500" className="text-3xl font-bold mb-8">Barcha seriyalar:</h2>
                                <Swiper
                                    modules={[Navigation, Pagination, A11y]}
                                    slidesPerView={2}
                                    spaceBetween={20}
                                    navigation
                                    pagination={{ clickable: true }}
                                    breakpoints={{
                                        640: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                    className="series-swiper"
                                >
                                    {currentFilm.link.map((episode, index) => (
                                        <SwiperSlide key={index}>
                                            <button
                                                data-aos="fade-up"
                                                data-aos-duration="500"
                                                onClick={() => playEpisode(index)}
                                                className={`relative w-full border-3 transition-all ${currentEpisodeIndex === index ? 'border-red-600' : 'border-gray-700'
                                                    }`}
                                            >
                                                <img
                                                    src={currentFilm.image}
                                                    alt={currentFilm.title}
                                                    className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />

                                                {/* index + 1 yozuvi */}
                                                <span className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                                                    Seriya - {index + 1}
                                                </span>
                                            </button>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}