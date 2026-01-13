import Link from 'next/link';
import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import PopularCharacters from './components/PopularCharacters';

const HomePage = () => {
  return (
    <>  
      <NavBar />
      <Hero />
      <PopularCharacters />
    </>
  )
}

export default HomePage;