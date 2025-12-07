import React from 'react'
import Adventure from './Home/Adventure'
import Detective from './Home/Detective'
import HighRating from './Home/HighRating'
import MainCarousel from './Home/MainCarousel'
import RecentlyPostedCarousel from './Home/RecentlyPostedCarousel'
import Romantica from './Home/Romantica'
import TopCartoons from './Home/TopCartoons'
import TopTen from './Home/TopTen'

const Home = () => {
    return (
        <div className='px-5 bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 lg:px-10 text-white'>
            <MainCarousel />
            <RecentlyPostedCarousel />
            <HighRating />
            <Romantica />
            <Detective />
            <TopTen />
            <Adventure />
            <TopCartoons />
        </div>
    )
}

export default Home