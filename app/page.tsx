import Link from 'next/link';
import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import PopularCharacters from './components/PopularCharacters';
import MainPage from './components/MainPage';

const HomePage = () => {
  return (
    <>  
      <NavBar />
      <Hero />
      <MainPage />
    </>
  )
}

export default HomePage;