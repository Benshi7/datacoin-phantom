import { NavBar } from '@/components/nav-bar'
import { Hero } from '@/components/hero'
import { Benefits } from '@/components/benefits'
import { HowItWorks } from '@/components/how-it-works'
import { Stats } from '@/components/stats2'
import { Problems } from '@/components/problems'
import { Footer } from '@/components/footer'
import DataTypes from '@/components/data-types'

export default function Home () {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
        <DataTypes />
        <Benefits />
        <Problems />
        <HowItWorks />
      </main>
      <Footer />|
    </div>
  )
}
