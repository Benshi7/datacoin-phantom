import { NavBar } from '@/components/nav-bar'
import { Hero } from '@/components/hero'
import { Benefits } from '@/components/benefits'
import { HowItWorks } from '@/components/how-it-works'
import { Stats } from '@/components/stats'
import { Problems } from '@/components/problems'
import { Footer } from '@/components/footer'

export default function Home () {
  return (
    <div className='min-h-screen bg-background'>
      <NavBar />
      <main>
        <Hero />
        <Stats />
        <Benefits />
        <Problems />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
