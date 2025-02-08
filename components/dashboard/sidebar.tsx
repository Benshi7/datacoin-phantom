'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  User,
  Heart,
  Share2,
  Coins,
  Info,
  HelpCircle,
  Database,
  MapPin,
  Users,
  LineChart,
  Globe
} from 'lucide-react'

const navigation = [
  { name: 'Personal Details', href: '/dashboard', icon: User },
  { name: 'Health Data', href: '/dashboard/health', icon: Heart },
  { name: 'Geo Data', href: '/dashboard/geo', icon: MapPin },
  { name: 'Social Data', href: '/dashboard/social', icon: Users },
  { name: 'Finance Data', href: '/dashboard/finance', icon: LineChart },
  { name: 'Internet Data', href: '/dashboard/internet', icon: Globe },
  { name: 'Sharing', href: '/dashboard/sharing', icon: Share2 },
  { name: 'Staking', href: '/dashboard/staking', icon: Coins },
  { name: 'About', href: '/dashboard/about', icon: Info },
  { name: 'FAQ', href: '/dashboard/faq', icon: HelpCircle }
]

export function Sidebar () {
  const pathname = usePathname()

  return (
    <div className='flex h-screen w-64 flex-col border-r bg-muted/50'>
      <div className='p-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <Database className='h-6 w-6' />
          <span className='text-xl font-bold'>DataCoin</span>
        </Link>
      </div>
      <nav className='flex-1 space-y-1 p-4'>
        {navigation.map(item => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className='w-full justify-start'
              >
                <item.icon className='mr-2 h-4 w-4' />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
      <div className='p-4'>
        <Button className='w-full' size='lg'>
          Buy DHT Now
        </Button>
      </div>
    </div>
  )
}
