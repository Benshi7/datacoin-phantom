import React from 'react'
import { Heart, MapPin, CreditCard, Users, Globe } from 'lucide-react'

const dataTypes = [
  {
    name: 'Health Data',
    description: 'Fitness tracking, sleep patterns, and wellness metrics',
    icon: Heart,
    examples: 'Steps, Heart Rate, Sleep',
    color: 'from-red-500/20 to-pink-500/20',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    name: 'Geo Data',
    description: 'Movement patterns and location preferences',
    icon: MapPin,
    examples: 'Routes, Places, Travel',
    color: 'from-blue-500/20 to-cyan-500/20',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Financial Data',
    description: 'Transaction history and spending patterns',
    icon: CreditCard,
    examples: 'Purchases, Investments, Bills',
    color: 'from-emerald-500/20 to-green-500/20',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    name: 'Social Data',
    description: 'Interests, preferences, and social connections',
    icon: Users,
    examples: 'Interests, Networks, Content',
    color: 'from-violet-500/20 to-purple-500/20',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    name: 'Internet Data',
    description: 'Browsing history and online behavior patterns',
    icon: Globe,
    examples: 'Searches, Sites, Preferences',
    color: 'from-orange-500/20 to-amber-500/20',
    gradient: 'from-orange-500 to-amber-500'
  }
]

export function DataTypes () {
  return (
    <section id='data-types' className='mx-auto container py-24 sm:py-32'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl mb-4'>
          Your Data, Your Value
        </h2>
        <p className='text-muted-foreground sm:text-xl max-w-2xl mx-auto'>
          Monetize various types of your personal data while maintaining
          complete control and privacy
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {dataTypes.map(type => (
          <div
            key={type.name}
            className='group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300'
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className='relative p-8'>
              {/* Icon */}
              <div className='mb-6 inline-block'>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${type.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <type.icon className='w-6 h-6 text-white' />
                </div>
              </div>

              {/* Text content */}
              <h3 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                {type.name}
              </h3>
              <p className='text-muted-foreground text-sm mb-4'>
                {type.description}
              </p>

              {/* Examples pill */}
              <div className='inline-block rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary'>
                {type.examples}
              </div>

              {/* Decorative elements */}
              <div className='absolute top-0 right-0 w-24 h-24 rounded-bl-[6rem] bg-gradient-to-br from-background via-background to-transparent opacity-80' />
              <div className='absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DataTypes
