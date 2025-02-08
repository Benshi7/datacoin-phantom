'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Database } from 'lucide-react'

const navigation = [
  { name: 'Benefits', href: '/#benefits' },
  { name: 'How It Works', href: '/#how-it-works' },
  { name: 'Stats', href: '/#stats' },
  { name: 'Problems', href: '/#problems' }
]

export function NavBar () {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className=' sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Database className='h-6 w-6' />
          <span className='text-xl font-bold'>DataCoin</span>
        </Link>

        {isHome && (
          <nav className='hidden md:flex items-center space-x-6 text-sm font-medium'>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className='transition-colors hover:text-foreground/80'
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        <div className='flex items-center space-x-4'>
          <Link href='/signin'>
            <Button variant='ghost' size='sm'>
              Sign In
            </Button>
          </Link>
          <Link href='/signin'>
            <Button size='sm'>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
