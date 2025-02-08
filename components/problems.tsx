'use client'
import React from 'react'
import { Lock, DollarSign, UserX, Shield } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { motion } from 'framer-motion'

const problems = [
  {
    title: 'Data Privacy Concerns',
    description:
      'Your personal data is being collected and sold without your knowledge or consent.',
    solution:
      'Full transparency and control over your data sharing preferences.',
    icon: Lock,
    color: 'from-red-500/80 to-orange-500/80'
  },
  {
    title: 'Unfair Compensation',
    description:
      'Big tech companies profit from your data while you receive nothing in return.',
    solution: 'Direct rewards for your valuable data contributions.',
    icon: DollarSign,
    color: 'from-violet-500/80 to-purple-500/80'
  },
  {
    title: 'Lack of Control',
    description:
      'No way to manage or revoke access to your personal information.',
    solution: 'Granular controls over what data you share and with whom.',
    icon: UserX,
    color: 'from-blue-500/80 to-cyan-500/80'
  },
  {
    title: 'Security Risks',
    description:
      'Traditional data storage methods are vulnerable to breaches and hacks.',
    solution: 'Military-grade encryption and blockchain security.',
    icon: Shield,
    color: 'from-emerald-500/80 to-green-500/80'
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export function Problems () {
  return (
    <section id='problems' className='relative bg-muted/50 overflow-hidden'>
      {/* Decorative background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' />

      <div className='container mx-auto py-24 sm:py-32 relative'>
        <motion.div
          className='flex flex-col items-center space-y-4 text-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <div className='relative'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Problems We Solve
            </h2>
            <motion.div
              className='absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-primary/30'
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className='absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-primary/30'
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className='max-w-[900px] pt-4 text-muted-foreground sm:text-xl'>
            DataCoin addresses the key challenges in personal data management
            and monetization
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 gap-8 mt-16 md:grid-cols-2'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              className='group'
              variants={itemVariants}
            >
              <Card className='relative overflow-hidden transition-all duration-300 hover:shadow-lg'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none'
                  whileHover={{ scale: 1.02 }}
                />

                <CardHeader>
                  <div className='flex items-center gap-4'>
                    <motion.div
                      className={`relative p-3 rounded-xl bg-gradient-to-r ${problem.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <problem.icon className='w-6 h-6 text-white' />
                      <div className='absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
                    </motion.div>
                    <div className='flex-1'>
                      <CardTitle className='text-lg font-semibold tracking-tight group-hover:text-primary transition-colors duration-300'>
                        {problem.title}
                      </CardTitle>
                      <CardDescription className='mt-2 leading-relaxed'>
                        {problem.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <motion.div
                    className='relative pl-8 pt-4 before:absolute before:left-3 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-primary/50 before:to-transparent'
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='absolute left-0 top-[1.125rem] h-3 w-3 rounded-full border-2 border-primary bg-background' />
                    <div className='space-y-2'>
                      <div className='text-sm font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                        Our Solution:
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {problem.solution}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Problems
