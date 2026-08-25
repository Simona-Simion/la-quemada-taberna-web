import Seo from './components/Seo'

import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import MenuSection from './sections/MenuSection'
import Gallery from './sections/Gallery'
import Reviews from './sections/Reviews'
import Location from './sections/Location'
import EventsSection from './sections/EventsSection'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#18130f] text-[#f5efe6]">
      <Seo />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Gallery />
        <MenuSection />
        <EventsSection />
        <Location />
        <Reviews />
      </main>

      <Footer />
    </div>
  )
}

export default App