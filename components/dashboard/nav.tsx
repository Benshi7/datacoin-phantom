'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Bell, Settings, LogOut, Wallet, User } from 'lucide-react'
import Link from 'next/link'

export function DashboardNav () {
  const { user, signOut, publicKey } = useAuth()

  return (
    <header className='border-b'>
      <div className='container flex h-16 items-center justify-between'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='flex items-center gap-2'>
                <Wallet className='h-5 w-5' />
                <span className='hidden md:inline-block'>
                  {publicKey
                    ? `${publicKey.toString().slice(0, 4)}...${publicKey
                        .toString()
                        .slice(-4)}`
                    : 'Not Connected'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {user?.name}
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
                    {publicKey
                      ? `${publicKey.toString().slice(0, 4)}...${publicKey
                          .toString()
                          .slice(-4)}`
                      : ''}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href='/dashboard/profile'>
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/dashboard/settings'>
                  <Settings className='mr-2 h-4 w-4' />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
