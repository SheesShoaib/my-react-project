import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

import Hero from './components/home/Hero'
import SearchBooking from './components/home/SearchBooking'
import FeaturedRooms from './components/home/FeaturedRooms'
import ServicesPreview from './components/home/ServicesPreview'
import AboutSection from './components/home/AboutSection'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <SearchBooking />

        <FeaturedRooms />

        <ServicesPreview />

        <AboutSection />
      </main>

      <Footer />
    </>
  )
}

export default App