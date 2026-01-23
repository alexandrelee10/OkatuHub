import React from 'react'
import TrendingPage from './TrendingPage';
import AnimeFilterBar from './AnimeFilterBar';




const MainPage = () => {
    return (
    <main>
        <section id="mainpage" className='bg-black'>
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