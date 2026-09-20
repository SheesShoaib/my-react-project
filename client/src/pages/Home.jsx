import Hero from '../components/home/Hero'
import SearchBooking from '../components/home/SearchBooking'
import FeaturedRooms from '../components/home/FeaturedRooms'
import ServicesPreview from '../components/home/ServicesPreview'
import AboutSection from '../components/home/AboutSection'

function Home() {
  return (
    <>
      <Hero />
      <SearchBooking />
      <FeaturedRooms />
      <ServicesPreview />
      <AboutSection />
    </>
  )
}

export default Home