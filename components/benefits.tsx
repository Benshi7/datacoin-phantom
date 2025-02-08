'use client'
import React from 'react'
import { Shield, Coins, Lock } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const benefits = [
  {
    title: 'Own Your Data',
    description:
      'Take control of your personal information with complete ownership and transparency.',
    icon: Shield,
    accentColor: 'from-blue-600 to-blue-400'
  },
  {
    title: 'Earn While You Share',
    description:
      'Receive DataCoin tokens as rewards for sharing your valuable data insights.',
    icon: Coins,
    accentColor: 'from-amber-600 to-amber-400'
  },
  {
    title: 'Privacy First',
    description:
      'Advanced encryption and security measures ensure your data remains protected.',
    icon: Lock,
    accentColor: 'from-emerald-600 to-emerald-400'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
}

export function Benefits () {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  return (
    <section
      id='benefits'
      className='container mx-auto py-24 sm:py-32 relative'
    >
      {/* Decoración para el fondo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ opacity, scale }}
        className='absolute inset-0 -z-10 overflow-hidden'
      >
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear'
          }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl'
        />
      </motion.div>

      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={fadeInVariants}
        className='flex flex-col items-center space-y-4 text-center'
      >
        <motion.h2
          variants={titleVariants}
          className='text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent pb-2'
        >
          Why Choose DataCoin?
        </motion.h2>
        <motion.p
          variants={titleVariants}
          className='max-w-[900px] text-muted-foreground sm:text-xl'
        >
          Our platform empowers you to monetize your data while maintaining
          privacy and security.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='grid grid-cols-1 gap-8 mt-16 md:grid-cols-3'
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            variants={cardVariants}
            className='group perspective-1000'
          >
            <motion.div
              whileHover={{
                rotateY: 12,
                scale: 1.02,
                transition: { duration: 0.5 }
              }}
              className='relative transform-gpu'
            >
              <Card className='relative h-full overflow-hidden bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border-2 border-border/50'>
                {/* Animated background gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className='absolute inset-0'
                >
                  <motion.div
                    animate={{
                      background: [
                        'radial-gradient(circle at 50% 120%, rgba(120,119,198,0.1), rgba(255,255,255,0))',
                        'radial-gradient(circle at 50% 100%, rgba(120,119,198,0.15), rgba(255,255,255,0))',
                        'radial-gradient(circle at 50% 120%, rgba(120,119,198,0.1), rgba(255,255,255,0))'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className='absolute inset-0'
                  />
                </motion.div>

                <CardHeader className='relative'>
                  <div className='flex items-center justify-between mb-4'>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${benefit.accentColor} shadow-lg`}
                    >
                      <benefit.icon className='w-6 h-6 text-white' />
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '3rem' }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className='h-1 rounded-full bg-gradient-to-r from-border to-transparent'
                    />
                  </div>
                  <CardTitle className='text-xl font-bold tracking-tight'>
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className='mt-2 text-muted-foreground'>
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='relative'>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className='absolute bottom-0 right-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary/5 to-transparent -mr-10 -mb-10'
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Benefits
