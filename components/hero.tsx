'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Sparkles, Coins } from 'lucide-react'
import { useState, useEffect } from 'react'

const dataPoints = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5
}))

const visualizationContent = [
  {
    title: 'Secure Data Exchange',
    description:
      'Your data flows through our encrypted network, converting into valuable digital assets',
    icon: Shield,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Privacy-First Architecture',
    description:
      'Advanced encryption ensures your personal information remains protected at all times',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Real-Time Rewards',
    description:
      'Watch your data contributions transform into immediate token rewards',
    icon: Coins,
    color: 'from-green-500 to-blue-500'
  },
  {
    title: 'Smart Data Control',
    description:
      'Maintain full control over what you share and earn with our intelligent platform',
    icon: Shield,
    color: 'from-orange-500 to-red-500'
  }
]
export function Hero () {
  const [contentIndex, setContentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex(current =>
        current === visualizationContent.length - 1 ? 0 : current + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5' />

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-80px)] items-center py-12 lg:py-20'>
          {/* izquierda */}
          <div className='relative z-10 space-y-8 text-center lg:text-left'>
            <div className='relative'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl'
              />
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className='text-4xl sm:text-5xl md:text-7xl font-bold leading-tight'
              >
                Transform{' '}
                <span className='relative inline-block'>
                  <span className='relative z-10 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'>
                    Your Data
                  </span>
                  <motion.span
                    className='absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 to-blue-500'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  <motion.span
                    className='absolute -top-1 -right-2 text-yellow-500'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Sparkles className='h-4 w-4' />
                  </motion.span>
                  <motion.span
                    className='absolute -bottom-1 -left-2 text-purple-500'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Sparkles className='h-3 w-3' />
                  </motion.span>
                </span>
                <span className='block mt-2'>Into Digital Assets</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='flex flex-wrap gap-4 items-center justify-center lg:justify-start'
            >
              <Button size='lg' className='gap-2 text-lg'>
                Start Earning <ArrowRight className='h-5 w-5' />
              </Button>
              <span className='text-muted-foreground'>
                Join 50,000+ data contributors
              </span>
            </motion.div>
          </div>

          <div className='relative z-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-3/4 mx-auto lg:w-full'>
              {visualizationContent.map((content, index) => (
                <motion.div
                  key={content.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative'
                >
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${content.color} opacity-0 
                      group-hover:opacity-5 transition-opacity duration-300 rounded-xl
                    `}
                  />
                  <div
                    className={`
                    h-full p-4 sm:p-6 rounded-xl border bg-background/50 backdrop-blur-sm
                    transition-all duration-300 ease-in-out
                    ${contentIndex === index ? 'ring-2 ring-primary' : ''}
                  `}
                  >
                    <div className='flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4'>
                      <div
                        className={`p-1.5 sm:p-2 rounded-full bg-gradient-to-r ${content.color} text-white`}
                      >
                        <content.icon className='h-4 w-4 sm:h-5 sm:w-5' />
                      </div>
                      <h3 className='font-semibold text-base sm:text-base'>
                        {content.title}
                      </h3>
                    </div>
                    <div className='min-h-[60px] sm:min-h-[60px]'>
                      <AnimatePresence mode='wait'>
                        {(hoveredIndex === index || contentIndex === index) && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='text-sm sm:text-sm text-muted-foreground'
                          >
                            {content.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual del fondo test */}
            <div className='absolute inset-0 -z-10'>
              <svg
                viewBox='0 0 100 100'
                className='w-full h-full opacity-50'
                preserveAspectRatio='xMidYMid slice'
              >
                {dataPoints.map((point, index) => (
                  <motion.circle
                    key={point.id}
                    initial={{
                      x: point.initialX,
                      y: point.initialY,
                      opacity: 0
                    }}
                    animate={{
                      x: [point.initialX, point.initialX + 30, point.initialX],
                      y: [point.initialY, point.initialY - 20, point.initialY],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                      ease: 'easeInOut'
                    }}
                    r={point.size}
                    className='fill-primary'
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
