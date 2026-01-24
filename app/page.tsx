import Link from 'next/link';
import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import MainPage from './components/MainPage';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <>  
      <NavBar />
      <Hero />
      <MainPage />
      <Footer />
    </>
  )
}

export default HomePage;