import React from 'react'
import { Upload, BarChart3, Wallet } from 'lucide-react'

const steps = [
  {
    title: 'Connect Your Data Sources',
    description:
      'Easily link your devices, apps, and social media accounts to start sharing data.',
    icon: Upload,
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'Monitor Your Impact',
    description:
      "Track your data contributions and see how they're being used in real-time.",
    icon: BarChart3,
    gradient: 'from-violet-500 to-purple-400'
  },
  {
    title: 'Earn Rewards',
    description:
      'Receive DataCoin tokens automatically as your data creates value.',
    icon: Wallet,
    gradient: 'from-emerald-500 to-green-400'
  }
]

export function HowItWorks () {
  return (
    <section id='how-it-works' className='container mx-auto py-24 sm:py-32'>
      <div className='flex flex-col items-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
          How DataCoin Works
        </h2>
        <p className='max-w-[900px] text-muted-foreground sm:text-xl'>
          Start earning rewards for your data in three simple steps
        </p>
      </div>

      <div className='mt-16 relative'>
        <div className='absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent' />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
          {steps.map((step, index) => (
            <div key={step.title} className='group relative'>
              {/* puntos de conexión */}
              {index < steps.length - 1 && (
                <div className='hidden md:flex absolute top-24 -right-4 space-x-1 z-10'>
                  <div className='w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300' />
                  <div className='w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 delay-100' />
                  <div className='w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 delay-200' />
                </div>
              )}

              <div className='relative p-6 rounded-2xl border bg-gradient-to-b from-background to-background/80 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300'>
                {/* num indicator */}
                <div className='absolute -top-4 -left-4 w-8 h-8 rounded-full bg-background border flex items-center justify-center font-bold text-sm'>
                  {index + 1}
                </div>

                {/* icon */}
                <div className='mb-6'>
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${step.gradient} p-0.5`}
                  >
                    <div className='w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:scale-95 transition-transform duration-300'>
                      <step.icon className='w-8 h-8 text-primary' />
                    </div>
                  </div>
                </div>

                <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                  {step.title}
                </h3>
                <p className='text-muted-foreground'>{step.description}</p>

                <div className='absolute bottom-2 right-2 w-24 h-24 rounded-full bg-gradient-to-r from-primary/5 to-transparent -mr-8 -mb-8' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
