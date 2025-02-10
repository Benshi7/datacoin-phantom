import React from 'react'
import { Users, Database, Coins, Shield } from 'lucide-react'

const stats = [
  {
    name: 'Active Users',
    value: '100K+',
    icon: Users,
    description: 'Trust DataCoin',
    color: 'from-blue-500/20 to-blue-500/10'
  },
  {
    name: 'Data Points',
    value: '1B+',
    icon: Database,
    description: 'Processed Daily',
    color: 'from-purple-500/20 to-purple-500/10'
  },
  {
    name: 'Tokens Distributed',
    value: '5M+',
    icon: Coins,
    description: 'To Our Users',
    color: 'from-yellow-500/20 to-yellow-500/10'
  },
  {
    name: 'Security Score',
    value: '99.9%',
    icon: Shield,
    description: 'Uptime & Protection',
    color: 'from-green-500/20 to-green-500/10'
  }
]

export function Stats () {
  return (
    <section id='stats' className='mx-auto container py-24 sm:py-32'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className={`group relative overflow-hidden rounded-xl border bg-background p-8 hover:shadow-lg transition-all duration-300 ease-in-out`}
          >
            {/* gradient stats */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* content */}
            <div className='relative z-10'>
              <div className='flex items-center gap-4'>
                <div className='rounded-lg bg-background/80 p-2 ring-1 ring-border/50 backdrop-blur-sm'>
                  <stat.icon className='h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110' />
                </div>
                <h3 className='text-lg font-semibold tracking-tight'>
                  {stat.name}
                </h3>
              </div>

              <p className='mt-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                {stat.value}
              </p>

              <p className='mt-2 text-sm text-muted-foreground'>
                {stat.description}
              </p>

              <div className='absolute bottom-2 right-2 h-12 w-12 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
