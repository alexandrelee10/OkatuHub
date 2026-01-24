import React from 'react'
import TrendingPage from './TrendingPage';
import AnimeFilterBar from './AnimeFilterBar';




const MainPage = () => {
    return (
    <main>
        <section id="mainpage" className='bg-white dark:bg-black dark:text-white'>
            <div className='pt-15'>
                <AnimeFilterBar />
            </div>
            <div>
                <TrendingPage />
            </div>

        </section>
    </main>
  )
}

export default MainPage