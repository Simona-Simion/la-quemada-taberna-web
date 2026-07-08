import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import History from './sections/History'
import MenuSection from './sections/MenuSection'
import Gallery from './sections/Gallery'
import Reviews from './sections/Reviews'
import Location from './sections/Location'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#11100e] text-[#f5efe6]">
      <Navbar />

      <main>
        <Hero />
        <About />
        <History />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Location />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App