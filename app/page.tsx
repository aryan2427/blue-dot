import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'
import StatsCards from '@/components/Landing/StatsCards'
import AngulMap from '@/components/map/AngulMap'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatsCards />
      <AngulMap />
    </div>
  )
}