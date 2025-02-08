import React from 'react'
import { Upload, BarChart3, Wallet } from 'lucide-react'

const steps = [
  {
    title: 'Connect Your Data Sources',
    description:
      'Easily link your devices, apps, and social media accounts to start sharing data.',
    icon: Upload,
    gradient: 'from-blue-500 to-cyan-400',
    lineGradient: 'from-blue-500/50 to-violet-500/50'
  },
  {
    title: 'Monitor Your Impact',
    description:
      "Track your data contributions and see how they're being used in real-time.",
    icon: BarChart3,
    gradient: 'from-violet-500 to-purple-400',
    lineGradient: 'from-violet-500/50 to-emerald-500/50'
  },
  {
    title: 'Earn Rewards',
    description:
      'Receive DataCoin tokens automatically as your data creates value.',
    icon: Wallet,
    gradient: 'from-emerald-500 to-green-400'
  }
]

export function HowItWorks2 () {
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

      <div className='mt-16 relative max-w-3xl mx-auto'>
        <div className='space-y-20'>
          {steps.map((step, index) => (
            <div key={step.title} className='group relative'>
              {index < steps.length - 1 && (
                <div className='absolute left-[2.5rem] top-24 h-20 w-0.5'>
                  <div
                    className={`h-full w-full bg-gradient-to-b ${step.lineGradient}`}
                  />
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 h-full'>
                    <div className='relative h-full'>
                      <div className='absolute top-1/3 w-2 h-2 -left-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300' />
                      <div className='absolute top-2/3 w-2 h-2 -left-1 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 delay-100' />
                    </div>
                  </div>
                </div>
              )}

              <div className='flex items-start gap-8'>
                <div className='relative'>
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} p-0.5 rotate-45 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <div className='w-full h-full rounded-2xl bg-background flex items-center justify-center -rotate-45'>
                      <div className='flex flex-col items-center'>
                        <span className='text-xl font-bold text-primary mb-1'>
                          Step
                        </span>
                        <span className='text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent'>
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content card */}
                <div className='flex-1 relative'>
                  <div className='p-6 rounded-xl border bg-gradient-to-b from-background to-background/80 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300'>
                    {/* Icon */}
                    <div className='mb-4'>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.gradient} p-0.5`}
                      >
                        <div className='w-full h-full rounded-lg bg-background flex items-center justify-center group-hover:scale-95 transition-transform duration-300'>
                          <step.icon className='w-6 h-6 text-primary' />
                        </div>
                      </div>
                    </div>

                    <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                      {step.title}
                    </h3>
                    <p className='text-muted-foreground'>{step.description}</p>

                    <div className='absolute top-0 right-0 w-24 h-24 rounded-tr-xl bg-gradient-to-br from-primary/5 to-transparent' />
                    <div className='absolute bottom-0 left-0 w-24 h-24 rounded-bl-xl bg-gradient-to-tl from-primary/5 to-transparent' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks2
