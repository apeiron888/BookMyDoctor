import React from 'react'
import Header from '../components/Header.jsx'
import SpecialaityMenu from '../components/SpecialityMenu.jsx'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialaityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home